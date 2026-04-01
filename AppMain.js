import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const getExpoHost = () => {
  const candidates = [
    Constants.expoConfig?.hostUri,
    Constants.manifest2?.extra?.expoGo?.debuggerHost,
    Constants.manifest?.debuggerHost
  ];

  const hostValue = candidates.find(Boolean) ?? "";
  const host = hostValue.split(":")[0];
  return host || "localhost";
};

const getApiBaseUrl = (port) => {
  const host = getExpoHost();
  return `http://${host}:${port}`;
};

const API_BASE_URL = getApiBaseUrl(4109);

function MainApp() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/reports`)
      .then((response) => response.json())
      .then((data) => setReport(data))
      .catch(() => setReport([]));
  }, []);

  const maxValue = Math.max(...report.map((item) => Number(item.total)), 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Monthly Spending</Text>
        <View style={styles.chartCard}>
          {report.map((item) => (
            <View key={item.month_name} style={styles.barRow}>
              <Text style={styles.label}>{item.month_name}</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${(Number(item.total) / maxValue) * 100}%` }]} />
              </View>
              <Text style={styles.value}>${Number(item.total).toFixed(0)}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eff6ff" },
  title: { fontSize: 28, fontWeight: "700", color: "#1d4ed8", padding: 20 },
  chartCard: { backgroundColor: "#ffffff", borderRadius: 18, padding: 16, marginHorizontal: 20 },
  barRow: { marginBottom: 16 },
  label: { fontWeight: "700", color: "#334155", marginBottom: 6 },
  barTrack: { height: 18, backgroundColor: "#dbeafe", borderRadius: 999, overflow: "hidden" },
  barFill: { height: "100%", backgroundColor: "#2563eb", borderRadius: 999 },
  value: { marginTop: 6, color: "#1e3a8a" }
});

registerRootComponent(MainApp);

export default MainApp;
