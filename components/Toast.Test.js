/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    Animated,
} from 'react-native';
import Asset from "../asset" ;

const animateValue = new Animated.Value(0) ;

let defaultState = {
    text : '数刷新据成功', // toast 显示的文本
    duration:300, // 定义多少秒之后关闭
    showDuration:2000,// 定义显示多少秒之后关闭
    element:null, // toast的子元素
    containerStyle:{},
    textStyle:{  },
    bottom:false,
}
let  toast = null ;
class Toast extends React.Component {
    visible  = false ;
    state = { ...defaultState };

    componentDidMount(){
        toast = this ;
    }

    show = (option)=>{
        if(this.visible){
            return ;
        }
        let config = { ...defaultState } ;
        if(typeof option === 'string'){
            config.text = option ;
        }else{
            config = { ...config, ...option }
        }

        this.setState({ ...config },()=>{
            this.animate(true,()=>{
                setTimeout(()=>{
                    this.hide();
                },this.state.showDuration) ;// 显示多少秒之后自动关闭
            });
        });
    };

    hide = ()=>{
        this.animate(false)
    };

    animate = (visible,callback=()=>{} )=>{
        let toValue = visible ?1:0 ;
        Animated.timing(animateValue,{ toValue,duration: this.state.duration,}).start(()=>{
            this.visible = visible ;
            callback();
        });
    };

    /**
     * 成功的toast
     */
    success  =(text)=>{
        this.show({
            element:<><Image style={ [styles.imgIcon,styles.successIcon] } source={Asset.success}/><Text>{ text }</Text></>,
            containerStyle:[styles.successToastContainerStyle,styles.commonIconToastContainerStyle]
        })
    };

    info  =(text)=>{
        this.show({
            element:<><Image style={ [styles.imgIcon,styles.infoIcon] } source={Asset.info}/><Text>{ text }</Text></>,
            containerStyle:[styles.infoToastContainerStyle,styles.commonIconToastContainerStyle]
        });
    };

    error = (text)=>{
        this.show({
            element:<><Image style={ [styles.imgIcon,styles.errorIcon] } source={Asset.close}/><Text>{ text }</Text></>,
            containerStyle:[styles.errorToastContainerStyle,styles.commonIconToastContainerStyle]
        });
    }


    get containerStyle(){
        let style = this.state.bottom ?{ bottom:50 }:{ top:50 } ;
        return [styles.toastContainerStyle,{ opacity:animateValue, transform: [{scaleY:animateValue},{scaleX:animateValue}] },style,this.state.containerStyle  ]
    }

    get textStyle(){
        return [ styles.toastTextStyle,this.state.textStyle ] ;
    }

    render(){
        return (
            <Animated.View style={this.containerStyle}>
                { this.state.element? this.state.element:<Text style={this.textStyle}>{ this.state.text }</Text> }
            </Animated.View>
        ) ;
    }

}

const styles = StyleSheet.create({
    toastContainerStyle:{
        position:'absolute',
        left:'10%',
        width:'80%',
        paddingVertical:14,
        paddingHorizontal:14,
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.65)',
        borderColor:'transparent',
        zIndex:99,
        borderRadius:4,
        flexDirection:'row',
        justifyContent:'center',
        borderWidth:1,
        shadowColor:'rgba(0,0,0,0.1)',
        shadowOffset:{
            height:1,
            width:1
        },
        shadowOpacity:1,
        shadowRadius:4,
        elevation:3
    },
    toastTextStyle:{
        color:'#fff',
        fontSize:15,
    },
    imgIcon:{
        height:15,
        width:15,
        resizeMode:'contain',
        marginRight:5,
    },
    commonIconToastContainerStyle:{
        justifyContent:'flex-start'
    },
    successIcon:{
        tintColor:'#52c41a',
    },
    successToastContainerStyle:{
        backgroundColor:'#f6ffed',
        borderColor:'#b7eb8f',
    },

    infoIcon:{
        tintColor:'#1890ff',
    },
    infoToastContainerStyle:{
        backgroundColor:'#e6f7ff',
        borderColor:'#91d5ff',
    },


    errorIcon:{
        tintColor:'#f5222d',
    },
    errorToastContainerStyle:{
        backgroundColor:'#fff1f0',
        borderColor:'#ffa39e',
    },



});

export default Toast ;
