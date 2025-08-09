import { Colors } from "@/common/constants/colors";
import { CustomInput } from "@/components/CustomInput";
import { useLogin, useSendVerificationEmailOtp } from "@/features/auth/hooks";
import { useAuthStore } from "@/features/auth/store";
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
import Toast from "react-native-toast-message";
import { z } from "zod";
import { CustomButton } from "../../components/CustomButton";
import { GoogleSignInButton } from "../../components/GoogleSignInButton";

const loginSchema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isVerified = useAuthStore((state) => state.isVerified);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginMutation = useLogin();
  const sendEmailVerificationMutation = useSendVerificationEmailOtp();
  const onSubmit = async (data: LoginFormValues) => {
    const res = await loginMutation.mutateAsync(data);
    if (res.email_verified) {
      router.replace("/(tabs)/home");
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      });
    } else if (!res.email_verified) {
      console.log("User needs to verify email");
      await sendEmailVerificationMutation.mutateAsync({
        email: data.email,
      });

      router.push({
        pathname: "/(auth)/OtpVerify",
        params: { email: data.email, type: "emailVerification" },
      });
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In pressed");
  };

  const handleForgotPassword = () => {
    router.navigate("/forgetPassword");
  };

  const handleSignUp = () => {
    router.navigate("/register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Login</Text>
        {/* Placeholder for Google Sign-In button if needed */
        /* TODO : Implement Google Sign-In */}
        <View style={{ display: "none" }}>
          <GoogleSignInButton onPress={handleGoogleSignIn} />
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or sign in with</Text>
            <View style={styles.dividerLine} />
          </View>
        </View>

        <CustomInput
          name="email"
          control={control}
          label="Email Address"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomInput
          name="password"
          control={control}
          label="Password"
          placeholder="Enter your password"
          isPassword={true}
        />

        <TouchableOpacity
          onPress={handleForgotPassword}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        {/* Keep me signed in checkbox 
    TODO: Implement functionality if needed */}

        <View style={[styles.checkboxContainer, { display: "none" }]}>
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
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting}
        />

        <View style={[styles.signUpContainer, { display: "none" }]}>
          <Text style={styles.signUpText}>Don't have an Account? </Text>
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
