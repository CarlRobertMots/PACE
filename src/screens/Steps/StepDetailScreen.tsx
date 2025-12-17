import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSteps } from "../../components/StepCounter/StepContext";
import StepCircle from "../../components/StepCounter/StepCircle";

const screenWidth = Dimensions.get("window").width;

export default function StepDetailScreen() {
  const navigation = useNavigation();
  const { steps } = useSteps();
  const [activeTab, setActiveTab] = useState<"Day" | "Week" | "Month">("Day");

  // DAY STATS
  const km = (steps * 0.00076).toFixed(2);
  const kcal = Math.floor(steps * 0.04);
  const totalMinutes = Math.floor(steps / 110);
  const timeString = `${Math.floor(totalMinutes / 60)}:${(totalMinutes % 60)
    .toString()
    .padStart(2, "0")}`;

  // MOCK DATA GENERATOR (For Rays)
  const mockDetailedHistory = useMemo(() => {
    return Array.from({ length: 144 }).map((_, i) => {
      let base = Math.random() * 50;
      if (i > 36 && i < 60) base += Math.random() * 800;
      if (i > 72 && i < 84) base += Math.random() * 400;
      if (i > 108 && i < 126) base += Math.random() * 1000;
      if (i < 30 || i > 138) base = Math.random() < 0.1 ? 50 : 0;
      return Math.floor(base);
    });
  }, []);

  // WEEK DATA
  const weekData = [4400, 2400, 10400, 400, 4900, 3600, 0];
  const maxWeekStep = 12000;
  const totalWeekSteps = weekData.reduce((a, b) => a + b, 0);

  const renderTab = (tabName: "Day" | "Week" | "Month") => (
    <TouchableOpacity onPress={() => setActiveTab(tabName)}>
      <Text
        className={`text-lg font-bold ${
          activeTab === tabName ? "text-white" : "text-gray-500"
        }`}
      >
        {tabName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-black"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      {/* HEADER */}
      <View className="px-4 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View className="flex-row justify-around mb-6">
          {renderTab("Day")}
          {renderTab("Week")}
          {renderTab("Month")}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* DAY VIEW */}
        {activeTab === "Day" && (
          <View className="items-center mt-8">
            <View className="mb-12">
              <StepCircle
                steps={steps}
                radius={110}
                detailedData={mockDetailedHistory}
                title="Today"
              />
            </View>

            <View className="flex-row w-full justify-around px-8 mb-10">
              <View className="items-center">
                <Ionicons name="location-outline" size={30} color="white" />
                <Text className="text-white text-xl font-bold mt-2">
                  {km} km
                </Text>
              </View>
              <View className="items-center">
                <Ionicons name="time-outline" size={30} color="white" />
                <Text className="text-white text-xl font-bold mt-2">
                  {timeString}
                </Text>
              </View>
            </View>

            <View className="items-center">
              <Ionicons name="flame-outline" size={40} color="#ef4444" />
              <Text className="text-white text-2xl font-bold mt-2">
                {kcal} kcal
              </Text>
            </View>
          </View>
        )}

        {/* WEEK VIEW */}
        {activeTab === "Week" && (
          <View className="items-center mt-4">
            <View className="mb-12">
              <StepCircle
                steps={totalWeekSteps}
                radius={100}
                detailedData={mockDetailedHistory}
                title="This Week"
              />
            </View>

            <View className="flex-row items-end justify-between w-full h-64 px-6 mb-12">
              {weekData.map((val, index) => {
                const heightPercentage = Math.min(
                  (val / maxWeekStep) * 100,
                  100
                );

                return (
                  <View key={index} className="items-center flex-1 space-y-2">
                    <Text className="text-white text-[10px] font-bold h-4">
                      {val > 0 ? val : ""}
                    </Text>

                    <View className="w-8 h-40 bg-gray-800 rounded-full justify-end overflow-hidden">
                      <View
                        className="w-full bg-red-600 rounded-full"
                        style={{ height: `${heightPercentage}%` }}
                      />
                    </View>

                    <Text className="text-gray-500 text-xs font-bold">
                      {["M", "T", "W", "T", "F", "S", "S"][index]}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View className="flex-row w-full justify-around px-8">
              <View className="items-center">
                <Ionicons name="location-outline" size={32} color="white" />
                <Text className="text-white text-xl font-bold mt-2">
                  28.4 km
                </Text>
              </View>
              <View className="items-center">
                <Ionicons name="time-outline" size={32} color="white" />
                <Text className="text-white text-xl font-bold mt-2">4:20</Text>
              </View>
            </View>
          </View>
        )}

        {/* MONTH VIEW */}
        {activeTab === "Month" && (
          <View className="px-4">
            <View className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
              <Text className="text-white text-center mb-4 text-lg font-bold">
                September 2025
              </Text>

              <View className="flex-row justify-around mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <Text key={i} className="text-gray-500 font-bold">
                    {d}
                  </Text>
                ))}
              </View>

              <View className="flex-row flex-wrap">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <View key={day} className="w-[14.28%] items-center mb-4">
                    <View
                      className={`h-8 w-8 items-center justify-center rounded-full ${
                        day === 4 ? "bg-red-600" : ""
                      }`}
                    >
                      <Text
                        className={`text-xs ${
                          day === 4 ? "text-white font-bold" : "text-gray-400"
                        }`}
                      >
                        {day}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
