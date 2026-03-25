import { View, Text, ActivityIndicator, TextInput, Button, Alert } from "react-native";
import { useStore } from "../asyncStorage/store.js";
import { useState, useEffect } from 'react';
import api from "../constants/api.js";
import styles from "../assets/styles/goal.js";


export default function Goal() {
    const { user,token } = useStore();
    const [glass, setGlass] = useState();
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState("");


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
        }
        
    }


    if( loading || !glass || !user ){
        return(
            <ActivityIndicator />
        );
    }

    return(
        <View style={styles.container}>
            <Text>Postavi novi dnevni cilj</Text>
            <Text>Trenutni cilj: {glass.goal[glass.day - 1] / 1000} L</Text>
            <Text>Unesi količinu u litrama</Text>

            <TextInput                          
                placeholder="Unesi novi cilj"
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
            />

            <View style={styles.historyButton}>
                <Button 
                onPress={() => 
                    setNew(number)
                
                }
                title="Spremi"
                />
            </View>
        </View>
    );
};