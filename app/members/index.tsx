import { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { List, Avatar, Searchbar, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { Member } from "../../types/member";

export default function MembersScreen() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("https://api.lagtinget.ax/api/persons.json")
      .then((response) => response.json())
      .then((data: Member[]) => {
        const activeMembers = data.filter((member) => member.state === "1");
        setMembers(activeMembers);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredMembers = members.filter((member) =>
    `${member.first_name} ${member.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Sök ledamot"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={`${item.first_name} ${item.last_name}`}
            right={() => <Text style={{ marginTop: 10 }}>Aktiv</Text>}
            left={() =>
              item.image?.url ? (
                <Avatar.Image size={48} source={{ uri: item.image.url }} />
              ) : (
                <Avatar.Text
                  size={48}
                  label={`${item.first_name.charAt(0)}${item.last_name.charAt(0)}`}
                />
              )
            }
            onPress={() => router.push(`/members/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchbar: {
    margin: 10,
  },
});
