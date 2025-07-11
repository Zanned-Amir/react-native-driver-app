import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface FormInputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  ...props
}) => (
  <View style={[styles.container, style]}>
    {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
    <TextInput
      style={[styles.input, inputStyle, error && styles.inputError]}
      {...props}
    />
    {error ? <Text style={[styles.error, errorStyle]}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    backgroundColor: "#fafafa",
  },
  inputError: {
    borderColor: "#ff5555",
  },
  error: {
    marginTop: 4,
    color: "#ff5555",
    fontSize: 12,
  },
});

export default FormInput;
