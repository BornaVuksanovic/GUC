import { useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { useStore } from "../../asyncStorage/store.js";
import styles from "../../assets/styles/register.js";
import { Ionicons } from "@expo/vector-icons";



export default function register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const[isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { register } = useStore();


    const handleRegister = async () => {
        
        const result = await register(username,password);
     

        if( !result.success ) Alert.alert("Error register", response.error);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>GUC</Text>

            <View  style={styles.inputContainer}>
                <Text style={styles.title2}>Kreiraj račun</Text>
                <View>
                    <Text style={styles.text1}>Username</Text>
                    <View style={styles.input}>
                        <TextInput 
                            style={styles.placeholder}
                            placeholder="Unesi korisničko ime"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                </View>

                <View>
                    <Text style={styles.text1}>Password</Text>
                    <View style={styles.input}>
                        <TextInput
                            style={styles.placeholder}
                            placeholder="Unesi lozinku"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons 
                            name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                            size={20}
                            />
                        </TouchableOpacity>
                    </View>
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