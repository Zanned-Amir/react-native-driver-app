// components/RunCard.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface RunProps {
  id: string;
  runNumber: string;
  startDate: string;
  endDate?: string;
  status: "active" | "completed" | "pending";
  totalDeliveries: number;
  completedDeliveries: number;
  currentLocation: string;
  estimatedDuration: string;
  driverName: string;
  vehicleCode?: string;
  qrCode?: string;
}

interface RunCardProps {
  run: RunProps;
  onScanQR: (runId: string) => void;
  onEnterCode: (runId: string) => void;
  onFinishRun: (runId: string) => void;
  onViewDetails: (runId: string) => void;
}

const RunCard: React.FC<RunCardProps> = ({
  run,
  onScanQR,
  onEnterCode,
  onFinishRun,
  onViewDetails,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#4CAF50";
      case "completed":
        return "#2196F3";
      case "pending":
        return "#FF9800";
      default:
        return "#757575";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "In Progress";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  const handleFinishRun = () => {
    Alert.alert(
      "Finish Run",
      "Are you sure you want to mark this run as completed?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => onFinishRun(run.id) },
      ]
    );
  };

  const progressPercentage =
    (run.completedDeliveries / run.totalDeliveries) * 100;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.runNumber}>Run #{run.runNumber}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(run.status) },
            ]}
          >
            <Text style={styles.statusText}>{getStatusText(run.status)}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => onViewDetails(run.id)}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Driver Info */}
      <View style={styles.driverInfo}>
        <Ionicons name="person-circle" size={24} color="#666" />
        <Text style={styles.driverName}>{run.driverName}</Text>
      </View>

      {/* Delivery Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {run.completedDeliveries}/{run.totalDeliveries} Deliveries
          </Text>
          <Text style={styles.progressPercentage}>
            {Math.round(progressPercentage)}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progressPercentage}%` }]}
          />
        </View>
      </View>

      {/* Location & Time */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.infoText}>{run.currentLocation}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="time" size={16} color="#666" />
          <Text style={styles.infoText}>{run.estimatedDuration}</Text>
        </View>
      </View>

      {/* Dates */}
      <View style={styles.dateSection}>
        <Text style={styles.dateText}>Started: {run.startDate}</Text>
        {run.endDate && (
          <Text style={styles.dateText}>Ended: {run.endDate}</Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => onScanQR(run.id)}
        >
          <Ionicons name="qr-code" size={20} color="#fff" />
          <Text style={styles.buttonText}>Scan QR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.codeButton}
          onPress={() => onEnterCode(run.id)}
        >
          <Ionicons name="keypad" size={20} color="#fff" />
          <Text style={styles.buttonText}>Enter Code</Text>
        </TouchableOpacity>

        {run.status === "active" && (
          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinishRun}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Vehicle Code Display */}
      {run.vehicleCode && (
        <View style={styles.vehicleCodeSection}>
          <Text style={styles.vehicleCodeLabel}>Vehicle Code:</Text>
          <Text style={styles.vehicleCode}>{run.vehicleCode}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  runNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  driverName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  progressSection: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  dateSection: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  scanButton: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    gap: 4,
  },
  codeButton: {
    backgroundColor: "#FF9800",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    gap: 4,
  },
  finishButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    gap: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  vehicleCodeSection: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleCodeLabel: {
    fontSize: 14,
    color: "#666",
  },
  vehicleCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "monospace",
  },
});

export default RunCard;
