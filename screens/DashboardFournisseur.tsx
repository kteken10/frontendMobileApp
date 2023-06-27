import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, Button, FlatList, Image } from "react-native";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

type Vehicle = {
  id: number;
  marque: string;
  prix: number;
  puissance_maximale: number;
  vitesse_maximale: number;
  moteur: number;
  type_vehicule: string;
  couleur: string;
  duree: number;
  fournisseur_info: {
    id: number;
    nom_fournisseur: string;
    email: string;
    numero_telephone: string;
    logo_fournisseur: string;
    date_enregistrement: string;
    localisation: string;
    adresse: string;
  };
  description: string;
  image: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "DashboardFournisseur">;

const DashboardFournisseurScreen: React.FC<Props> = ({ route, navigation }) => {
  const { fournisseurId: user_id } = route.params;
  const [vehicleCount, setVehicleCount] = useState(0);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicleCount = async () => {
      try {
        const response = await axios.get(
          `https://fast-sands-15969-99650e82dc8c.herokuapp.com/fournisseurs/${user_id}/vehicle-count`
        );
        setVehicleCount(response.data.count);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          `https://fast-sands-15969-99650e82dc8c.herokuapp.com/fournisseurs/${user_id}/vehicles`
        );
        setVehicles(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVehicleCount();
    fetchVehicles();
  }, [user_id]);

  const handleDelete = async (vehicleId: string) => {
    try {
      await axios.delete(`https://fast-sands-15969-99650e82dc8c.herokuapp.com/vehicles/${vehicleId}`);
      // Effectuer une action supplémentaire si nécessaire, comme mettre à jour la liste des véhicules
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    // Naviguer vers l'écran d'ajout d'un véhicule
    // navigation.navigate("AddVehicle", { fournisseurId });
  };

  const handleEdit = (vehicleId: string) => {
    // Naviguer vers l'écran d'édition du véhicule avec l'ID du véhicule en paramètre
    // navigation.navigate("EditVehicle", { vehicleId });
  };

  const renderItem = ({ item }: { item: Vehicle }) => (
    <View style={styles.vehicleItem}>
      <Image source={{ uri: item.image }} style={styles.vehicleImage} />
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleBrand}>{item.marque}</Text>
        <Text style={styles.vehiclePrice}>Prix: {item.prix}</Text>
        {/* Afficher d'autres informations du véhicule si nécessaire */}
      </View>
      <Button title="Supprimer" onPress={() => handleDelete(item.id.toString())} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Fournisseur ID: {user_id}</Text>
        <Text style={styles.vehicleCount}>Nombre de véhicules: {vehicleCount}</Text>
      </View>
      <View style={styles.addBtn}>
        <Button title="Ajouter un véhicule" onPress={handleAdd} />
      </View>
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.vehicleList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  vehicleCount: {
    fontSize: 16,
    marginBottom: 16,
  },
  addBtn: {
    paddingHorizontal: 24,
    marginBottom: 16,
    fontFamily: Font["poppins-bold"],
    color: Colors.onPrimary,
   
    fontSize: FontSize.large,
  },
  vehicleList: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  vehicleItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  vehicleImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleBrand: {
    fontSize: 18,
    fontWeight: "bold",
  },
  vehiclePrice: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default DashboardFournisseurScreen;
