import { StyleSheet } from "react-native";
import { Dimensions } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)',
    },
    navigation: {
        flex: 1,
        marginTop: 43
    },
    body: {
        flex: 8.5,
        display: 'flex'
    },
    footer: {
        flex: 1.5
    },
    deliveryIcon: {
        width: 120,
        height: 120
    },
    addressContainer: {
        width: Dimensions.width - 100,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center'
    },
    addressTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#7D7D7D'
    },
    addressText: {
        fontSize: 20,
        fontWeight: '200',
        color: '#4F4F4F',
        textAlign: 'center'
    },
    addressTextContainer: {
        width: Dimensions.width - 100,
    },
    centerMsg: {
        left: '50%',
        top: '50%',
        position: 'absolute',
        marginLeft: -80,
        marginTop: -50
    }
})