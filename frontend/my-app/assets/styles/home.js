import { StyleSheet , Dimensions} from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
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
        margin: 40
    },
    actionContainer: {
        backgroundColor: "skyblue",
        width: width * 0.85,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    streakText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff6600', 
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
    weatherBadge: {
        backgroundColor: 'skyblue', // Svijetlo plava pozadina
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightblue',
    },
    weatherText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#007AFF', // Prepoznatljiva iOS plava boja
        marginBottom: 2,
    },
    recommendationText: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
    },
})


export default styles;