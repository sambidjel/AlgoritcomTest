import { Platform, TextStyle, ViewStyle,  } from "react-native";
export default {
    inputTextContainer:{
        flexDirection:'row',
        width:'100%',
    } as ViewStyle,
    inputText:{
        width: '100%',
        marginTop: 8,
        marginBottom: 0,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        borderColor:'gray', 
        borderWidth:0.5,
        fontFamily: Platform.OS==='android'?'Roboto':'Avenir',
    } as TextStyle,
    errorMessageText:{
        color:'red'
    } as TextStyle,
}