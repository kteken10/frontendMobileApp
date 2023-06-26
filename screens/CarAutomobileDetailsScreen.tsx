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
      <Image style={styles.image} source={{ uri: vehicleData.image }} />
      <Text style={styles.marque}>{vehicleData.marque}</Text>
      <Text style={styles.info}>{vehicleData.fournisseur_id}</Text>
      <Text style={styles.info}>Prix: $ {vehicleData.prix}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  marque: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default CarAutomobileDetailsScreen;
