import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, } from 'react-native';
import { Signup, Signin } from './src/screens/auth';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
    screens: {
        Signup: {
            screen: Signup, options: { title: 'Sign Up' }
        },
        Signin: { screen: Signin, options: { title: 'Sign in' } },
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return <Navigation />;
}
