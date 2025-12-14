import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Get screen width for charts
const screenWidth = Dimensions.get("window").width;

export default function StepDetailScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<"Day" | "Week" | "Month">("Day");

  // --- MOCK DATA ---
  const todayStats = { steps: 7000, km: 2.6, kcal: 420, time: "4:20" };
  const weekData = [4000, 5500, 7000, 10200, 3000, 8000, 6000]; // Mon-Sun
  const maxStep = Math.max(...weekData);

  // --- RENDER HELPERS ---
  const renderTab = (tabName: "Day" | "Week" | "Month") => (
    <TouchableOpacity onPress={() => setActiveTab(tabName)}>
      <Text
        className={`text-lg font-bold ${activeTab === tabName ? "text-white" : "text-gray-500"}`}
      >
        {tabName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* HEADER & TABS */}
      <View className="px-4 py-4">
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Tab Switcher */}
        <View className="flex-row justify-around mb-6">
          {renderTab("Day")}
          {renderTab("Week")}
          {renderTab("Month")}
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* === DAY VIEW === */}
        {activeTab === "Day" && (
          <View className="items-center mt-4">
            {/* Main Circle (Simulated Spikes using border) */}
            <View className="w-64 h-64 items-center justify-center border-4 border-red-900 rounded-full mb-10 bg-gray-900 shadow-lg shadow-red-500">
              <View className="w-56 h-56 bg-white rounded-full items-center justify-center border-4 border-red-600">
                <Text className="text-gray-400 text-sm uppercase">Today</Text>
                <Text className="text-black text-5xl font-extrabold">
                  {todayStats.steps}
                </Text>
                <Text className="text-gray-500 text-sm">Steps</Text>
              </View>
            </View>

            {/* Stats Grid */}
            <View className="flex-row w-full justify-around px-8 mb-10">
              <View className="items-center">
                <Ionicons name="location-outline" size={30} color="white" />
                <Text className="text-white text-xl font-bold mt-2">
                  {todayStats.km} km
                </Text>
              </View>
              <View className="items-center">
                <Ionicons name="time-outline" size={30} color="white" />
                <Text className="text-white text-xl font-bold mt-2">
                  {todayStats.time}
                </Text>
              </View>
            </View>

            <View className="items-center">
              <Ionicons name="flame-outline" size={40} color="#ef4444" />
              <Text className="text-white text-2xl font-bold mt-2">
                {todayStats.kcal} kcal
              </Text>
            </View>
          </View>
        )}

        {/* === WEEK VIEW === */}
        {activeTab === "Week" && (
          <View className="items-center px-4">
            {/* Total Circle Small */}
            <View className="w-40 h-40 bg-white rounded-full items-center justify-center mb-10 border-4 border-red-600">
              <Text className="text-gray-500 text-xs">This Week</Text>
              <Text className="text-black text-3xl font-bold">43,700</Text>
              <Text className="text-gray-500 text-xs">Steps</Text>
            </View>

            {/* Custom Bar Chart */}
            <View className="flex-row items-end justify-between w-full h-48 px-2 space-x-2">
              {weekData.map((steps, index) => {
                const heightPercentage = (steps / maxStep) * 100;
                return (
                  <View key={index} className="items-center flex-1">
                    <Text className="text-white text-[10px] mb-1">{steps}</Text>
                    <View
                      className="w-full bg-red-600 rounded-t-lg opacity-80"
                      style={{ height: `${heightPercentage}%` }}
                    />
                    <Text className="text-gray-500 text-xs mt-2">
                      {["M", "T", "W", "T", "F", "S", "S"][index]}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Week Bottom Stats */}
            <View className="flex-row w-full justify-around px-8 mt-12">
              <View className="items-center">
                <Ionicons name="location-outline" size={24} color="white" />
                <Text className="text-white text-lg font-bold">28.4 km</Text>
              </View>
              <View className="items-center">
                <Ionicons name="time-outline" size={24} color="white" />
                <Text className="text-white text-lg font-bold">32:00</Text>
              </View>
            </View>
          </View>
        )}

        {/* === MONTH VIEW (Calendar) === */}
        {activeTab === "Month" && (
          <View className="px-4">
            <View className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
              <Text className="text-white text-center mb-4 text-lg font-bold">
                September 2025
              </Text>

              {/* Days Header */}
              <View className="flex-row justify-around mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((dayLetter, index) => (
                  <Text key={index} className="text-gray-500 font-bold">
                    {dayLetter}
                  </Text>
                ))}
              </View>

              {/* Fake Calendar Grid */}
              <View className="flex-row flex-wrap">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <View key={day} className="w-[14.28%] items-center mb-4">
                    <View
                      className={`h-8 w-8 items-center justify-center rounded-full ${day === 4 ? "bg-red-600" : ""}`}
                    >
                      <Text
                        className={`text-xs ${day === 4 ? "text-white font-bold" : "text-gray-400"}`}
                      >
                        {day}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View className="flex-row w-full justify-around px-8 mt-10">
              <View className="items-center">
                <Ionicons name="location-outline" size={30} color="white" />
                <Text className="text-white text-xl font-bold mt-2">
                  120 km
                </Text>
              </View>
              <View className="items-center">
                <Ionicons name="time-outline" size={30} color="white" />
                <Text className="text-white text-xl font-bold mt-2">90:00</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer Navigation simulation (Just visual or rely on real tab bar) */}
    </SafeAreaView>
  );
}
