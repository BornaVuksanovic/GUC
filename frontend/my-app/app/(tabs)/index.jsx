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
    const [count, setCount] = useState();
    const [glass, setGlass] = useState();
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    const home = async () => {
      
        try {
            const response = await api.get("/api/app/home", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const index = response.data.glass.day - 1;

            setCount(response.data.glass.count[index] || 0);
            setGlass(response.data.glass);

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

    return (
        <View style={styles.container}>
            <Image
                style={styles.bigGlass}
                source={require("../../assets/images/voda3.png")}
            />

            <Text style={styles.text1}>Cilj: {glass.goal[glass.day - 1]}</Text>

            <Text style={styles.text1}>Popijeno čaša: {count}</Text>

            <View>
                <Text style={styles.text1}>Popijeno vode danas: {glass.waterByDay[glass.day - 1]} ml</Text>
                
            </View>

            <View style={styles.button}>
                <Button 
                onPress={() => addGlass(glass.amount)}
                title="Popij čašu"
                />
            </View>

            <View style={styles.marg}>
                <DropdownComponent onValueSelected={handleRefresh} />
            </View>
            
        </View>
    )
}

