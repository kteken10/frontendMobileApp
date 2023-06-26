import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import Modal from "react-native-modal";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextinput";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const loginUser = async () => {
    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "https://fast-sands-15969-99650e82dc8c.herokuapp.com/auth",
        data
      );

      const { user_type, token } = response.data; 
      if (token) {
        showModal("Authentification réussie");
        navigate("Home");
      } else {
        showModal("Identifiant invalide !!");
      }
    } catch (error) {
      console.error(error);
      showModal("Échec de l'authentification. Une erreur s'est produite.");
    }
  };

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Se connecter ici</Text>
          <Text style={styles.subtitle}>
            content de vous revoir parmi nous!!
          </Text>
        </View>
        <View style={styles.formContainer}>
          <AppTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <AppTextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity onPress={loginUser} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Register")}
          style={styles.createAccountContainer}
        >
          <Text style={styles.createAccountText}>
            Créer un nouveau compte
          </Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity
            onPress={() => setIsModalVisible(false)}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: Spacing * 2,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: Font["poppins-bold"],
    marginVertical: Spacing * 3,
  },
  subtitle: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.large,
    maxWidth: "60%",
    textAlign: "center",
  },
  formContainer: {
    marginVertical: Spacing * 3,
  },
  buttonContainer: {
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 3,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  buttonText: {
    fontFamily: Font["poppins-bold"],
    color: Colors.onPrimary,
    textAlign: "center",
    fontSize: FontSize.large,
  },
  createAccountContainer: {
    padding: Spacing,
  },
  createAccountText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.text,
    textAlign: "center",
    fontSize: FontSize.small,
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: "blue",
  },
});
