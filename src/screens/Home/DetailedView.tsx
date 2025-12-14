import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { fetchCurrentBoss, BossData } from "../../api/bosses/bossService";

export default function DetailedView() {
    const navigator = useNavigation();
    const [boss, setBoss] = useState<BossData | null>(null);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState<string[]>([
        'Battle started',
        'Player dealt 150 damage',
    ]);

    const healthPercentage = boss
        ? (boss.current_hp / boss.max_hp) * 100
        : 0;

    useEffect(() => {
        const loadBossData = async () => {
            setLoading(true);
            const bossData = await fetchCurrentBoss();
            setBoss(bossData);
            setLoading(false);
        };

        loadBossData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center">
                <ActivityIndicator size="large" color="#ef4444" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-900">
            <ScrollView>
                {/* Header */}
                <View className="p-4 border-b border-gray-700">
                    <Pressable
                        onPress={() => navigator.goBack()}
                        className="bg-gray-700 px-4 py-2 rounded-lg self-start"
                    >
                        <Text className="text-white text-base font-medium">← Back</Text>
                    </Pressable>
                </View>

                {/* Boss Section */}
                <View className="items-center p-6">
                    <View className="w-40 h-40 rounded-full border-4 border-red-500 bg-gray-800 justify-center items-center">
                        <Text className="text-6xl">👹</Text>
                    </View>
                    <Text className="text-white text-2xl font-bold mt-4">
                        {boss ? boss.name : 'Unknown Beast'}
                    </Text>
                </View>

                {/* Health Bar */}
                <View className="px-6 mb-6">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-white font-semibold">HP</Text>
                        <Text className="text-white font-semibold">
                            {boss?.current_hp || 0} / {boss?.max_hp || 0}
                        </Text>
                    </View>
                    <View className="w-full bg-gray-900 h-4 rounded-full overflow-hidden border border-gray-600">
                        <View
                            className="h-full bg-red-600"
                            style={{ width: `${healthPercentage}%` }}
                        />
                    </View>
                </View>

                {/* Activity Logs */}
                <View className="px-6 pb-6">
                    <Text className="text-white text-lg font-bold mb-3">Activity Logs</Text>
                    <View className="bg-gray-800 rounded-lg p-4">
                        {logs.map((log, index) => (
                            <View key={index} className="flex-row mb-2">
                                <Text className="text-gray-500 mr-2">•</Text>
                                <Text className="text-gray-300 flex-1">{log}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
