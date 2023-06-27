import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";

interface NavigationIconProps {
  icon: any; // L'image de l'icône
  screenName: string; // Le nom de l'écran à naviguer
}

const NavigationIcon: React.FC<NavigationIconProps> = ({ icon, screenName }) => {
  const navigation = useNavigation();

  const navigateToScreen = () => {
    navigation.navigate(screenName);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToScreen}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    overflow: "hidden",
    padding: Spacing,
    margin: Spacing,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default NavigationIcon;
