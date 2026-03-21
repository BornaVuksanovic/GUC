import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
            />

            <Tabs.Screen
                name="profile"
            />
        </Tabs>
    )
}