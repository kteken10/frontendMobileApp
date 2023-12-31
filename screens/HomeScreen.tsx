import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView, Image } from "react-native";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import CarAutomobile from "../components/CarAutomobile";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import NavigationIcon from "../components/NavigationICon";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [vehicleData, setVehicleData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get("https://fast-sands-15969-99650e82dc8c.herokuapp.com/automobiles");
        setVehicleData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVehicleData();
  }, []);

  const handleSearch = async (searchCriteria: any) => {
    try {
      const response = await axios.get("https://fast-sands-15969-99650e82dc8c.herokuapp.com/recherche", {
        params: searchCriteria,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <NavigationIcon icon={require("../assets/icons/back.png")} screenName="Login" />
       
       
        <Text style={styles.title}>AutoSearchCar</Text>
      </View>
      <View style={styles.content}>
        <SearchBar onSearch={handleSearch} />
        <ScrollView>
          {searchResults.length === 0 ? (
            vehicleData.map((vehicle, index) => (
              <CarAutomobile
                key={index}
                image={{ uri: vehicle.image }}
                nom={vehicle.marque}
                fournisseur={vehicle.fournisseur_info.nom_fournisseur}
                prix={vehicle.prix}
                onPress={() => {
                  console.log(`Clic sur le véhicule : ${vehicle.marque}`);
                  navigation.navigate("CarAutomobileDetails", { vehicleData: vehicle });
                }}
              />
            ))
          ) : (
            searchResults.map((vehicle, index) => (
              <CarAutomobile
                key={index}
                image={{ uri: vehicle.image }}
                nom={vehicle.marque}
                fournisseur={vehicle.fournisseur_info.nom_fournisseur}
                prix={vehicle.prix}
                onPress={() => {
                  console.log(`Clic sur le véhicule : ${vehicle.marque}`);
                  navigation.navigate("CarAutomobileDetails", { vehicleData: vehicle });
                }}
              />
            ))
          )}
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;
