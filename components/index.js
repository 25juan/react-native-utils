import React,{ Component } from "react" ;
import Alert,{ RNAlert } from "./Alert" ;
import Picker, {RNPicker} from "./Picker" ;
import Toast,{RNToast } from "./Toast";

export let RNDialog = {
    Alert:null,
    Picker:null,
    Toast:null
} ;

export default class extends Component {
    componentDidMount() {
        RNDialog.Alert = require("./Alert").RNAlert ;
        RNDialog.Picker = require("./Picker").RNPicker ;
        RNDialog.Toast = require("./Toast").RNToast ;
    }

    render(){
        let { alertProps={},pickerProps={},toastProps={}  } = this.props ;
        return (
            <>
            <Alert { ...alertProps } />
        <Picker { ...pickerProps } />
        <Toast { ...toastProps } />
        </>
    )
    }
}