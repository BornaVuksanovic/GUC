import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, Button, Image, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import axios from "axios";
import { useStore } from '../../asyncStorage/store.js';
import styles from '../../assets/styles/home.js';
import api from "../../constants/api.js";
import DropdownComponent from '../../components/dropdown.js';
import { useIsFocused } from "@react-navigation/native";

export default function Home() {
  
    const { token } = useStore();
    const [count, setCount] = useState(0);
    const [glass, setGlass] = useState(null);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    const home = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/app/home", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data && response.data.glass) {
                setGlass(response.data.glass);
                const index = response.data.glass.day - 1;
                setCount(response.data.glass.count[index] || 0);
            }

        } catch (error) {
            console.log("home", error.message);
        }finally{
            setLoading(false);
        }

    };

    useEffect(() => {
        if(isFocused){
            home() ; 
        }
      
    },[isFocused]);

    const addGlass = async (a) => {
    
        try {
            const response = await api.patch("/api/app/home/add", 
                { a },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            
            });
            const index = response.data.updateGlass.day - 1;
            setCount(response.data.updateGlass.count[index]);
            setGlass(response.data.updateGlass);
            console.log(a);
        } catch (error) {
            console.log("add glass", error.message);
        }finally{
            home();
        }
    }
    
    const handleRefresh = () => {
        home();
    };

    if( loading || !glass){
        return(
            <ActivityIndicator />
        )
    }

    const todayIdx = glass.day - 1;

    return (
        <View style={styles.container}>
            
            <View style={styles.status}> 
                {glass?.goalAchived[todayIdx] == 1 ? (<Text  style={styles.statusText1}>Dnevni cilj ostvaren</Text>) : (<Text  style={styles.statusText2}>Dnevni cilj nije ostvaren</Text>)}
            </View>
            <Image
                style={styles.bigGlass}
                source={require("../../assets/images/voda3.png")}
            />

            <View style={styles.status}>
                {glass?.goalAchived[todayIdx] == 1 ? (<Text style={styles.text3}>Cilj: {glass?.goal[todayIdx]}</Text>) : (<Text style={styles.text4}>Cilj: {glass?.goal[todayIdx]}</Text>)}

                <Text style={styles.text1}>Popijeno čaša: {count}</Text>

                <Text style={styles.text1}>Popijeno vode danas: {glass?.waterByDay[todayIdx]} ml</Text>
            </View>

            <View style={styles.actionContainer}>
                <View style={styles.button}>
                    <Button 
                    onPress={() => addGlass(glass?.amount)}
                    title="Popij čašu"
                    style={styles.text2}
                    />
                </View>

                <View>
                    <DropdownComponent onValueSelected={handleRefresh} />
                </View>
            </View>

            
        </View>
    )
}

