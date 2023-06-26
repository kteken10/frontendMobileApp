import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleSearch = (searchCriteria: any) => {
    // Effectuer une action en fonction des critères de recherche
    console.log(searchCriteria);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AutoSearchCar</Text>
      </View>
      <View style={styles.content}>
        <SearchBar onSearch={handleSearch} />
        {/* Autre contenu de l'écran */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;
