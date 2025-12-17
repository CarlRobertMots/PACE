import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Linking } from "react-native";



export default function Shop() {


   const handlePress = () => {
    // Replace with your target URL
    const url = "https://preview.redd.it/meme-dumping-until-i-can-skip-both-ads-at-once-v0-4xsd6lszeoqc1.jpeg?auto=webp&s=c1262c284c4eb512c7ce50dce768a5292869c077";
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Restore purchases */}
        <TouchableOpacity style={styles.restoreBtn}>
          <Text style={styles.restoreText}>Restore purchases</Text>
        </TouchableOpacity>

        {/* Limited offer */}
        <View style={styles.offerCard}>
          <View style={styles.timerWrapper}>
            <View style={styles.timer}>
              <Text style={styles.timerText}>06:05:35</Text>
            </View>
          </View>

          <Text style={styles.offerTitle}>Limited time offer!!</Text>

          <View style={styles.offerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.offerDesc}>
                Legendary Chest{"\n"}50% OFF
              </Text>
            </View>

            <Image
              source={{
                uri: "https://api.builder.io/api/v1/image/assets/TEMP/b547cf7ffe378eb291900916f40db4107d53aeae?width=255",
              }}
              style={styles.offerImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Small products */}
        <View style={styles.grid2}>
        <TouchableOpacity style={styles.smallCard} onPress={handlePress}>
      <Text style={styles.smallText}>Remove Ads</Text>
      <Text style={styles.smallText}>$2.99</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard}>
            <Text style={[styles.smallText, { fontSize: 13 }]}>
              Somethign Somethign
            </Text>
            <Text style={styles.smallText}>$2.99</Text>
          </TouchableOpacity>
        </View>

        {/* Chest grid */}
        <View style={styles.grid2}>
          {[1, 2, 3, 4].map((i) => (
            <TouchableOpacity key={i} style={styles.chestCard}>
              <Text style={styles.chestTitle}>Treasure Chest</Text>

              <Image
                source={{
                  uri: "https://api.builder.io/api/v1/image/assets/TEMP/b547cf7ffe378eb291900916f40db4107d53aeae?width=255",
                }}
                style={styles.chestImage}
                resizeMode="contain"
              />

              <Text style={styles.chestPrice}>$4.99</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}


const PURPLE = "rgba(168,85,247,0.5)";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  scroll: {
    paddingBottom: 80,
    paddingHorizontal: 28,
    paddingTop: 24,
  },

  restoreBtn: {
    height: 64,
    borderWidth: 2,
    borderColor: PURPLE,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },

  restoreText: {
    color: "white",
    fontSize: 24,
    fontFamily: "pixel", // keep same font mapping
  },

  offerCard: {
    borderWidth: 2,
    borderColor: PURPLE,
    borderRadius: 10,
    padding: 20,
    marginBottom: 24,
  },

  timerWrapper: {
    position: "absolute",
    top: -8,
    right: 32,
    transform: [{ rotate: "16.685deg" }],
  },

  timer: {
    borderWidth: 2,
    borderColor: PURPLE,
    borderRadius: 10,
    backgroundColor: "black",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  timerText: {
    color: "white",
    fontSize: 16,
    fontFamily: "pixel",
  },

  offerTitle: {
    color: "white",
    fontSize: 24,
    marginBottom: 12,
    fontFamily: "pixel",
  },

  offerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  offerDesc: {
    color: "white",
    fontSize: 20,
    lineHeight: 22,
    fontFamily: "pixel",
  },

  offerImage: {
    width: 128,
    height: 128,
  },

  grid2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },

  smallCard: {
    width: "48%",
    height: 64,
    borderWidth: 2,
    borderColor: PURPLE,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  smallText: {
    color: "white",
    fontSize: 18,
    fontFamily: "pixel",
  },

  chestCard: {
    width: "48%",
    borderWidth: 2,
    borderColor: PURPLE,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },

  chestTitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "pixel",
  },

  chestImage: {
    width: 128,
    height: 128,
    marginBottom: 8,
  },

  chestPrice: {
    color: "white",
    fontSize: 18,
    fontFamily: "pixel",
  },
});
