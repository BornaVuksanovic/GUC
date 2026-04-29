import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
    bigGlass: {
        width: 200,
        height: 200,
        margin: 20
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
        alignItems: 'center',

    },
    text1:{
        fontSize: 22
    },
    text2:{
        fontSize: 17
    },
    text3:{
        fontSize: 22,
        backgroundColor: 'yellow',
        borderRadius: 10,
        height:30,
        width:100
    },
    text4:{
        fontSize: 22,
        backgroundColor: 'red',
        borderRadius: 10,
        height:30,
        width:100
    },
    buttonText:{
        fontSize: 17
    },
    registerView:{
        justifyContent: "center",
        alignItems: "center", 
        marginTop: 20
    },
    button:{
        backgroundColor: 'skyblue',
        borderRadius: 10,
        height: 50,
        width:100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        shadowOpacity: 0.1,
    },
    tab:{
        backgroundColor: 'skyblue'
    },
    marg:{
        marginTop: 30
    }
})


export default styles;