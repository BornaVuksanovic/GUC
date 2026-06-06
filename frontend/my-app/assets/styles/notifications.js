import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'dodgerblue',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'dodgerblue',
        textAlign: 'center',
        marginBottom: 30,
        backgroundColor: 'lightcyan',
        padding: 10,
        borderRadius: 10,
    },
    optionsWrapper: {
        marginBottom: 30,
    },
    optionButton: {
        backgroundColor: 'lightcyan',
        paddingVertical: 18,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'dodgerblue',
        alignItems: 'center',
    },
    buttonSelected: {
        backgroundColor: 'skyblue',
        borderColor: 'white',
    },
    optionText: {
        fontSize: 17,
        fontWeight: '600',
        color: 'dodgerblue',
    },
    textSelected: {
        color: 'white',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: 'darkorange', // Zadržali smo tvoju boju gumba
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;