// components/QuantitySelector.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

// Zod schema for quantity validation
const quantitySchema = z.object({
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(999, "Quantity cannot exceed 999"),
});

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  minQuantity?: number;
  maxQuantity?: number;
  showValidationErrors?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  minQuantity = 1,
  maxQuantity = 10000,
  showValidationErrors = true,
}) => {
  const [inputValue, setInputValue] = useState(quantity.toString());
  const [isEditing, setIsEditing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Create dynamic schema based on props
  const dynamicQuantitySchema = z.object({
    quantity: z
      .number()
      .int("Quantity must be a whole number")
      .min(minQuantity, `Quantity must be at least ${minQuantity}`)
      .max(maxQuantity, `Quantity cannot exceed ${maxQuantity}`),
  });

  useEffect(() => {
    if (!isEditing) {
      setInputValue(quantity.toString());
      setValidationError(null);
    }
  }, [quantity, isEditing]);

  const validateQuantity = (value: number): boolean => {
    try {
      dynamicQuantitySchema.parse({ quantity: value });
      setValidationError(null);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues[0]?.message || "Invalid quantity";
        setValidationError(errorMessage);

        if (showValidationErrors) {
          Alert.alert("Invalid Quantity", errorMessage);
        }
      }
      return false;
    }
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(minQuantity, quantity - 1);
    if (validateQuantity(newQuantity)) {
      onQuantityChange(newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(maxQuantity, quantity + 1);
    if (validateQuantity(newQuantity)) {
      onQuantityChange(newQuantity);
    }
  };

  const handleInputChange = (text: string) => {
    // Only allow numbers and limit length
    const numericValue = text.replace(/[^0-9]/g, "");

    // Limit input length based on maxQuantity
    const maxLength = maxQuantity.toString().length;
    const limitedValue = numericValue.slice(0, maxLength);

    setInputValue(limitedValue);

    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleInputSubmit = () => {
    const parsedValue = parseInt(inputValue);

    // Handle empty input
    if (!inputValue || isNaN(parsedValue)) {
      setInputValue(quantity.toString());
      setIsEditing(false);
      return;
    }

    // Validate the parsed value
    if (validateQuantity(parsedValue)) {
      onQuantityChange(parsedValue);
    } else {
      // Reset to previous valid value if validation fails
      setInputValue(quantity.toString());
    }

    setIsEditing(false);
  };

  const handleInputFocus = () => {
    setIsEditing(true);
    setValidationError(null);
  };

  const handleInputBlur = () => {
    handleInputSubmit();
  };

  // Additional validation for edge cases
  const isDecreaseDisabled = quantity <= minQuantity;
  const isIncreaseDisabled = quantity >= maxQuantity;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isDecreaseDisabled && styles.buttonDisabled]}
        onPress={handleDecrease}
        disabled={isDecreaseDisabled}
        accessibilityLabel="Decrease quantity"
        accessibilityHint={`Current quantity is ${quantity}`}
      >
        <Ionicons
          name="remove"
          size={20}
          color={isDecreaseDisabled ? "#ccc" : "#666"}
        />
      </TouchableOpacity>

      <TextInput
        style={[
          styles.input,
          validationError && styles.inputError,
          isEditing && styles.inputFocused,
        ]}
        value={inputValue}
        onChangeText={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onSubmitEditing={handleInputSubmit}
        keyboardType="numeric"
        maxLength={maxQuantity.toString().length}
        selectTextOnFocus
        accessibilityLabel="Quantity input"
        accessibilityHint={`Enter quantity between ${minQuantity} and ${maxQuantity}`}
      />

      <TouchableOpacity
        style={[styles.button, isIncreaseDisabled && styles.buttonDisabled]}
        onPress={handleIncrease}
        disabled={isIncreaseDisabled}
        accessibilityLabel="Increase quantity"
        accessibilityHint={`Current quantity is ${quantity}`}
      >
        <Ionicons
          name="add"
          size={20}
          color={isIncreaseDisabled ? "#ccc" : "#666"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  buttonDisabled: {
    backgroundColor: "#f8f8f8",
    opacity: 0.6,
  },
  input: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
    minWidth: 80,
    textAlign: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#333",
  },
  inputFocused: {
    borderColor: "#007AFF",
    backgroundColor: "#fff",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  inputError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
});

export default QuantitySelector;
