import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";

interface QRCodeScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onQRCodeScanned: (code: string) => void;
}

const screenWidth = Dimensions.get("window").width;
const frameSize = screenWidth * 0.65; // ✅ Adjustable scan frame size

const QRCodeScannerModal: React.FC<QRCodeScannerModalProps> = ({
  visible,
  onClose,
  onQRCodeScanned,
}) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && codes[0]?.value) {
        onQRCodeScanned(codes[0].value);
        onClose();
      }
    },
  });

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    };

    requestCameraPermission();
  }, [visible]);

  if (!visible || !device || !hasPermission) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={{ marginTop: 16, color: "#666" }}>
            Preparing camera...
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.fallbackClose}>
            <Ionicons name="close" color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={visible}
          codeScanner={codeScanner}
        />
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Scan QR Code</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ✅ Scanner Box in Center */}
        <View style={styles.scanBoxContainer}>
          <View style={styles.scanBox} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  scanText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  fallbackClose: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
  },

  // ✅ Scan Box Addition
  scanBoxContainer: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: -(frameSize / 2) }],
    width: frameSize,
    height: frameSize,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#00FF80",
    borderWidth: 2,
    borderRadius: 8,
    zIndex: 20,
  },
  scanBox: {
    width: frameSize,
    height: frameSize,
    borderColor: "#00FF80",
    borderWidth: 2,
    borderRadius: 8,
  },
});

export default QRCodeScannerModal;
