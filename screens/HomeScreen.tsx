import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView, Image } from "react-native";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import CarAutomobile from "../components/CarAutomobile";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get("https://fast-sands-15969-99650e82dc8c.herokuapp.com/automobiles"); // Remplacez l'URL par l'endpoint approprié de votre API
        setVehicleData(response.data); // Stocke les données des véhicules dans l'état
      } catch (error) {
        console.log(error);
      }
    };

    fetchVehicleData();
  }, []);

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
        <ScrollView>
          {vehicleData.map((vehicle, index) => (
            <CarAutomobile
              key={index}
              image={{ uri: vehicle.image }}
              nom={vehicle.marque}
              fournisseur={vehicle.fournisseur_id}
              prix={vehicle.prix}
              onPress={() => {
                console.log(`Clic sur le véhicule : ${vehicle.marque}`);

                navigation.navigate("CarAutomobileDetails",{vehicleData: vehicle});
              }}
            />
          ))}
        </ScrollView>
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
