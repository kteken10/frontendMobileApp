import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
interface AppTextInputProps extends TextInputProps {
  icon?: any;
}
interface AppTextInputProps extends TextInputProps {
  insertNumber?: boolean;
}

const AppTextInput: React.FC<AppTextInputProps> = ({ insertNumber, ...otherProps }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const handleChangeText = (inputText: string) => {
    if (insertNumber) {
      // Remove non-digit characters from the input text
      const cleanedText = inputText.replace(/[^0-9]/g, "");
      setText(cleanedText);
    } else {
      setText(inputText);
    }
  };

  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={Colors.darkText}
      style={[
        styles.input,
        focused && styles.focusedInput,
      ]}
      value={text}
      onChangeText={handleChangeText}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    padding: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginTop:-10,
    marginBottom:15,
    
    marginVertical: Spacing,
  },
  focusedInput: {
    borderWidth: 0,
   
    shadowRadius: Spacing,
  },
});

export default AppTextInput;
