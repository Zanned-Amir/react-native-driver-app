import { Colors } from "@/common/constants/colors";
import FormInput from "@/components/FormInput";
import TitleHeader from "@/components/TitleHeader";
import { useProfile, useProfileAvatar } from "@/features/auth/hooks";

import { AntDesign } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";

const profileSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.email("Invalid email"),
  role_name: z.string().min(1, "Role name is required"),
  phone_number: z
    .string()
    .regex(/^\+?[0-9]{8}$/, "Phone number must be exactly 8 digits long"),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const router = useRouter();
  const PlaceHolderImage = require("../../assets/images/avatar.png");

  const { data: profile, isLoading } = useProfile();
  const { data: profileAvatar, isLoading: isAvatarLoading } =
    useProfileAvatar();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      email: "",
      role_name: "",
      phone_number: "",
      address_line_1: "",
      address_line_2: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name,
        email: profile.email,
        role_name: profile.role_name,
        phone_number: profile.phone_number,
        address_line_1: profile.address_line_1,
        address_line_2: profile.address_line_2,
      });
    }
  }, [profile, reset]);

  const handleBackPress = () => {
    router.back();
  };

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Submit:", data);
    // call your update API here
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <TitleHeader
          title="Profile"
          showBackButton={true}
          onBackPress={handleBackPress}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TitleHeader
        title="Profile"
        showBackButton={true}
        onBackPress={handleBackPress}
      />
      <ScrollView>
        <View style={styles.container}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              source={profileAvatar || PlaceHolderImage}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <AntDesign name="camerao" size={20} color="#5B4FE9" />
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <Controller
              name="role_name"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  label="Role"
                  placeholder="Role"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.role_name?.message}
                  editable={false}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  label="Email"
                  placeholder="Email"
                  keyboardType="email-address"
                  value={value}
                  editable={false}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              name="full_name"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  label="Full Name"
                  placeholder="Full Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.full_name?.message}
                />
              )}
            />
            <Controller
              name="phone_number"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  label="Phone"
                  placeholder="Phone"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={false}
                  error={errors.phone_number?.message}
                />
              )}
            />

            <Controller
              name="address_line_1"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  label="Address Line 1"
                  placeholder="Address Line 1"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={false}
                  error={errors.address_line_1?.message}
                />
              )}
            />
            <Controller
              name="address_line_2"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <FormInput
                  label="Address Line 2"
                  placeholder="Address Line 2"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={false}
                  error={errors.address_line_2?.message}
                />
              )}
            />
          </View>

          {/* Save Button 
          // hide the save button  for now as the update functionality is not implemented yet
          */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              !isDirty && {
                backgroundColor: Colors.secondaryTransparent,
                display: "none",
              },
            ]}
            disabled={!isDirty}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 24,
    alignSelf: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 6,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: "#eee",
  },
  form: {
    width: "100%",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 15,
    backgroundColor: "#fafafa",
  },
  saveButton: {
    width: "100%",
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
