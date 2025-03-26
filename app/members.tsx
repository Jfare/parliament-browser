// app/members.tsx
import { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { List, Avatar, Searchbar, Text } from 'react-native-paper';

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  state: string,
  image: {
    url: string;
  };
  birthday: string;
}

export default function MembersScreen() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://api.lagtinget.ax/api/persons.json')
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
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
      right={() => (
        <Text style={{ marginTop: 10 }}>
          {item.state === "1" ? "Aktiv" : "Inaktiv"}
        </Text>
      )}
      left={() => (
        item.image && item.image.url ? (
          <Avatar.Image
            size={48}
            source={{ uri: item.image.url }}
          />
        ) : (
          <Avatar.Text
            size={48}
            label={`${item.first_name.charAt(0)}${item.last_name.charAt(0)}`}
          />
        )
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbar: {
    margin: 10,
  },
});
