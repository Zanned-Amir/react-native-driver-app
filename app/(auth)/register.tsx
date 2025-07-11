import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

//NB: register page disabled for now
export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    acceptTOS: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const kbOffset = useRef(new Animated.Value(0)).current;

  const emailIsValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleSignup = () => {
    const newErr: any = {};
    if (!form.firstName.trim()) newErr.firstName = true;
    if (!form.lastName.trim()) newErr.lastName = true;
    if (!emailIsValid(form.email)) newErr.email = true;
    if (form.password.length < 6) newErr.password = true;
    if (form.password !== form.confirm) newErr.confirm = true;
    if (!form.acceptTOS) newErr.acceptTOS = true;

    setErrors(newErr);
    if (Object.keys(newErr).length) {
      triggerShake();
      return;
    }

    setLoading(true);
    // TODO: call signup API
    setTimeout(() => setLoading(false), 2000);
  };

  const handleSignIn = () => {
    router.navigate("/login");
  };

  const handleGoogleSignIn = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <GoogleSignInButton onPress={handleGoogleSignIn} />

        <Text style={styles.or}>or create account with</Text>

        {/* ---- Form fields ---- */}
        <CustomInput
          label="First Name"
          value={form.firstName}
          onChangeText={(v) => onChange("firstName", v)}
          placeholder="Becca"
          error={errors.firstName}
          errorMessage="Required"
        />
        <CustomInput
          label="Last Name"
          value={form.lastName}
          onChangeText={(v) => onChange("lastName", v)}
          placeholder="Ade"
          error={errors.lastName}
          errorMessage="Required"
        />
        <CustomInput
          label="Email Address"
          value={form.email}
          onChangeText={(v) => onChange("email", v)}
          placeholder="becca@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          errorMessage="Enter a valid email"
        />
        <CustomInput
          label="Password"
          value={form.password}
          onChangeText={(v) => onChange("password", v)}
          placeholder="••••••••"
          secureTextEntry={!showPwd}
          rightIcon={showPwd ? "eye-off" : "eye"}
          onRightIconPress={() => setShowPwd(!showPwd)}
          error={errors.password}
          errorMessage="≥ 6 characters"
        />
        <CustomInput
          label="Confirm Password"
          value={form.confirm}
          onChangeText={(v) => onChange("confirm", v)}
          placeholder="Re-enter password"
          secureTextEntry={!showPwd}
          rightIcon={showPwd ? "eye-off" : "eye"}
          onRightIconPress={() => setShowPwd(!showPwd)}
          error={errors.confirm}
          errorMessage="Passwords do not match"
        />

        {/* ---- Submit ---- */}
        <CustomButton
          title="Signup"
          onPress={handleSignup}
          loading={loading}
          disabled={loading}
        />

        {/* ---- Link to Login ---- */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Have an account? </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.link}>Sign in here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ---- Terms of Service ---- */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  googleBtn: { marginBottom: 50 },
  or: { textAlign: "center", color: "#666", marginBottom: 20, marginTop: 10 },
  checkbox: { marginVertical: 20 },
  tosError: { color: "#FF6B6B", fontSize: 13, marginBottom: 10 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 30 },
  footerText: { color: "#666" },
  link: { color: "#4285f4", fontWeight: "500" },
});
