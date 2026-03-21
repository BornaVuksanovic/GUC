import { useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { useStore } from "../../asyncStorage/store.js";
import styles from "../../assets/styles/register.js";



export default function register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useStore();


    const handleRegister = async () => {
        
        const result = await register(username,password);
     

        if( !result.success ) Alert.alert("Error register", response.error);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>GUC</Text>
            <Text style={styles.title2}>Kreiraj račun</Text>
            <View  style={styles.inputContainer}>
                <View>
                    <Text style={styles.text1}>Username</Text>
                    <TextInput 
                        style={styles.text2}
                        placeholder="Enter username"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                <View>
                    <Text style={styles.text1}>Password</Text>
                    <TextInput
                        style={styles.text2}
                        placeholder="Enter password"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View style={styles.button}>
                    <TouchableOpacity onPress={handleRegister}>
                        <Text style={styles.buttonText}>Registracija</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}