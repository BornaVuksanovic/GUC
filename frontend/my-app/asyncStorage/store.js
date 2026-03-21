import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import axios from "axios";
import { router, useRouter } from "expo-router";
import api from "../constants/api.js";


export const useStore = create((set) => ({
    user: null,
    token: null,
    isLoading: true, 

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
            set({ user: user, token: token})

        } catch (error) {
            console.log("Check Store failed", error);
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");

        set({ user: null, token: null });
    },

}));