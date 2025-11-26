import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from "expo-blur";

type Props = {
    onSubmit?: (email: string, password: string) => Promise<void> | void;
};

export default function Signin({ onSubmit }: Props) {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function validate() {
        if (!email) return 'Email is required';
        const emailRe = /\S+@\S+\.\S+/;
        if (!emailRe.test(email)) return 'Enter a valid email';
        if (!password) return 'Password is required';
        return null;
    }

    async function handlePress() {
        setError(null);
        setLoading(true);
        try {
            if (onSubmit) await Promise.resolve(onSubmit(email, password));
        } catch (e) {
            setError((e as Error).message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <ImageBackground source={require('../../../../assets/wallpaper.png')}
                         style={styles.wallpaper}
                         resizeMode="cover">
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'padding', android: undefined })}
            style={styles.container}
        >
            <View style={styles.container}>
            <BlurView intensity={8} style={styles.blurContainer}>
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>Enter your credentials to login</Text>
            </BlurView>
                {error ? <Text>{error}</Text> : null}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    editable={!loading}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#FFFFFF"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    editable={!loading}
                />
                <Text style={styles.forgotText}>Forgot password?</Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        loading && styles.buttonDisabled,
                        pressed && !loading ? { opacity: 0.85 } : null,
                    ]}
                    onPress={handlePress}
                    disabled={loading}
                    accessibilityRole="button"
                    accessibilityLabel="Sign in"
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Text>
                </Pressable>
                <Text
                    style={styles.footerText}>
                    Don't have an account?{' '}
                    <Text
                        style={styles.footerLink}
                        onPress={() => navigation.navigate('Signup')}
                        accessibilityRole="link"
                        accessibilityLabel="Go to Sign Up"
                    >
                        Sign Up
                    </Text>
                </Text>
            </View>
        </KeyboardAvoidingView>
        </ImageBackground>
    );
}