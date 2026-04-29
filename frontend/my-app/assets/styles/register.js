import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

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
        marginBlockEnd: 30
    },
    title2: {
        color: 'dodgerblue',
        fontWeight: 'bold',
        fontSize: 30,
        marginBlockEnd: 20
    },
    inputContainer:{
        borderRadius: 10,
        width: width * 0.75,
        paddingVertical: 20,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50

    },
    input : {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        paddingHorizontal: 10,
        width: width * 0.62, 
        height: 40,
        marginBottom: 15,
        alignItems: "center",
    },
    text1:{
        fontSize: 22,
        fontWeight: "500",
        marginBottom: 7,
    },
    text2:{
        fontSize: 17
    },
    buttonText:{
        fontSize: 15
    },
    placeholder:{
        fontSize: 17,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        width: width * 0.5
    },
    button:{
        backgroundColor: 'lightcyan',
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