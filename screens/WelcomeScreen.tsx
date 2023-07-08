import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../types";
  const { height } = Dimensions.get("window");
  
  type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;
  
  const WelcomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    return (
      <SafeAreaView>
        <View>
          <ImageBackground
            style={{
              height: height / 2.5,
              width: "100%",
              paddingHorizontal: Spacing * 3,
              marginHorizontal: Spacing * 3
             
            }}
            resizeMode="contain"
            source={require("../assets/images/bmw8.png")}
           
          />
          <View
            style={{
              paddingHorizontal: Spacing * 4,
              paddingTop: Spacing * 4,
            }}
          >
            <Text
              style={{
               
                fontSize: FontSize.xxLarge,
                color: Colors.azureBlue,
                fontFamily: Font["poppins-bold"],
                textAlign: "center",
                marginTop: Spacing * -6,
              }}
            >
              Bienvenue Sur Drive Expo
              
            </Text>
  
            <Text
              style={{
                fontSize: FontSize.medium,
                color: "gray",
                fontFamily: Font["poppins-semiBold"],
                textAlign: "center",
                marginTop: Spacing * 2,
              }}
            >
             Vous pouvez explorer autant de véhicule que vous le souhaitez, l'aventure sera toujours aussi belle avec nous...
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: Spacing * 2,
              paddingTop: Spacing * 6,
              flexDirection: "row",
              marginVertical:Spacing * 13
            }}
          >
            <TouchableOpacity
              onPress={() => navigate("Login")}
              style={{
                backgroundColor: Colors.azureBlue,
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
                borderRadius: Spacing,
               
                shadowOpacity: 0.3,
                shadowRadius: Spacing,
              }}
            >
              <Text
                style={{
                  fontFamily: Font["poppins-bold"],
                 
                  color: Colors.onPrimary,
                  fontSize: FontSize.medium,
                  textAlign: "center",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate("Register")}
              style={{
                
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
                borderRadius: Spacing,
              }}
            >
              <Text
                style={{
                  fontFamily: Font["poppins-bold"],
                  color: "gray",
                  fontSize: FontSize.medium,
                  textAlign: "center",
                }}
              >
                SignUp ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default WelcomeScreen;
  
  const styles = StyleSheet.create({});