import { Colors } from "@/common/constants/colors";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";

const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be ≥ 6 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // fake API
      console.log("Signup Data", data);
      router.replace("/login");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <GoogleSignInButton onPress={() => {}} />
        <Text style={styles.or}>or create account with</Text>

        <CustomInput
          name="firstName"
          control={control}
          label="First Name"
          placeholder="Becca"
        />
        <CustomInput
          name="lastName"
          control={control}
          label="Last Name"
          placeholder="Ade"
        />
        <CustomInput
          name="email"
          control={control}
          label="Email Address"
          placeholder="becca@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomInput
          name="password"
          control={control}
          label="Password"
          placeholder="••••••••"
          secureTextEntry={!showPwd}
        />
        <CustomInput
          name="confirm"
          control={control}
          label="Confirm Password"
          placeholder="Re-enter password"
          secureTextEntry={!showPwd}
        />

        <CustomButton
          title="Signup"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Have an account? </Text>
          <TouchableOpacity onPress={() => router.navigate("/login")}>
            <Text style={styles.link}>Sign in here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
