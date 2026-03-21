import { useState } from "react";
import axios from "axios";
import { Alert, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useStore } from "../../asyncStorage/store.js";
import styles from "../../assets/styles/login.js";




export default function login() {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const { login } = useStore();

    const handleLogin = async () => {
        
        const result = await login(username, password);

        if ( !result.success) Alert.alert("Error login", result.error);
    }



    return (
        <View style={ styles.container }>
            <Text style={styles.title}>GUC</Text>
            <Text style={styles.title2}>Prijava</Text>
            <View style={styles.inputContainer}>
                <View>
                    <Text style={styles.text1}>Korisničko ime</Text>
                    <TextInput
                        style={styles.text2}
                        placeholder="Unesi korisničko ime"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                <View>
                    <Text style={styles.text1}>Lozinka</Text>
                    <TextInput
                        style={styles.text2}
                        placeholder="Unesi lozinku"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            
            

                <View style={styles.button}>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.buttonText}>Prijava</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.registerView}>
                <Text>Nemaš korisnički račun?</Text>
                <View style={styles.button}> 
                    <Link href="/register" asChild>
                        <TouchableOpacity>
                            <Text style={styles.buttonText}>Registracija</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
            


        </View>

    );


}