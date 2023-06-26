import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import Spacing from "../constants/Spacing";

interface SearchBarProps {
  onSearch: (searchCriteria: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [typeVehicule, setTypeVehicule] = useState<string>("");
  const [marque, setMarque] = useState<string>("");
  const [couleur, setCouleur] = useState<string>("");
  const [fournisseur, setFournisseur] = useState<string>("");
  const [typeVehiculeChecked, setTypeVehiculeChecked] = useState<boolean>(false);
  const [marqueChecked, setMarqueChecked] = useState<boolean>(false);
  const [couleurChecked, setCouleurChecked] = useState<boolean>(false);
  const [fournisseurChecked, setFournisseurChecked] = useState<boolean>(false);

  const handleSearch = () => {
    const searchCriteria = {
      type_vehicule: typeVehiculeChecked ? typeVehicule : "",
      marque: marqueChecked ? marque : "",
      couleur: couleurChecked ? couleur : "",
      fournisseur: fournisseurChecked ? fournisseur : "",
    };

    onSearch(searchCriteria);
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox checked={typeVehiculeChecked} onPress={() => setTypeVehiculeChecked(!typeVehiculeChecked)} />
        <Text style={styles.checkboxLabel}>Type de véhicule</Text>
      </View>
      {typeVehiculeChecked && (
        <TextInput
          style={styles.input}
          placeholder="Type de véhicule"
          value={typeVehicule}
          onChangeText={setTypeVehicule}
        />
      )}
      <View style={styles.checkboxContainer}>
        <CheckBox checked={marqueChecked} onPress={() => setMarqueChecked(!marqueChecked)} />
        <Text style={styles.checkboxLabel}>Marque</Text>
      </View>
      {marqueChecked && (
        <TextInput
          style={styles.input}
          placeholder="Marque"
          value={marque}
          onChangeText={setMarque}
        />
      )}
      <View style={styles.checkboxContainer}>
        <CheckBox checked={couleurChecked} onPress={() => setCouleurChecked(!couleurChecked)} />
        <Text style={styles.checkboxLabel}>Couleur</Text>
      </View>
      {couleurChecked && (
        <TextInput
          style={styles.input}
          placeholder="Couleur"
          value={couleur}
          onChangeText={setCouleur}
        />
      )}
      <View style={styles.checkboxContainer}>
        <CheckBox checked={fournisseurChecked} onPress={() => setFournisseurChecked(!fournisseurChecked)} />
        <Text style={styles.checkboxLabel}>Fournisseur</Text>
      </View>
      {fournisseurChecked && (
        <TextInput
          style={styles.input}
          placeholder="Fournisseur"
          value={fournisseur}
          onChangeText={setFournisseur}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing,
  },
  checkboxLabel: {
    marginLeft: Spacing,
    fontFamily: Font["poppins-regular"],
    fontSize: 16,
  },
  input: {
    fontFamily: Font["poppins-regular"],
    fontSize: 16,
    padding: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginLeft: Spacing * 2,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: Spacing,
    paddingVertical: Spacing,
    paddingHorizontal: Spacing * 2,
  },
  buttonText: {
    fontFamily: Font["poppins-regular"],
    fontSize: 16,
    color: Colors.background,
    textAlign: "center",
  },
});

export default SearchBar;
