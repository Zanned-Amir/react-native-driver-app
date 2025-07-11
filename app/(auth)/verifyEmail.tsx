import { CustomButton } from "@/components/CustomButton";
import TitleHeader from "@/components/TitleHeader";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Fix TypeScript error by properly typing the ref array
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const router = useRouter();

  const email = "<user_email@example.com>";

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleCodeChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace to go to previous input
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCreateAccount = async () => {
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual verification API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert("Success", "Email verified successfully!", [
        {
          text: "OK",
          onPress: () => router.navigate("/"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Invalid verification code. Please try again.");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);

    try {
      // Replace with your actual resend API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("Success", "Verification code has been resent to your email");
    } catch (error) {
      Alert.alert("Error", "Failed to resend code. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <TitleHeader
        title="Please verify your email address"
        onBackPress={handleBackPress}
        showBackButton={true}
      />

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          We've sent an email to {email}, please enter the code below.
        </Text>

        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Enter Code</Text>
          <View style={styles.codeInputs}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={styles.codeInput}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>
        </View>

        <CustomButton
          title="Create Account"
          onPress={handleCreateAccount}
          variant="primary"
          loading={loading}
          disabled={code.join("").length !== 6}
        />

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't see your email? </Text>
          <TouchableOpacity onPress={handleResend} disabled={resendLoading}>
            <Text
              style={[
                styles.resendLink,
                resendLoading && styles.resendLinkDisabled,
              ]}
            >
              Resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EmailVerificationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary || "#666",
    marginBottom: 40,
    lineHeight: 20,
  },
  codeContainer: {
    marginBottom: 40,
  },
  codeLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text || "#000",
    marginBottom: 16,
  },
  codeInputs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border || "#E1E5E9",
    borderRadius: 8,
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: Colors.primary || "#fff",
    color: Colors.text || "#000",
    textAlign: "center",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  resendText: {
    fontSize: 14,
    color: Colors.secondary || "#666",
  },
  resendLink: {
    fontSize: 14,
    color: Colors.secondary || "#007AFF",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  resendLinkDisabled: {
    opacity: 0.5,
  },
});
