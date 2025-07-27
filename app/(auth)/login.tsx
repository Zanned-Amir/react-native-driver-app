import { Colors } from "@/common/constants/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { GoogleSignInButton } from "../../components/GoogleSignInButton";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validation
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    setLoading(true);

    try {
      // Add your login logic here
      console.log("Login attempt:", { email, password, keepSignedIn });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to main app or handle success
      Alert.alert("Success", "Login successful!");
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Add Google Sign-In logic here
    console.log("Google Sign-In pressed");
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    console.log("Forgot password pressed");
    router.navigate("/forgetPassword");
  };

  const handleSignUp = () => {
    // Navigate to sign up screen
    router.navigate("/register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Login</Text>
        <GoogleSignInButton onPress={handleGoogleSignIn} />
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or sign in with</Text>
          <View style={styles.dividerLine} />
        </View>
        <CustomInput
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />
        <CustomInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={passwordError}
        />
        <TouchableOpacity
          onPress={handleForgotPassword}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setKeepSignedIn(!keepSignedIn)}
          >
            <View
              style={[
                styles.checkboxInner,
                keepSignedIn && styles.checkboxChecked,
              ]}
            >
              {keepSignedIn && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Keep me signed in</Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Login"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />
        <View style={styles.signUpContainer}></View>

        <View style={[styles.signUpContainer, { display: "none" }]}>
          <Text style={styles.signUpText}> Don't have an Account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}>Sign up here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.title,
    textAlign: "center",
    marginBottom: 32,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: Colors.text,
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: Colors.secondary,
    fontSize: 14,
  },
  checkboxContainer: {
    marginBottom: 24,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 4,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: Colors.secondary,
  },
  checkmark: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxLabel: {
    color: Colors.text,
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: Colors.text,
    fontSize: 14,
  },
  signUpLink: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "600",
  },
});
