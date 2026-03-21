import { useStore } from "../../asyncStorage/store.js";
import axios from "axios";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import styles from "../../assets/styles/profile.js";


export default function profile() {
    const [totalWater, setTotalWater] = useState();
    const [glass, setGlass] = useState(null);
    const { token, logout, user } = useStore();


    const profile = async () => {
        try {
            const response = await axios.get("http://172.20.10.11:5000/api/app/info", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTotalWater(response.data.totalWater || 0);
            setGlass(response.data.glass);
        } catch (error) {
            console.log(error.message);
        }
        
    }

    useEffect(() => {
        profile()
    },[]);

    const dayLetter = ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"];
    const generateWeek = () => {
        const week = [];

        for(let i=6; i>=0; i--){
            const d = new Date();
            d.setDate(d.getDate() - i);
            
            const index = glass?.day - 1 - i;
            const amount = (index >= 0 ) ? glass?.count[index] : 0;

            week.push({
                letter: dayLetter[d.getDay()],
                value: amount,
            });
        }
        return week;
    }

    const data = generateWeek();

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.text1}>User: {user?.username}</Text>
            </View>
            <View style={styles.weekContainer}>
                <Text style={styles.text1}>Aktivnosti ovaj tjedan</Text>
                <View  style={styles.red}>
                    {data.map((day, index) => (
                        <View key={index} style={styles.stupac}>
                            <Text style={styles.text2}>{day.letter}</Text>
                            <Text style={styles.text2}>{day.value ? day.value : 0}</Text>
                        </View>
                    ))}
                </View>
            </View>
           
            <Text style={styles.text1}>Ukupno čaša popijeno: {totalWater}</Text>
            <Text style={styles.text1}>Ukupna količina vode: {totalWater*glass?.amount} ml = {totalWater*glass?.amount/1000} l</Text>
            <Text style={styles.text1}>Aplikacija instalirana prije: {glass?.day} dana</Text>
            
            <View style={styles.historyButton}>
                <Link href="history" asChild>
                    <TouchableOpacity>
                        <Text style={styles.text}>Povijest</Text>
                    </TouchableOpacity>
                    
                </Link>
            </View>
            <View style={styles.logoutButton}>
                <TouchableOpacity onPress={logout}>
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}