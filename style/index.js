import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Title:{
        fontSize : 40,
        fontWeight : 800,
        margin: 10,
        color: '#E84545',
        alignSelf: 'center',
        letterSpacing:9
    },
    Home : {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
    },
    cardlogin: {
        padding: 20,
        paddingLeft: 20,
        paddingRight: 20,
        // width: 350,
        // height: 360,
        // width: '100%',
        // height: '60%',
        backgroundColor: '#903749',
        borderRadius: 25,
        gap: 10
    },
    subTitle:{
        fontSize: 22,
        fontWeight: 400,
        marginBottom: 20,
        alignItems: 'center',
        color: '#FFF',
        alignSelf: 'center'
    },
    textuser: {
        // paddingLeft: 20,
        fontSize: 18,
        color: '#fff',
        // marginTop:20
        // backgroundColor: 'red'
    },
    areatext: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        borderWidth: 0.8
    },
    
    ItemList : {
        margin: 10,
        backgroundColor : '#fff',
        padding: 10,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flexDirection : 'row',
        borderRadius: 10,
    },
    ItemList_Left : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    ItemList_Right : {
        alignContent: 'center',
        justifyContent: 'center'
    },
    ButtShare : {
        justifyContent: 'center',
        alignItems: 'center'
    },
    FooterMain : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    FooterItems: {
        alignContent: 'center',
        alignItems: 'center',
        bottom: 30,
        backgroundColor: '#2B2E4A',
        padding: 10,
        borderRadius: 20
    }

});