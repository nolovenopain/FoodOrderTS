import { StyleSheet } from "react-native";
import { Dimensions } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navigation: {
        flex: 2,
    },
    body: {
        flex: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 1
    },
    addressWrapper: {
        marginTop: 50,
        flex: 4,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row', 
        width: Dimensions.width - 80,
        marginLeft: 10
    },
    address: {
        marginLeft: 5,
        marginRight: 10
    },
    editButton: {
        marginLeft: 10,
        paddingHorizontal: 10, 
        paddingVertical: 3,
        backgroundColor: 'orange',
        borderRadius: 20
    },
    editTitle: {
        color: 'white'
    },
    searchBar: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})