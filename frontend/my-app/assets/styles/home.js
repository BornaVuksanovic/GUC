import { StyleSheet , Dimensions} from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
    status: {
        backgroundColor: "skyblue",
        width: width * 0.85,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginBottom: 10
    },
    statusText1: {
        color: "yellow",
        fontSize: 22,
        fontWeight:"500"    
    },
    statusText2: {
        fontSize: 22,
        fontWeight:"500"
    },
    bigGlass: {
        width: 200,
        height: 200,
        margin: 50
    },
    actionContainer: {
        backgroundColor: "skyblue",
        width: width * 0.85,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-evenly"
    },

    text1:{
        fontSize: 20,
        fontWeight:"500"
    },
    text2:{
        fontSize: 20,
        fontWeight:"500"
    },
    text3:{
        fontSize: 20,
        backgroundColor: 'yellow',
        borderRadius: 10,
        fontWeight:"500",
        padding: 10
    
    },
    text4:{
        fontSize: 20,
        backgroundColor: 'lightcoral',
        borderRadius: 10,

        padding: 10,
        fontWeight: "500"
    },
    buttonText:{
        fontSize: 17
    },
    button:{
        backgroundColor: 'lightblue',
        borderRadius: 10,
        height: 50,
        width:100,
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.1,
    },

})


export default styles;