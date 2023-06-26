import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

interface CarAutomobileDetailProps {
  image: string;
  nom: string;
  fournisseur: string;
  prix: number;
}

const CarAutomobileDetail: React.FC<CarAutomobileDetailProps> = ({ image, nom, fournisseur, prix }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.nom}>{nom}</Text>
        <Text style={styles.fournisseur}>Fournisseur: {fournisseur}</Text>
        <Text style={styles.prix}>Prix: {prix} €</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginBottom: Spacing,
  },
  imageContainer: {
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: Spacing,
  },
  detailsContainer: {
    flex: 1,
    padding: Spacing,
  },
  nom: {
    fontFamily: Font["poppins-bold"],
    fontSize: FontSize.medium,
    marginBottom: Spacing,
  },
  fournisseur: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    marginBottom: Spacing,
  },
  prix: {
    fontFamily: Font["poppins-bold"],
    fontSize: FontSize.small,
  },
});

export default CarAutomobileDetail;
