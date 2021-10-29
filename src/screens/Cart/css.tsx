import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    navigation: {
        flex: 1,
        marginTop: 43
    },
    body: {
        flex: 9.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 1.5,
        padding: 10
    },
    accountView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    paymentView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        margin: 5,
        backgroundColor: '#E3BE74'
    },
    paymentOptions: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20
    },
    options: {
        display: 'flex',
        height: 120,
        width: 160,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
        borderColor: '#A0A0A0',
        backgroundColor: '#F2F2F2',
        borderWidth: 0.2,
        borderRadius: 10,
        margin: 10
    },
    icon: {
        width: 115,
        height: 80
    },
    row: {
        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 15
    },
    paymentInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
        flex: 1,
        paddingHorizontal: 10
    }
})