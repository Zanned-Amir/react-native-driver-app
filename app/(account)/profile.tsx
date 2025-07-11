import FormInput from "@/components/FormInput";
import TitleHeader from "@/components/TitleHeader";
import { Colors } from "@/constants/colors";
import { AntDesign } from "@expo/vector-icons";

import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePage = () => {
  const PlaceHolderImage = require("../../assets/images/avatar.png");
  const router = useRouter();

  // Store initial data in a ref so it doesn't change on re-render
  const initialData = useRef({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    mobile: "+91-123456789",
  });

  const handleBackPress = () => {
    router.back();
    console.log("Back button pressed");
  };

  // State for current input values
  const [firstName, setFirstName] = useState(initialData.current.firstName);
  const [lastName, setLastName] = useState(initialData.current.lastName);
  const [email, setEmail] = useState(initialData.current.email);
  const [mobile, setMobile] = useState(initialData.current.mobile);

  // Compare current state to initial values
  const isSameInput =
    firstName === initialData.current.firstName &&
    lastName === initialData.current.lastName &&
    email === initialData.current.email &&
    mobile === initialData.current.mobile;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TitleHeader
        title="Menu"
        showBackButton={true}
        onBackPress={handleBackPress}
      />
      <ScrollView>
        <View style={styles.container}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image source={PlaceHolderImage} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraIcon}>
              <AntDesign name="camerao" size={20} color="#5B4FE9" />
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.form}>
              <FormInput
                label="First Name"
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                inputStyle={styles.input}
              />
              <FormInput
                label="Last Name"
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                inputStyle={styles.input}
              />
              <FormInput
                label="E-Mail"
                placeholder="E-Mail"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                inputStyle={styles.input}
              />
              <FormInput
                label="Mobile"
                placeholder="Mobile"
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={setMobile}
                inputStyle={styles.input}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              isSameInput && { backgroundColor: Colors.secondaryTransparent },
            ]}
            disabled={isSameInput}
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
});
