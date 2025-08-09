import FormInput from "@/components/FormInput";
import TitleHeader from "@/components/TitleHeader";
import { useLogout } from "@/features/auth/hooks";
import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/common/constants/colors";
import z from "zod";
import { useChangePassword } from "../../features/auth/hooks";

const AccountMenu = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const handleBackPress = () => {
    router.back();
  };

  const logoutMutation = useLogout();

  const handleEditProfilePress = () => {
    router.push("/(account)/profile");
    console.log("Edit Profile Pressed");
  };

  const handleNotificationPress = () => {
    router.push("/(account)/notification");
    console.log("Notification Pressed");
  };

  const handleLogoutPress = async () => {
    await logoutMutation.mutateAsync();
    router.replace("/(auth)/login");
  };

  const handleSettingsPress = () => {
    router.push("/(account)/settings");
    console.log("Settings Pressed");
  };

  return (
    <SafeAreaView>
      <TitleHeader
        title="Menu"
        showBackButton={true}
        onBackPress={handleBackPress}
      />

      <ScrollView>
        <View style={styles.container}>
          <MenuItem
            icon={<Feather name="user" size={22} />}
            label="Edit Profile"
            onPress={handleEditProfilePress}
          />

          <MenuItem
            icon={<Feather name="settings" size={22} />}
            label="Settings"
            onPress={handleSettingsPress}
          />

          <MenuItem
            icon={<Ionicons name="lock-closed-outline" size={22} />}
            label="Change Password"
            onPress={() => setModalVisible(true)}
          />

          <ChangePasswordModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
          <MenuItem
            icon={<Ionicons name="notifications-outline" size={22} />}
            label="Notification"
            onPress={handleNotificationPress}
          />
          <MenuItem
            icon={<MaterialIcons name="track-changes" size={22} />}
            label="Order Tracking History"
            style={{ display: "none" }}
          />

          <MenuItem
            icon={<Entypo name="language" size={22} />}
            label="Language"
            style={{ display: "none" }}
          />

          <MenuItem
            icon={<MaterialIcons name="logout" size={22} />}
            label="Log Out"
            onPress={handleLogoutPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  style?: ViewStyle;
  value?: string | null;
  onPress?: () => void;
  onLongPress?: () => void;
};

const MenuItem = ({
  icon,
  style,
  label,
  value,
  onPress,
  onLongPress,
}: MenuItemProps) => (
  <TouchableHighlight
    onPress={onPress}
    onLongPress={onLongPress}
    underlayColor={"#B3B3B3FF"}
  >
    <View style={[styles.menuItem, style]}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      {value ? <Text style={styles.value}>{value}</Text> : null}
    </View>
  </TouchableHighlight>
);

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/g, {
        message:
          "Password must contain at least one uppercase letter A-Z \n one lowercase letter a-z \n one number 0-9 \n and one special character !@#$%^&*",
      })
      .max(32, "Password too long"),
    confirmPassword: z.string(),
    logout: z.boolean().optional(), // <-- Add this
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

const ChangePasswordModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const useChangePasswordMutation = useChangePassword();
  const useLogoutMutation = useLogout();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      logout: false,
    },
  });

  // ✅ Correct place to define these states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: ChangePasswordInput) => {
    const { oldPassword, newPassword, logout = false } = data;

    await useChangePasswordMutation.mutateAsync({
      oldPassword,
      newPassword,
    });

    if (logout) {
      await useLogoutMutation.mutateAsync();
      console.log("User logged out after password change");
    }

    reset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Change Password</Text>

              {/* Old Password */}
              <Controller
                control={control}
                name="oldPassword"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    label="Old Password"
                    placeholder="Old Password"
                    value={value}
                    onChangeText={onChange}
                    error={errors.oldPassword?.message}
                    secureTextEntry={!showOldPassword}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => setShowOldPassword(!showOldPassword)}
                      >
                        <Ionicons
                          name={showOldPassword ? "eye-off" : "eye"}
                          size={20}
                          color="#999"
                        />
                      </TouchableOpacity>
                    }
                  />
                )}
              />

              {/* New Password */}
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    label="New Password"
                    placeholder="New Password"
                    value={value}
                    onChangeText={onChange}
                    error={errors.newPassword?.message}
                    secureTextEntry={!showNewPassword}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => setShowNewPassword(!showNewPassword)}
                      >
                        <Ionicons
                          name={showNewPassword ? "eye-off" : "eye"}
                          size={20}
                          color="#999"
                        />
                      </TouchableOpacity>
                    }
                  />
                )}
              />

              {/* Confirm Password */}
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    value={value}
                    onChangeText={onChange}
                    error={errors.confirmPassword?.message}
                    secureTextEntry={!showConfirmPassword}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <Ionicons
                          name={showConfirmPassword ? "eye-off" : "eye"}
                          size={20}
                          color="#999"
                        />
                      </TouchableOpacity>
                    }
                  />
                )}
              />

              {/* Logout toggle */}
              <Controller
                control={control}
                name="logout"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    onPress={() => onChange(!value)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 12,
                    }}
                  >
                    <Ionicons
                      name={value ? "checkbox" : "square-outline"}
                      size={24}
                      color="#222"
                    />
                    <Text style={{ marginLeft: 8 }}>
                      Log out from all devices
                    </Text>
                  </TouchableOpacity>
                )}
              />

              {/* Submit button */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={Colors.primary} />
                ) : (
                  <Text style={styles.saveButtonText}>SAVE</Text>
                )}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AccountMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingVertical: 16,
  },
  backButton: {
    backgroundColor: "#5B4FE9",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 32,
  },
  menu: {
    marginTop: 0,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  icon: {
    width: 32,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginLeft: 18,
    flex: 1,
  },
  value: {
    fontSize: 15,
    color: "#888",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 36,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#222A54",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
