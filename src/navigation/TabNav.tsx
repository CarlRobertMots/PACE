import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import HomeScreen from "../screens/Home/HomeScreen";
import ShopScreen from "../screens/Shop/ShopScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import Colors from "../constants/colors";

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false, // hide text label if you only want icons
                tabBarStyle: {
                    backgroundColor: Colors.tabnavBG,
                    height: 75,
                    paddingHorizontal: 50, // adjust gap between edges
                    paddingTop: 20,         // optional, for vertical spacing
                    borderTopWidth: 0,      // remove default border
                },
            }}
        >
            <Tab.Screen
                name="Camp"
                component={HomeScreen}
                /*options={{
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        const iconSource = focused
                            ? require("../../assets/campIcon.png")
                            : require("../../assets/campIcon.png");
                        return <Image source={iconSource} style={{ width: 24, height: 24 }} />;
                    },
                }}*/
            />
            <Tab.Screen
                name="Shop"
                component={ShopScreen}
                /*options={{
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        const iconSource = focused
                            ? require("../../assets/campIcon.png")
                            : require("../../assets/campIcon.png");
                        return <Image source={iconSource} style={{ width: 24, height: 24 }} />;
                    },
                }}*/
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                /*options={{
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        const iconSource = focused
                            ? require("../../assets/campIcon.png")
                            : require("../../assets/campIcon.png");
                        return <Image source={iconSource} style={{ width: 24, height: 24 }} />;
                    },
                }}*/
            />
        </Tab.Navigator>
    );
}