import React, { forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface FormInputProps extends Omit<TextInputProps, "style" | "ref"> {
  label?: string;
  error?: string;
  required?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  rightIcon?: React.ReactNode; // ✅ Add rightIcon support
}

const FormInput = forwardRef<TextInput, FormInputProps>(
  (
    {
      label,
      error,
      required,
      style,
      inputStyle,
      labelStyle,
      errorStyle,
      rightIcon,
      ...props
    },
    ref
  ) => (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={{ color: "#ff5555" }}> *</Text>}
        </Text>
      )}
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <TextInput
          ref={ref}
          style={[styles.input, inputStyle]}
          placeholderTextColor="#999"
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  )
);

FormInput.displayName = "FormInput";

export default FormInput;

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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    backgroundColor: "#fafafa",
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#000", // ✅ Ensure text isn't white
  },
  inputError: {
    borderColor: "#ff5555",
  },
  error: {
    marginTop: 4,
    color: "#ff5555",
    fontSize: 12,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
