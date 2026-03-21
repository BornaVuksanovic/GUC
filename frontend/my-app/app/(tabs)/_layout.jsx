import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'skyblue',
                    borderTopWidth: 10,
                    borderTopColor: 'skyblue',
                    paddingTop: 5,
                    paddingBottom: insets.bottom, 
                    height: 60 + insets.bottom,
                }
            }}

        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Početna",
                    tabBarIcon: ({color, size}) => (<Ionicons name="home" size={size} color={color} />)
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profil",
                    tabBarIcon: ({color, size}) => (<Ionicons name="person" size={size} color={color} />)
                }}      
            />
        </Tabs>
    )
}