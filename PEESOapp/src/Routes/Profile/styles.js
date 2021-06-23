import { StyleSheet, Dimensions } from 'react-native';

export const MAIN_COLOR = '#061e69';

export const profileStyles = StyleSheet.create({
    listItem: {
        fontSize: 20,
        fontWeight: 'bold',
        color: MAIN_COLOR
    },
    listBorder: {
        borderColor: '#061e69'
    },
    listIcon: {
        paddingRight: 20
    },
    listItemSubtitle: {
        fontStyle: "italic"
    },
    listOptions: {
        borderRadius: 15, borderWidth: 2, backgroundColor: 'white', borderColor: MAIN_COLOR
    },
    imageStyle: {
        maxHeight: 25, maxWidth: 25, marginHorizontal: 15
    }
});
