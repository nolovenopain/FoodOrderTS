import { StyleSheet } from "react-native";
import { Dimensions } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    navigation: {
        flex: 1,
        marginTop: 43,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    body: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFF',
    },
    footer: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginLeft: 80
    },
    image: {
        width: Dimensions.width,
        height: 300,
        justifyContent: 'flex-end'
    },
    nameWrapper: {
        height: 120,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10
    },
    name: {
        color: '#FFF',
        fontSize: 40,
        fontWeight: '700'
    },
    address: {
        color: '#FFF',
        fontSize: 25,
        fontWeight: '500'
    }
})