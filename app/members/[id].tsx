import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Member } from "../../types/member";

export default function MemberDetail() {
  const { id } = useLocalSearchParams();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(
          `https://api.lagtinget.ax/api/persons/${id}.json`
        );
        const data: Member = await response.json();
        setMember(data);
      } catch (error) {
        console.error("Error fetching member:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!member) {
    return <Text>Ingen information tillgänglig.</Text>;
  }

  return (
    <View style={styles.container}>
      {member.image?.url ? (
        <Image source={{ uri: member.image.url }} style={styles.profileImage} />
      ) : (
        <View style={[styles.profileImage, styles.placeholder]}>
          <Text style={styles.placeholderText}>
            {member.first_name.charAt(0)}
            {member.last_name.charAt(0)}
          </Text>
        </View>
      )}
      <Text style={styles.name}>
        {member.first_name} {member.last_name}
      </Text>
      <Text>Status: {member.state === "1" ? "Aktiv" : "Inaktiv"}</Text>
      <Text>Födelsedatum: {member.birthday}</Text>
      {/* Lägg till mer detaljerad information här */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  placeholder: {
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 50,
    color: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
