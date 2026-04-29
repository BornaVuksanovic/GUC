import { Stack, useRouter, useSegments } from "expo-router";
import { useStore } from "../asyncStorage/store.js";
import { useEffect, useState } from "react";

export default function RootLayout() {
    const router = useRouter();
    const segments = useSegments();

    const { user, token, checkStore, isLoading } = useStore();
    
    useEffect(() => {
        checkStore();
    }, []);
    
    useEffect(() => {
        if(isLoading){
            return;
        }
        const isAuthScreen = segments[0] === "(auth)";
        const isSignedIn = user && token;

        if (!isSignedIn && !isAuthScreen)  router.replace("/(auth)");
        else if (isSignedIn && isAuthScreen) router.replace("/(tabs)");

    },[user, token, segments, isLoading]);
    

    
    return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="history" />
        <Stack.Screen name="goal" />
    </Stack>
    )
}