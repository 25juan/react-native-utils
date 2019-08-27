import { StyleSheet } from "react-native" ;
import StyleUtils from "../react-native-autofit-size" ;
import { greyColor,labelColor,dividerColor } from "./color" ;

export default {
    flex:{
        flex:1,
    },
    row:{
        flexDirection:"row"
    },
    alertContainer:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:StyleUtils.getAutoSize(50),
        backgroundColor:"rgba(0,0,0,0.4)"
    },
    alertCard:{
        backgroundColor:"#fff",
        borderRadius:4,
    },
    alertCardHeader:{
        paddingVertical:StyleUtils.getAutoSize(16),
    },
    alertCardFooter:{
        flexDirection:"row",
        borderTopWidth:StyleSheet.hairlineWidth,
        borderTopColor:dividerColor
    },
    alertCardHorizontal:{
        paddingHorizontal:StyleUtils.getAutoSize(16),
    },
    alertCardTitle:{
        color:labelColor,
        fontSize:StyleUtils.getTextSize(18),
        marginBottom:StyleUtils.getAutoSize(18),
        textAlign:"center"
    },
    textAlignLeft:{
        textAlign:"left"
    },
    alertContent:{
        color:greyColor,
        fontSize:StyleUtils.getTextSize(16),
        textAlign:"center"
    },
    alertCardFooterButton:{
        flex:1,
        paddingVertical:StyleUtils.getAutoSize(14),
    },
    buttonText:{
        fontSize:StyleUtils.getTextSize(14),
        fontWeight:'700',
        color:labelColor,
        textAlign:"center"
    },
    rowItem:{
        flexDirection:"row",
        paddingVertical:StyleUtils.getAutoSize(8),
    },
    flatListContainer:{
        maxHeight:StyleUtils.getAutoSize(200),
    },
    divider:{
        borderTopWidth:StyleSheet.hairlineWidth,
        borderTopColor:dividerColor
    },
    icon:{
        height:StyleUtils.getAutoSize(20),
        width:StyleUtils.getAutoSize(20),
        resizeMode:"contain"
    },
    loadingContainerStyle: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 30
    },
    loadingContentStyle: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 15,
        flex: 1,
        borderRadius: 4,
        alignItems: "center"
    },
    loadingIndicatorStyle: {
        marginRight: 5
    },
    loadingTextStyle: {
        fontSize: 16,
        color:"#999"
    },
    textInputStyle: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: dividerColor,
        borderRadius: 4,
        height: 32,
        paddingVertical: 2,
        fontSize: 14,
        color: "#333"
    }
}