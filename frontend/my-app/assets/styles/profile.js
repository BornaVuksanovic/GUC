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
    buttonText:{
        fontSize: 17
    },
    registerView:{
        justifyContent: "center",
        alignItems: "center", 
        marginTop: 20
    },
    logoutButton:{
        backgroundColor: 'lightcoral',
        borderRadius: 10,
        height: 50,
        width:100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        shadowOpacity: 0.1,
    },
    historyButton:{
        backgroundColor: 'darkorange',
        borderRadius: 10,
        height: 50,
        width:100,
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.1,
    },
    tab:{
        backgroundColor: 'skyblue'
    },
    text: {
        fontSize: 20
    },
    red: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    stupac: {
        alignItems: 'center',
        padding: 5
    },
    weekContainer: {
        borderRadius: 10,
        width: 300,
        height: 100,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',   
    },
    redUser: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 50
    },
    infoContainer:{
        backgroundColor: 'skyblue',
        borderRadius: 10,
        height: 100,
        width:350,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        shadowOpacity: 0.1,        
    },
    textGoal: {
        fontSize: 17,
        backgroundColor: 'yellow',
        borderRadius: 7,
    }
})


export default styles;