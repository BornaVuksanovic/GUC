import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue'
    },
    title: {
        color: 'dodgerblue',
        fontWeight: 'bold',
        fontSize: 50,
        marginBlockEnd: 50
    },
        title2: {
        color: 'dodgerblue',
        fontWeight: 'bold',
        fontSize: 30,
        marginBlockEnd: 20
    },
    inputContainer:{
        borderRadius: 10,
        width: 250,
        height: 200,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text1:{
        fontSize: 22
    },
    text2:{
        fontSize: 17
    },
    buttonText:{
        fontSize: 15
    },
    input:{

    },
    button:{
        backgroundColor: 'white',
        borderRadius: 10,
        height: 50,
        width:100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        shadowOpacity: 0.1,
       
    }
})


export default styles;