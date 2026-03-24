import { useStore } from "../../asyncStorage/store.js";
import axios from "axios";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import styles from "../../assets/styles/profile.js";
import api from "../../constants/api.js";
import { useIsFocused } from "@react-navigation/native";

export default function profile() {
    const [totalGlasses, setTotalGlasses] = useState();
    const [totalWater, setTotalWater] = useState();
    const [glass, setGlass] = useState(null);
    const { token, logout, user } = useStore();
    const [ loading, setLoading ] = useState(true);
    const isFocused = useIsFocused();

    const profile = async () => {
        try {
            const response = await api.get("/api/app/info", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTotalWater(response.data.totalWater);
            setTotalGlasses(response.data.totalGlasses || 0);
            setGlass(response.data.glass);
        } catch (error) {
            console.log(error.message);
        }finally{
            setLoading(false);
        }
        
    }

    useEffect(() => {
        if(isFocused){
            profile();
        }
    },[isFocused]);

    const dayLetter = ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"];
    const generateWeek = () => {
        const week = [];

        for(let i=6; i>=0; i--){
            const d = new Date();
            d.setDate(d.getDate() - i);
            
            const index = glass.day - 1 - i;
            const amount = (index >= 0 ) ? (glass.waterByDay[index]/1000) : 0; // pretvoreno u litre

            week.push({
                letter: dayLetter[d.getDay()],
                value: amount,
            });
        }
        return week;
    }


    if( loading || !glass || !user ){
        return(
            <ActivityIndicator />
        );
    }

    const data = generateWeek();

    return(
        <View style={styles.container}>
            <View style={styles.redUser}>
                <View style={styles.stupac}>
                    <Text style={styles.text1}>Korisnik: {user.username}</Text>
                </View>   

                <View style={styles.historyButton}>
                    <Link href="history" asChild>
                        <TouchableOpacity>
                            <Text style={styles.text}>Povijest</Text>
                        </TouchableOpacity>
                        
                    </Link>
                </View>
            </View>

            <View style={styles.weekContainer}>
                <Text style={styles.text1}>Aktivnosti ovaj tjedan</Text>
                <View  style={styles.red}>
                    {data.map((day, index) => (
                        <View key={index} style={styles.stupac}>
                            <Text style={styles.text2}>{day.letter}</Text>
                            <Text style={styles.text2}>{day.value ? day.value : 0}L</Text>
                        </View>
                    ))}
                </View>
            </View>

           <View style={styles.infoContainer}>
                <Text style={styles.text1}>Ukupno čaša popijeno: {totalGlasses}</Text>
                <Text style={styles.text1}>Ukupna količina vode: {totalWater} ml = {totalWater/1000} l</Text>
           </View>

            

            <View style={styles.logoutButton}>
                <TouchableOpacity onPress={logout}>
                    <Text style={styles.text}>Odjava</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}