import { FlatList, Text, View, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useStore } from "../asyncStorage/store.js";
import  axios  from "axios";
import { useState, useEffect } from "react";
import styles from "../assets/styles/history.js";
import api  from "../constants/api.js";

export default function History () {
    const { token, user } = useStore();
    const [ glass, setGlass ] = useState();
    const [ loading, setLoading ] = useState(true);



    const history = async () => {
        try{
            const response = await api.get("/api/app/info", {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setGlass(response.data.glass);

        }catch(error){
            console.log("Error loading history", error);
            Alert.alert("Error", "Failed to load history");
        }finally{
            setLoading(false);
        }
    } 

    useEffect(() => {
        history();
    },[]);

    const renderItem = ({ item, index }) => {
        const date = new Date(user.lastActiveDate);
        date.setDate(date.getDate() - (glass.day - 1 - index));
        const day = date.getDate();
        const month = date.getMonth() + 1; // krece od 0
        const year = date.getFullYear();

        return(
            <View>
                <Text style={styles.text2}>{day}.{month}.{year}. Količina vode = {item ? item/1000 : 0}L</Text>
            </View>
            
        );
    }

    if( loading || !glass ){
        return(
            <ActivityIndicator />
        );
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.valueContainer}>
                <Text style={styles.text1}>Povijest pijenja</Text>
                <FlatList 
                    data={glass.waterByDay}
                    keyExtractor={( _, index) => index.toString()}
                    renderItem={renderItem}
                /> 
            </View>
 
        </View>

    );
};