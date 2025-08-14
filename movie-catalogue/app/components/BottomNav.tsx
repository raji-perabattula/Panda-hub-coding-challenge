import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import * as Styles from "../constants/StylingVariables";

export default function BottomNav() {
  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity style={styles.item}>
        <Text style={[styles.label, styles.activeLabel]}>Home</Text>
        <View style={styles.activeDot} />
      </TouchableOpacity>

      {/* Video */}
      <TouchableOpacity style={styles.item}>
        <MaterialIcons name="video-call" size={24} color="#999" />
      </TouchableOpacity>

      {/* Ticket */}
      <TouchableOpacity style={styles.item}>
        <FontAwesome5 name="ticket-alt" size={20} color="#999" />
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity style={styles.item}>
        <MaterialIcons name="person-outline" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Styles.searchBgColor,
    paddingVertical: Styles.spacing20,
    borderTopLeftRadius: Styles.borderRadiusLarge,
    borderTopRightRadius: Styles.borderRadiusLarge,
    borderWidth: 1,
    borderColor: Styles.borderColor,
  },
  item: {
    alignItems: "center",
  },
  label: {
    fontSize: Styles.fontSizeMedium,
  },
  activeLabel: {
    color: Styles.primaryTextColor,
  },
  activeDot: {
    width: Styles.spacing16,
    height: Styles.spacing6,
    borderRadius: Styles.borderRadiusSmall,
    backgroundColor: Styles.highlightColor,
    marginTop: Styles.spacing2,
  },
});
