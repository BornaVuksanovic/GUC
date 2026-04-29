import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
    valueContainer:{
        marginTop: 30
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
    title:{
        marginTop: 70,
        fontSize: 22,
        fontWeight:"600"
    },
    text2:{
        fontSize: 20,
        backgroundColor: 'lightcoral',
        borderRadius: 7,
        padding: 5
    },
    buttonText:{
        fontSize: 17
    },
    registerView:{
        justifyContent: "center",
        alignItems: "center", 
        marginTop: 20
    },
    flatlist: {

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
    textGoal: {
        fontSize: 20,
        backgroundColor: 'yellow',
        borderRadius: 7,
        padding: 5
    }
})


export default styles;