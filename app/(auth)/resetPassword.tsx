import { Colors } from "@/common/constants/colors";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import TitleHeader from "@/components/TitleHeader";
import { useResetPassword } from "@/features/auth/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

// Schema
const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/g, {
        message:
          "Password must contain at least one uppercase letter A-Z \n one lowercase letter a-z \n one number 0-9 \n and one special character !@#$%^&*",
      })
      .max(32, "Password too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const ResetPasswordPage = () => {
  const router = useRouter();
  const changePasswordMutation = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    await changePasswordMutation.mutateAsync({
      password: data.newPassword,
    });

    router.navigate("/login");
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <>
      <TitleHeader
        title="Reset Password"
        onBackPress={handleBackPress}
        showBackButton={true}
      />

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.form}>
            <CustomInput
              name="newPassword"
              control={control}
              label="New Password"
              placeholder="Enter new password"
              isPassword={true}
            />

            <CustomInput
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              placeholder="Re-enter new password"
              isPassword={true}
            />

            <CustomButton
              title="Change Password"
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ResetPasswordPage;

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
});
