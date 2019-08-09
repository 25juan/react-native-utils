import React,{ Component } from "react" ;
import Alert,{ RNAlert } from "./Alert" ;
import Picker, {RNPicker} from "./Picker" ;
import Toast,{RNToast } from "./Toast";

export let RNDialog = {
    Alert:RNAlert,
    Picker:RNPicker,
    Toast:RNToast
} ;

export default class extends Component {
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