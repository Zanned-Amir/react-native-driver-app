import { Colors } from "@/common/constants/colors";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, useController } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface FormInputProps extends TextInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  isPassword?: boolean;
}

export const CustomInput = ({
  name,
  control,
  label,
  isPassword = false,
  ...props
}: FormInputProps) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [secureText, setSecureText] = useState(isPassword);

  const togglePasswordVisibility = () => {
    setSecureText((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.placeholder}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          secureTextEntry={secureText}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}
          >
            <Feather
              name={secureText ? "eye" : "eye-off"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  icon: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});
