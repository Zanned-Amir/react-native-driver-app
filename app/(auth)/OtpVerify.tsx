import { Colors } from "@/common/constants/colors";
import { CustomButton } from "@/components/CustomButton";
import TitleHeader from "@/components/TitleHeader";
import {
  useResendVerificationEmail,
  useVerifyEmailOtp,
  useVerifyOtpResetPassword,
} from "@/features/auth/hooks";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export const OtpPage = () => {
  const params = useLocalSearchParams<{
    email: string;
    type: "emailVerification" | "resetPassword";
  }>();
  const email = params.email;
  const router = useRouter();
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const isEmailVerification = params.type === "emailVerification";
  const isResetPassword = params.type === "resetPassword";

  const verifyEmailOtpMutation = useVerifyEmailOtp();
  const resendEmailVerificationMutation = useResendVerificationEmail();
  const verifyResetPasswordOtpMutation = useVerifyOtpResetPassword();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const otp = watch("otp");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const currentOtp = otp.split("");
    currentOtp[index] = value;
    const newOtp = currentOtp.join("");
    setValue("otp", newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: OtpFormData) => {
    switch (params.type) {
      case "emailVerification":
        const result = await verifyEmailOtpMutation.mutateAsync({
          otp: data.otp,
        });
        if (result.success) {
          router.replace("/(tabs)/home");
        } else {
          console.error("Verification failed");
        }
        break;
      case "resetPassword":
        // Handle reset password logic here
        const res = await verifyResetPasswordOtpMutation.mutateAsync({
          otp: data.otp,
        });

        if (res.success) {
          router.navigate("/(auth)/resetPassword");
        } else {
          console.error("OTP verification failed");
        }

        router.navigate("/(auth)/resetPassword");
        break;
      default:
        console.error("Unknown OTP type");
    }
  };

  const handleResend = async () => {
    switch (params.type) {
      case "emailVerification":
        await resendEmailVerificationMutation.mutateAsync({ email });
        break;
      case "resetPassword":
        router.navigate("/(auth)/resetPassword");
        break;
      default:
        console.error("Unknown OTP type");
    }
  };

  return (
    <View style={styles.container}>
      <TitleHeader
        title={isEmailVerification ? "Verify Email" : "Reset Password"}
        showBackButton
        onBackPress={router.back}
      />

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          We've sent an email to {email} please enter the code below.
        </Text>

        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Enter Code</Text>
          <Controller
            name="otp"
            control={control}
            render={({ field: { value }, fieldState: { error } }) => (
              <>
                <View style={styles.codeInputs}>
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => {
                          inputRefs.current[index] = ref;
                        }}
                        style={[
                          styles.codeInput,
                          error ? { borderColor: "red" } : {},
                        ]}
                        value={value[index] || ""}
                        onChangeText={(val) => handleInputChange(index, val)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="numeric"
                        maxLength={1}
                      />
                    ))}
                </View>
                {error && (
                  <Text style={{ color: "red", marginBottom: 10 }}>
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <CustomButton
          title="Verify"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={otp.length !== 6}
        />

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't see your email? </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtpPage;

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
