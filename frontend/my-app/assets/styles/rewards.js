import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
    },
    content: {
        padding: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    title: {
        color: 'dodgerblue',
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 30,
    },
    title2: {
        color: 'dodgerblue',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    streakCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'skyblue',
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,
        width: width * 0.9,
    },
    streakIcon: {
        fontSize: 40,
        marginRight: 20,
    },
    streakNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'dodgerblue',
    },
    streakLabel: {
        fontSize: 16,
        color: 'white',
    },
    badgesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: width * 0.9,
    },
    badgeCard: {
        width: '47%',
        backgroundColor: 'lightcyan',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'dodgerblue',
    },
    badgeLocked: {
        backgroundColor: '#e0e0e0',
        borderColor: '#bbb',
        opacity: 0.6,
    },
    badgeIcon: {
        fontSize: 30,
        marginBottom: 5,
    },
    badgeTitleText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'dodgerblue',
        textAlign: 'center',
    }
});

export default styles;