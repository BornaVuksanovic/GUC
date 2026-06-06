import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import axios from "axios";
import { router, useRouter } from "expo-router";
import api from "../constants/api.js";
import { scheduleWaterReminder, requestNotificationPermissions } from '../utils/notifications.js';
import * as Location from 'expo-location';

export const useStore = create((set) => ({
    user: null,
    token: null,
    isLoading: true, 

    notificationInterval: null,

    dailyWaterTarget: null, 
    weatherLocation: null,
    currentTemp: null,

    streak: 0, 
    unlockedBadges: [],
    availableBadges: [
        { id: "FIRST_GLASS", title: "Prvi korak!", icon: "💧", desc: "Popio si svoju prvu čašu vode." },
        { id: "FIRST_GOAL", title: "Odličan start", icon: "🎯", desc: "Ostvario si svoj prvi dnevni cilj." },
        { id: "STREAK_3_DAYS", title: "U nizu!", icon: "🔥", desc: "Ostvario si cilj 3 dana zaredom." },
    ],

    updateAchievements: (newStreak, newBadges) => {
        set({ streak: newStreak, unlockedBadges: newBadges });
    },

    register: async (username,password) => {
        try {
            const formData = {username,password};
            const response = await api.post("/api/auth/register", formData);

            const data = response.data;

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({ user: data.user, token: data.token });

            return { success: true };

        } catch (error) {
            return { success: false, error: error.message}
        }
    },


    login: async (username,password) => {
        try {
            const formData = {username,password};
            const response = await api.post("/api/auth/login", formData);

            const data = response.data;

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({ user: data.user, token:data.token });

            return { success: true };

        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    checkStore: async () => {
        set({ isLoading: true });
        try {
            const userJSON = await AsyncStorage.getItem("user");
            const user = userJSON ? JSON.parse(userJSON) : null; 
            const token = await AsyncStorage.getItem("token");

            const storedInterval = await AsyncStorage.getItem("notificationInterval");
            const notificationInterval = storedInterval ? parseInt(storedInterval, 10) : null;

            /*
            try {
                await axios.get("http://172.20.10.11:5000/api/auth/home", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            } catch (error) {
                if(error.response && error.response.status === 401){
                    await AsyncStorage.removeItem("user");
                    await AsyncStorage.removeItem("token");
                    router.replace("/(auth)");  
                    console.log("Token nevaži 401");
                }else{
                    console.log(error.message);
                }  

            }
            */
            set({ user: user, token: token, notificationInterval: notificationInterval})

        } catch (error) {
            console.log("Check Store failed", error);
        } finally {
            set({ isLoading: false });
        }
    },


    updateNotificationInterval: async (hours) => {
        try {
            // Zatraži dozvolu od korisnika (Ovo će iskočiti samo prvi put)
            const hasPermission = await requestNotificationPermissions();
            if (!hasPermission) return { success: false, error: "Nema dozvole" };

            await scheduleWaterReminder(hours);

            await AsyncStorage.setItem("notificationInterval", hours.toString());
            
            set({ notificationInterval: hours });


            return { success: true };
        } catch (error) {
            console.log("Failed to save notification interval", error);
            return { success: false, error: error.message };
        }
    },

    fetchWeatherAndSetTarget: async () => {
        try {
            // Tražimo dopuštenje za GPS lokaciju
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Permission to access location was denied");
                return { success: false, error: "Lokacija odbijena" };
            }

            //  Uzimamo trenutne GPS koordinate mobitela
            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            const token = await AsyncStorage.getItem("token");


            //  Šaljemo koordinate na naš Express backend
            const response = await api.post("/api/app/calculate-target", {
                lat: latitude,
                lon: longitude
            }, { 
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    } 
                });

            const data = response.data;

            //  Spremamo izračunate podatke u Zustand stanje
            set({ 
                dailyWaterTarget: data.waterTarget,
                weatherLocation: data.location,
                currentTemp: data.temperature
            });

            return { success: true, target: data.waterTarget };

        } catch (error) {
            console.log("Error fetching dynamic target:", error.message);
            return { success: false, error: error.message };
        }
    },

    fetchAchievements: async () => {
        try {
            const token = await AsyncStorage.getItem("token");

            const response = await api.get("/api/app/info", {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            });

            const data = response.data;

            set({ 
                streak: data.user.currentStreak || 0,
                unlockedBadges: data.user.unlockedBadges || []
            });

            return { success: true };
        } catch (error) {
            console.log("Error fetching achievements:", error.message);
            return { success: false, error: error.message };
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("notificationInterval");

        set({ user: null, token: null, notificationInterval: null });
    },

}));