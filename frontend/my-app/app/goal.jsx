import { View, Text, ActivityIndicator, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { useStore } from "../asyncStorage/store.js";
import { useState, useEffect } from 'react';
import api from "../constants/api.js";
import styles from "../assets/styles/goal.js";


export default function Goal() {
    const { user,token } = useStore();
    const [glass, setGlass] = useState();
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState();


    const Goal = async () => {
        setLoading(true);
        try{
            const response = await api.get("/api/app/info" , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setGlass(response.data.glass);

        }catch(error){
            console.log("Goal error", error.message);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        Goal();
    },[]);

    const setNew = async (item) => {

        try{
            const response = await api.patch("/api/app/setGoal", 
                {item},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("test",response.message);
            Alert.alert(
            'Novi cilj postavljen!',
            'Vaš cilj je uspješno spremljen', 
            [
                {
                    text: 'OK', 
                },
            ] 
            );

        }catch{
            console.log("setting new goal error", error.message);
        }finally{
            Goal();
        }
        
    }


    if( loading || !glass || !user ){
        return(
            <ActivityIndicator />
        );
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text1}>Postavi novi dnevni cilj</Text>
            <Text style={styles.infoText}>Trenutni cilj: {glass.goal[glass.day - 1] / 1000} L</Text>
            <Text style={styles.text2}>Unesi količinu u mililitrima</Text>

            <TextInput                          
                placeholder="Unesi cilj"
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
                style={styles.input}
            />

            <View style={styles.button}>
                <TouchableOpacity onPress={() => setNew(number)}>
                     <Text style={styles.text2}>Spremi</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
};