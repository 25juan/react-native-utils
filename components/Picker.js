import React,{ Component } from "react";
import { Modal,View,Text,TouchableOpacity,FlatList,Image } from "react-native" ;
import Styles from "./style" ;
import _ from "lodash"
export let RNPicker = null ;

const defaultState = {
    visible:false,
    title:'请选择',
    data:[]
};

export class Picker extends Component{

    state = {
        ...defaultState
    };

    resolve = null;

    componentDidMount(){
        RNPicker = this ;
    }

    showPicker = (state={})=>{
        this.setState({ ...state, visible:true, }) ;
        return new Promise((resolve, reject)=>{
            this.resolve = resolve ;
        });
    };

    hidePicker = ()=>{
        this.setState({ ...defaultState }) ;
    };

    renderItem = ({ item,index })=>{
        const style = _.get(item,"imgProps.style",{}) ;
        return (
            <TouchableOpacity onPress={()=>this.itemPress(item,index)}>
                <View style={[Styles.rowItem,Styles.alertCardHorizontal]}>
                    {
                        item.source?(
                            <Image resizeMode={"contain"} source={item.source} { ...(item.imgProps ||{} ) } style={[style,Styles.icon]}/>
                        ):null
                    }
                    <Text style={[Styles.flex,Styles.alertContent,Styles.textAlignLeft]}>{ item.title }</Text>
                </View>
            </TouchableOpacity>
        )
    };

    itemPress = (item,index)=>{
        this.hidePicker();
        this.resolve({ ...item,_index:index }) ;
    };

    render(){
        return (
            <Modal
                onRequestClose={this.hideAlert}
                transparent={true}
                animationType={"fade"}
                visible={this.state.visible}>
                <TouchableOpacity onPress={this.hidePicker} style={Styles.alertContainer}>
                    <View onPress={this.hidePicker} style={Styles.alertCard}>
                        <View style={Styles.alertCardHeader}>
                            <View style={Styles.alertCardHorizontal}>
                                <Text style={[Styles.alertCardTitle,Styles.textAlignLeft]}>{ this.state.title }</Text>
                            </View>
                            <View style={Styles.flatListContainer}>
                                <FlatList renderItem={this.renderItem}
                                          ItemSeparatorComponent={()=><View style={Styles.divider}/>}
                                          keyExtractor={(item,idx)=>`${idx}`}
                                          data={this.state.data}/>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}
export default Picker ;