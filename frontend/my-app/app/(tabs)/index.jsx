import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, Button, Image, StyleSheet, TouchableOpacity} from 'react-native';
import axios from "axios";
import { useStore } from '../../asyncStorage/store.js';
import styles from '../../assets/styles/home.js';
import api from "../../constants/api.js";


export default function Home() {
  
    const { token } = useStore();
    const [count, setCount] = useState();
    const [amount, setAmount] = useState();


    const home = async () => {
        try {
            const response = await api.get("/api/app/home", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const index = response.data.glass.day - 1;

            setCount(response.data.glass.count[index] || 0);
            setAmount(response.data.glass.amount || 0);

        

        } catch (error) {
            console.log(error.message);
        }

    };

    const addGlass = async () => {
        try {
            const response = await api.patch("/api/app/home/add", 
                {},
                {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            
            });
            const index = response.data.updateGlass.day - 1;
            setCount(response.data.updateGlass.count[index]);
        } catch (error) {
            console.log(error.message);
        }
    }



    useEffect(() => {
        home()
    },[]);

    return (
        <View style={styles.container}>
            <Image
                style={styles.bigGlass}
                source={require("../../assets/images/voda3.png")}
            />
            <Text style={styles.text1}>Popijeno čaša: {count}</Text>

            <View>
                <Text style={styles.text1}>Popijeno vode danas: {count*amount} ml</Text>
                
            </View>

            <View style={styles.button}>
                <Button 
                onPress={addGlass}
                title="Popij čašu"
                />
            </View>

            
        </View>
    )
}

