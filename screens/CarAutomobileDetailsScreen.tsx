import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

type CarAutomobileDetailsScreenRouteProp = RouteProp<RootStackParamList, "CarAutomobileDetails">;

const CarAutomobileDetailsScreen: React.FC = () => {
  const route = useRoute<CarAutomobileDetailsScreenRouteProp>();
  const { vehicleData } = route.params;

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const imageWidth = screenWidth * 0.8;
  const imageHeight = imageWidth * (9 / 16); // Exemple : ratio de 16:9

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={[styles.image, { width: imageWidth, height: imageHeight }]} source={{ uri: vehicleData.image }} />
        <View style={styles.contentRow}>
          <Text style={styles.marque}>{vehicleData.marque}</Text>
          <Text style={styles.prix}>Prix: $ {vehicleData.prix}</Text>
        </View>
      </View>
      <View style={styles.fournisseurRow}>
        <Image style={styles.logo_fournisseur} source={{ uri: vehicleData.fournisseur_info.logo_fournisseur }} />
        <Text style={styles.info}> {vehicleData.fournisseur_info.nom_fournisseur}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.minicard}>
          <Text style={styles.label}>Vitesse maximale:</Text>
          <Text style={styles.value}>{vehicleData.vitesse_maximale}</Text>
        </View>
        <View style={styles.minicard}>
          <Text style={styles.label}>Puissance maximale:</Text>
          <Text style={styles.value}>{vehicleData.puissance_maximale}</Text>
        </View>
        <View style={styles.minicard}>
          <Text style={styles.label}>Nombre de Chevaux:</Text>
          <Text style={styles.value}>{vehicleData.moteur}</Text>
        </View>
      </View>
      <View style={styles.specificationSection}>
        <Text style={styles.specificationTitle}>Spécification</Text>
        <View style={styles.specificationCards}>
          {/* Ajoutez ici les trois cartes de spécification */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: -230,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginTop: 45,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
    padding: 2,
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
  minicard: {
    marginTop: 45,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "30%",
    padding: 2,
    height: "88%",
    marginLeft: 6,
    marginRight: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 259,
    marginBottom: 16,
    borderRadius: 8,
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 15,
  },
  fournisseurRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: "15%",
    marginLeft: "-53%",
  },
  logo_fournisseur: {
    width: "9%",
    height: "150%",
    marginLeft: 3,
    borderRadius: 50,
    backgroundColor: "#1F41BB",
  },
  marque: {
    textAlign: "center",
    maxWidth: "60%",
    color: Colors.darkText,
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    fontWeight: "500",
  },
  prix: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.warning,
    fontFamily: Font["poppins-regular"],
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: Font["poppins-regular"],
    color: Colors.darkText,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: Colors.darkText, // Couleur du texte des labels
    fontFamily: Font["poppins-regular"],
  },
  value: {
    fontSize: 16,
    marginBottom: 4,
    color: Colors.warning, // Couleur du texte des valeurs correspondantes
    fontFamily: Font["poppins-regular"],
  },
  specificationSection: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    width: "100%",
  },
  specificationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.darkText,
    fontFamily: Font["poppins-regular"],
  },
  specificationCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default CarAutomobileDetailsScreen;
