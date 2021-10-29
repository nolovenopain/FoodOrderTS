import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    navigation: {
        flex: 3,
        marginTop: 43,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    body: {
        flex: 9,
        display: 'flex'
    },
    footer: {
        flex: 1
    },
})