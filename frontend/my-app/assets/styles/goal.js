import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
    },
    valueContainer:{
        marginTop: 100
    },
    infoText: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 15,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,

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
        marginBottom: 10
    },

    text1:{
        fontSize: 25,
        marginBottom: 10,
        fontWeight: "bold"
    },
    text2:{
        fontSize: 20,
        marginVertical: 10,
    },
    button: {
        color: "black",
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'darkorange',
        borderRadius: 10,
        height: 50,
        width:100,
        justifyContent: "center",
        alignItems: "center",
    },
    registerView:{
        justifyContent: "center",
        alignItems: "center", 
        marginTop: 20
    },


    tab:{
        backgroundColor: 'skyblue'
    },
    text: {
        fontSize: 20
    },
    

    input: {
        width: '30%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'dodgerblue',
        marginBottom: 20,
        textAlign: 'center',
    },
})


export default styles;