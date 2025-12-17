// FILE: src/screens/Shop/ShopScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

// Routes / Services
import { getUserInfo, updateUserInfo } from "../../routes/userRoute";
import { simulateBossFight } from "../../services/bossFightService";

// For MVP, static boss ID
const STATIC_BOSS_ID = "63abacbd-ec5a-4e17-8c0d-a0fe9e0f51f5";

export default function ShopScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [totalSteps, setTotalSteps] = useState(0);
  const [addedSteps, setAddedSteps] = useState("");
  const [fightResult, setFightResult] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  // Load user info from route/service
  async function loadUser() {
    setLoading(true);
    try {
      // TODO: Replace with authenticated user ID from your auth system
      const CURRENT_USER_ID = "4122fa2d-bc73-4de5-b14a-81c6d6e4e4d6";
      setUserId(CURRENT_USER_ID);

      const user = await getUserInfo(CURRENT_USER_ID);
      setUserInfo(user);
      setTotalSteps(user.total_steps || 0);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to load user info");
    } finally {
      setLoading(false);
    }
  }

  // Add steps to user
  async function handleAddSteps() {
    if (!userId || !addedSteps) return;
    const steps = parseInt(addedSteps, 10);
    if (isNaN(steps)) return;

    setLoading(true);
    try {
      const updatedTotal = (userInfo?.total_steps || 0) + steps;

      // Persist the new steps using updateUserInfo
      await updateUserInfo(userId, { total_steps: updatedTotal });

      const updatedUser = await getUserInfo(userId);
      setUserInfo(updatedUser);
      setTotalSteps(updatedUser.total_steps || 0);
      setAddedSteps("");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to add steps");
    } finally {
      setLoading(false);
    }
  }

  // Simulate boss fight
  async function handleSimulateFight() {
    if (!userId) return;
    setLoading(true);
    try {
      const result = await simulateBossFight(userId, STATIC_BOSS_ID);
      setFightResult(result);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to simulate fight");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View className="flex-1 bg-gray-900 items-center justify-center">
        <ActivityIndicator size="large" color="#fbbf24" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="p-4">
        <Text className="text-white text-2xl font-bold mb-4">
          Boss Fight Test
        </Text>

        {/* Step Adding Section */}
        <View className="bg-gray-800 p-4 rounded-xl mb-6 border border-gray-700">
          <Text className="text-gray-400 mb-2">
            User Total Steps: {totalSteps}
          </Text>
          <TextInput
            placeholder="Add Steps"
            placeholderTextColor="#ccc"
            keyboardType="number-pad"
            value={addedSteps}
            onChangeText={setAddedSteps}
            className="bg-gray-700 text-white p-2 rounded mb-2"
          />
          <Pressable
            onPress={handleAddSteps}
            className="bg-blue-600 p-2 rounded"
          >
            <Text className="text-white font-bold text-center">Add Steps</Text>
          </Pressable>
        </View>

        {/* Simulate Fight Section */}
        <View className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <Pressable
            onPress={handleSimulateFight}
            className="bg-red-600 p-3 rounded mb-4"
          >
            <Text className="text-white font-bold text-center">
              Simulate Boss Fight
            </Text>
          </Pressable>

          {fightResult && (
            <View className="bg-gray-700 p-3 rounded">
              <Text className="text-white font-bold mb-2">Fight Result</Text>
              <Text className="text-gray-300 mb-1">
                Progress: {(fightResult.progress * 100).toFixed(1)}%
              </Text>
              <Text className="text-gray-300 mb-1">
                User ATK / DEF: {fightResult.user.atk} / {fightResult.user.def}
              </Text>
              <Text className="text-gray-300 mb-1">
                Boss ATK / DEF: {fightResult.boss.atk} / {fightResult.boss.def}
              </Text>
              <Text className="text-gray-300 mb-1">
                Damage → User: {fightResult.damage.bossToUser} | Boss:{" "}
                {fightResult.damage.userToBoss}
              </Text>
              <Text className="text-gray-300 mb-1">
                Boss Remaining HP: {fightResult.bossRemainingHpPercent}%
              </Text>
              <Text
                className={`font-bold ${
                  fightResult.userWon ? "text-green-500" : "text-red-500"
                }`}
              >
                {fightResult.userWon ? "USER WON!" : "USER LOST"}
              </Text>
              <Text className="text-gray-300">
                Boss Defeated Recorded:{" "}
                {fightResult.bossDefeatedRecorded ? "YES" : "NO"}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}