import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
    title: {
        color: 'dodgerblue',
        fontWeight: 'bold',
        fontSize: 50,
        marginBottom: 30
    },
    title2: {
        color: 'dodgerblue',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 20
    },
    inputContainer:{
        borderRadius: 10,
        width: 280,
        paddingVertical: 20,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',

    },
    text1:{
        fontSize: 20,
        marginBottom: 5
    },
    text2:{
        fontSize: 17,
        width:"auto"
    },
    buttonText:{
        fontSize: 17
    },
    registerView:{
        justifyContent: "center",
        alignItems: "center", 
        marginTop: 30
    },
    button:{
        backgroundColor: 'white',
        borderRadius: 10,
        height: 50,
        width:120,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        shadowOpacity: 0.1,
    },
    eyeIcon: {
        padding: 8,
    },
    input : {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        paddingHorizontal: 10,
        width: 230, 
        height: 40,
        marginBottom: 15,
        alignItems: "center",
    }
})


export default styles;