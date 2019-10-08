import React,{ Component } from "react" ;
import Alert,{ RNAlert } from "./Alert" ;
import Picker, {RNPicker} from "./Picker" ;
import Toast,{RNToast } from "./Toast";
import Loading,{ RNLoading } from "./Loading" ;
import { FlatListPicker } from "./FlatListPicker";
import RootSiblings from 'react-native-root-siblings';
import { AlertInput } from "./AlertInput";
export let RNDialog = {
    Alert:null,
    Picker:null,
    Toast:null,
    FlatListPicker:null,
} ;

export default class Dialog extends Component {
    componentDidMount() {
        RNDialog.Alert = require("./Alert").RNAlert ;
        RNDialog.Picker = require("./Picker").RNPicker ;
        RNDialog.Toast = require("./Toast").RNToast ;
        RNDialog.Loading = require("./Loading").RNLoading ;
        RNDialog.FlatListPicker = require("./FlatListPicker").RNFlatPicker ;
        RNDialog.AlertInput = require("./AlertInput").RNAlertInput ;
    }

    render(){
        let { alertInputProps={},alertProps={},pickerProps={},toastProps={},loadingProps={},flatListPicker={} } = this.props ;
        return (
            <>
                <Alert { ...alertProps } />
                <Picker { ...pickerProps } />
                <Toast { ...toastProps } />
                <Loading { ...loadingProps }/>
                <FlatListPicker { ...flatListPicker }/>
                <AlertInput { ...alertInputProps }/>
            </>
        )
    }
}
new RootSiblings(<Dialog/>);
