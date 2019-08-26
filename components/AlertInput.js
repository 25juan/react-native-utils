import React,{ Component } from "react";
import { Modal,View,Text,TextInput,TouchableOpacity } from "react-native" ;
import Styles from "./style" ;
import _ from "lodash" ;
export let RNAlertInput = null ;

const defaultState = {
    visible:false,
    title:'输入框',
    content:"",
    inputProps:{},
    buttons:[{
        text:"取消",
        props:{}
    },{
        text:"确认",
        props:{}
    }]
};

export class AlertInput extends Component{

    state = {
        ...defaultState
    };

    componentDidMount(){
        RNAlertInput = this ;
    }

    showAlert = (state={})=>{
        this.setState({
            ...state,
            visible:true,
        }) ;
        return new Promise((resolve, reject) => {
            this.resolve = resolve ;
        });
    };

    hideAlert = ()=>{
        this.setState({ ...defaultState }) ;
    };

    renderButtons = ()=>{
        let { buttons } = this.state ;
        return buttons.map((item,idx)=>{
            const style = _.get(item,"props.style",{}) ;
            return (<TouchableOpacity key={idx} onPress={()=>this.buttonPress(idx)} style={Styles.alertCardFooterButton}>
                <Text style={[Styles.buttonText,style]}>{ item.text }</Text>
            </TouchableOpacity>)
        });
    };

    buttonPress = (idx)=>{
        this.resolve({
            btnIndex:idx,
            content:this.state.content
        });
        this.hideAlert();
    };

    onChangeText = (content)=>{
        this.setState({ content }) ;
    };

    render(){
        return (
            <Modal
                visible={this.state.visible}
                onRequestClose={this.hideAlert}
                transparent={true}
                animationType={"fade"}
            >
                <View style={Styles.alertContainer}>
                    <View style={Styles.alertCard}>
                        <View style={Styles.alertCardHeader}>
                            <View style={Styles.alertCardHorizontal}>
                                <Text style={Styles.alertCardTitle}>{this.state.title}</Text>
                            </View>
                            <View style={Styles.alertCardHorizontal}>
                                <TextInput
                                    value={this.state.content}
                                    onChangeText={this.onChangeText}
                                    { ...this.state.inputProps }
                                    style={[Styles.textInputStyle,this.state.inputProps.style || {} ]}
                                    underlineColorAndroid={"transparent"}
                                />
                            </View>
                        </View>
                        <View style={Styles.alertCardFooter}>
                            { this.renderButtons() }
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}
export default AlertInput ;

