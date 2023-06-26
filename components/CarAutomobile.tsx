import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import Spacing from "../constants/Spacing";

interface CarAutomobileProps {
  image: any;
  nom: string;
  fournisseur: string;
  prix: number;
  onPress: () => void; // Fonction à exécuter lors du clic sur la carte
}

const CarAutomobile: React.FC<CarAutomobileProps> = ({ image, nom, fournisseur, prix, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.detailsContainer}>
        <Text style={styles.nom}>{nom}</Text>
        <Text style={styles.fournisseur}>{fournisseur}</Text>
        <Text style={styles.prix}>{prix} €</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    overflow: "hidden",
    marginBottom: Spacing,
    marginTop:10
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: Spacing,
  },
  nom: {
    fontFamily: Font["poppins-regular"],
    fontSize: 16,
    marginBottom: Spacing,
  },
  fournisseur: {
    fontFamily: Font["poppins-regular"],
    fontSize: 14,
    color: Colors.darkText,
    marginBottom: Spacing,
  },
  prix: {
    fontFamily: Font["poppins-regular"],
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
});

export default CarAutomobile;
