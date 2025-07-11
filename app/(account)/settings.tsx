import TitleHeader from "@/components/TitleHeader";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
// Dummy initial data (replace with fetched user settings)
const initialSettings = {
  dark_mode: true,
  two_factor_authentication: false,
  notifications: {
    email_notifications: true,
    sms_notifications: false,
    app_alerts: true,
    newsletter: true,
    promotion: true,
  },
};

const SettingsPage = () => {
  const router = useRouter();
  const handleBackPress = () => router.back();

  const [settings, setSettings] = useState(initialSettings);

  const toggleSetting = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleNotification = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  // Example save/update function (replace with API call)
  const saveSettings = () => {
    console.log("Updated Settings:", settings);
    // await api.updateSettings(settings);
  };

  useEffect(() => {
    // Fetch real settings here (optional)
  }, []);

  return (
    <>
      <TitleHeader
        title="Settings"
        showBackButton={true}
        onBackPress={handleBackPress}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.sectionTitle}>General</Text>

          <SettingSwitch
            label="Dark Mode"
            value={settings.dark_mode}
            onToggle={() => toggleSetting("dark_mode")}
          />

          <SettingSwitch
            label="Two-Factor Authentication"
            value={settings.two_factor_authentication}
            onToggle={() => toggleSetting("two_factor_authentication")}
          />

          <Text style={styles.sectionTitle}>Notifications</Text>

          <SettingSwitch
            label="Email Notifications"
            value={settings.notifications.email_notifications}
            onToggle={() => toggleNotification("email_notifications")}
          />

          <SettingSwitch
            label="SMS Notifications"
            value={settings.notifications.sms_notifications}
            onToggle={() => toggleNotification("sms_notifications")}
          />

          <SettingSwitch
            label="App Alerts"
            value={settings.notifications.app_alerts}
            onToggle={() => toggleNotification("app_alerts")}
          />

          <SettingSwitch
            label="Newsletter"
            value={settings.notifications.newsletter}
            onToggle={() => toggleNotification("newsletter")}
          />

          <SettingSwitch
            label="Promotions"
            value={settings.notifications.promotion}
            onToggle={() => toggleNotification("promotion")}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const SettingSwitch = ({
  label,
  value,
  onToggle,
}: {
  label: string;
  value: boolean;
  onToggle: () => void;
}) => (
  <TouchableHighlight onPress={onToggle} underlayColor={Colors.underlayColor}>
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onToggle} />
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
  },
});

export default SettingsPage;
