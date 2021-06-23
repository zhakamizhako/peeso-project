
import { StyleSheet, Dimensions } from 'react-native';

export const MAIN_COLOR = '#061e69';

export const HomeStyles = StyleSheet.create({
    homeCards: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
        borderWidth: 2,
        // borderColor: '#FFF',
        borderColor: '#999',
        borderRadius: 15,
        // backgroundColor: '#EEE',
    },
    entryCards: {
        marginTop: 5,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    ScrollViewLimit: {
        marginBottom: 50,
        // marginBottom: 40
    }
});