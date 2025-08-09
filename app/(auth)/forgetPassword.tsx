import { Colors } from "@/common/constants/colors";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import TitleHeader from "@/components/TitleHeader";
import { useForgotPassword } from "@/features/auth/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

// Schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const router = useRouter();
  const forgetPasswordMutation = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    const { data: forgetData } = await forgetPasswordMutation.mutateAsync(data);

    router.navigate({
      pathname: "/(auth)/OtpVerify",
      params: { email: data.email, type: "resetPassword" },
    });
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleLoginPress = () => {
    router.navigate("/login");
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
              name="email"
              control={control}
              label="Email Address"
              placeholder="thebhol@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomButton
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
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
