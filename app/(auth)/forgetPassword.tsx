import { Colors } from "@/common/constants/colors";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import TitleHeader from "@/components/TitleHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email address is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual password reset API call
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated API call

      Alert.alert(
        "Success",
        "We've sent a link to reset your password to your email address.",
        [
          {
            text: "OK",
            onPress: () => router.back(), // Navigate back after success
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleLoginPress = () => {
    router.navigate("/login"); // Adjust route name as needed
  };

  return (
    <>
      <TitleHeader
        title="Forgot Password"
        onBackPress={handleBackPress}
        showBackButton={true}
      />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.form}>
            <CustomInput
              label="Email Address"
              placeholder="thebhol@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
            />

            <CustomButton
              title="Submit"
              onPress={handleSubmit}
              variant="primary"
              loading={loading}
              disabled={!email.trim()}
            />
          </View>

          <View style={styles.footer}>
            <CustomButton
              title="Login to your account"
              onPress={handleLoginPress}
              variant="secondary"
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ForgotPasswordPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  content: {
    width: "100%",

    justifyContent: "center",
  },
  form: {
    marginBottom: 30,
  },
  footer: {
    alignItems: "center",
  },
});
