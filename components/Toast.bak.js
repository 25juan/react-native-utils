import React,{ Component } from "react";
import { Modal,View,Text,TouchableOpacity } from "react-native" ;
import Styles from "./style" ;
import _ from "lodash" ;
import EToast from "react-native-easy-toast" ;
export let RNToast = null ;

export class Toast extends Component{
    render(){
        return ( <EToast { ...this.props } ref={toast=>RNToast=toast}/> )
    }
}
export default Toast ;
