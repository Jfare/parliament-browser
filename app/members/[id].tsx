import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Member, Organization } from "../../types/member";

export default function MemberDetail() {
  const { id } = useLocalSearchParams();
  const [member, setMember] = useState<Member | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberAndOrganizations = async () => {
      try {
        // Hämta medlemsdata
        const memberResponse = await fetch(
          `https://api.lagtinget.ax/api/persons/${id}.json`
        );
        const memberData: Member = await memberResponse.json();
        setMember(memberData);

        // Hämta organisationsdata parallellt
        const organizationPromises = memberData.bindings.map((binding) =>
          fetch(
            `https://api.lagtinget.ax/api/organizations/${binding.organization}.json`
          ).then((res) => res.json())
        );

        const organizationsData = await Promise.all(organizationPromises);
        setOrganizations(organizationsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberAndOrganizations();
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
      <Text>Yrke: {member.profession}</Text>
      <Text>
        Adress: {member.address}, {member.city}
      </Text>
      <Text>E-post: {member.email}</Text>
      <Text>Parti: {organizations[0]?.title}</Text>
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
