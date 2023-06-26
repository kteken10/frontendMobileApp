import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import CarAutomobile from "../components/CarAutomobile";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

interface VehicleData {
  id: number;
  marque: string;
  prix: number;
  type_vehicule: string;
  couleur: string;
  duree: string;
  fournisseur_id: number;
  image: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleSearch = (searchCriteria: any) => {
    // Effectuer une action en fonction des critères de recherche
    console.log(searchCriteria);
  };

  const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const fetchVehicleData = async () => {
    try {
      const response = await axios.get("http://your-api-url.com/automobiles");
      const data = response.data;
      setVehicleData(data);
    } catch (error) {
      console.log("Erreur lors de la récupération des données du véhicule :", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AutoSearchCar</Text>
      </View>
      <ScrollView style={styles.content}>
        <SearchBar onSearch={handleSearch} />
        {vehicleData.map((vehicle, index) => (
          <CarAutomobile
            key={index}
            image={vehicle.image}
            nom={vehicle.marque}
            fournisseur={vehicle.fournisseur_id.toString()}
            prix={vehicle.prix}
            onPress={() => {
              console.log(`Clic sur le véhicule : ${vehicle.marque}`);
              // Autres actions à exécuter lors du clic sur la carte de véhicule
            }}
          />
        ))}
      </ScrollView>
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
