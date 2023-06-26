import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";

type CarAutomobileDetailsScreenRouteProp = RouteProp<RootStackParamList, "CarAutomobileDetails">;

const CarAutomobileDetailsScreen: React.FC = () => {
  const route = useRoute<CarAutomobileDetailsScreenRouteProp>();
  const { vehicleData } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: vehicleData.image }} />
        <View style={styles.contentRow}>
          <Text style={styles.marque}>{vehicleData.marque}</Text>
          <Text style={styles.prix}>Prix: $ {vehicleData.prix}</Text>
        </View>
      </View>
      <View style={styles.fournisseurRow}>
        <Image style={styles.logo_fournisseur} source={{ uri: vehicleData.fournisseur_info.logo_fournisseur }} />
        <Text style={styles.info}> {vehicleData.fournisseur_info.nom_fournisseur}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: -370,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginTop:45,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "105%",
    padding: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 2,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: "105%",
    height: 259,
    marginBottom: 16,
    borderRadius: 8,
  },
  fournisseurRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop:"15%",
    marginLeft:"-53%"
  },
  logo_fournisseur: {
    width: "9%",
    height: "150%",
    marginRight: 8,
    borderRadius: 50,
    backgroundColor: "#1F41BB",
  },
  marque: {
    fontSize: 20,
    fontWeight: "500",
  },
  prix: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F41BB",
    marginTop: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default CarAutomobileDetailsScreen;
