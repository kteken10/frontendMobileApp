import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import Modal from "react-native-modal";
import PasswordValidator from 'password-validator';
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextinput";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [numero_telephone, setNumeroTelephone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = (value: string) => {
    const passwordSchema = new PasswordValidator();
    passwordSchema
      .is().min(8)
      .has().uppercase()
      .has().lowercase()
      .has().digits(1)
      .has().symbols(1)
      .has().not().spaces();

    if (!passwordSchema.validate(value)) {
      setPasswordStrength("Faible");
    } else if (value.length <12) {
      setPasswordStrength("Moyen");
    } else if (value.length < 16) {
      setPasswordStrength("Satisfaisant");
    } else {
      setPasswordStrength("Fort");
    }
  };

  const registerVisitor = async () => {
    try {
      const data = {
        nom: nom,
        email: email,
        password: password,
        numero_telephone: numero_telephone
      };

      const passwordSchema = new PasswordValidator();
      passwordSchema
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits(1)
        .has().symbols(1)
        .has().not().spaces();

      if (!passwordSchema.validate(password)) {
        setShowModal(true);
        setModalMessage("Le mot de passe ne satisfait pas les critères de validation.");
        return;
      }

      const response = await axios.post('https://fast-sands-15969-99650e82dc8c.herokuapp.com/visiteurs', data);

      console.log(response.data);

      setShowModal(true);
      setModalMessage("Le visiteur a été créé avec succès.");

      setNom("");
      setEmail("");
      setPassword("");
      setNumeroTelephone("");
      navigate("Login");
    } 
    
    catch (error) {
      console.error(error);

      setShowModal(true);
      setModalMessage("Une erreur s'est produite lors de la création du visiteur.");
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 3,
            }}
          >
            Créer un nouveau compte
          </Text>
          <Text
            style={{
              fontFamily: Font["poppins-regular"],
              fontSize: FontSize.small,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Vous devez créer un compte pour pouvoir explorer les véhicules disponibles chez nous.
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput
            placeholder="Nom"
            value={nom}
            onChangeText={setNom}
          />
          <AppTextInput
            placeholder="Adresse email"
            value={email}
            onChangeText={setEmail}
          />
          <AppTextInput
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              checkPasswordStrength(value);
            }}
          />
          <View
            style={[
              styles.passwordStrengthIndicator,
              passwordStrength === "Faible" && styles.passwordStrengthIndicatorWeak,
              passwordStrength === "Moyen" && styles.passwordStrengthIndicatorMedium,
              passwordStrength === "Satisfaisant" && styles.passwordStrengthIndicatorGood,
              passwordStrength === "Fort" && styles.passwordStrengthIndicatorStrong,
            ]}
          >
            <Text style={styles.passwordStrengthText}>{passwordStrength}</Text>
          </View>
          <AppTextInput
            placeholder="Numéro de téléphone"
            insertNumber={true}
            value={numero_telephone}
            onChangeText={setNumeroTelephone}
          />
        </View>

        <TouchableOpacity
          onPress={registerVisitor}
          style={{
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
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Créer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Login")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Vous avez déjà un compte ?
          </Text>
        </TouchableOpacity>

        <Modal isVisible={showModal} backdropOpacity={0.5}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
              <Ionicons name="checkmark" size={24} color={Colors.onPrimary} />
            </TouchableOpacity>
          </View>
        </Modal>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.lightPrimary,
    padding: Spacing * 3,
    borderRadius: Spacing,
    alignItems: "center",
  },
  modalMessage: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.medium,
    color: Colors.text,
    textAlign:"center",
  },
  modalButton: {
    backgroundColor: Colors.primary,
    padding: Spacing * 2,
    borderRadius: Spacing,
    marginTop: Spacing * 2,
  },
  passwordStrengthIndicator: {
    height: 18,
    marginTop:-4,
    marginBottom:15,
    borderRadius: 10,
    marginVertical: Spacing,
    
  },
  passwordStrengthIndicatorWeak: {
    backgroundColor: "#E74C3C",
  },
  passwordStrengthIndicatorMedium: {
    backgroundColor: "#F39C12",
  },
  passwordStrengthIndicatorGood: {
    backgroundColor: "yellow",
  },
  passwordStrengthIndicatorStrong: {
    backgroundColor: "#2ECC71",
  
  },
  passwordStrengthText: {
    textAlign: "center",
    fontSize: FontSize.small,
    color: Colors.text,
    fontFamily: Font["poppins-regular"],
   
  },
});

export default RegisterScreen;
