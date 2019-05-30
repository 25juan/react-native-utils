import React,{ Component } from "react";
import { Modal,View,Text,TouchableOpacity } from "react-native" ;
import Styles from "./style" ;
import _ from "lodash"
export let RNAlert = null ;

const defaultState = {
    visible:false,
    title:'消息',
    content:"",
    buttons:[{
        text:"取消",
        props:{}
    },{
        text:"确认",
        props:{}
    }]
};

export class Alert extends Component{

    state = {
        ...defaultState
    };

    componentDidMount(){
        RNAlert = this ;
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
        this.resolve(idx);
        this.hideAlert();
    };

    render(){
        return (
            <Modal
                onRequestClose={this.hideAlert}
                transparent={true}
                animationType={"fade"}
                visible={this.state.visible}>
                <View style={Styles.alertContainer}>
                    <View style={Styles.alertCard}>
                        <View style={Styles.alertCardHeader}>
                            <View style={Styles.alertCardHorizontal}>
                                <Text style={Styles.alertCardTitle}>{ this.state.title }</Text>
                            </View>
                            <View style={Styles.alertCardHorizontal}>
                                <Text style={Styles.alertContent}>{ this.state.content }</Text>
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
export default Alert ;