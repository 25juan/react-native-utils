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
    View,
    Animated,
} from 'react-native';
import Asset from "../asset" ;

const animateValue = new Animated.Value(1) ;

let defaultState = {
    text : '', // toast 显示的文本
    duration:200, // 动画持续效果
    showDuration:1500,// 定义显示多少秒之后关闭
    element:null, // toast的子元素
    containerStyle:{},
    wrapperStyle:{},
    textStyle:{  },
    bottom:false,
    visible:false,
};
export let  RNToast = null ;
export class Toast extends React.Component {
    state = { ...defaultState };

    componentDidMount(){
        RNToast = this ;
    }

    componentDidUpdate(){
        this.state.visible ? this.animateShow():null ; // 定义显示toast的时候执行动画
    }

    animateShow = ()=>{
        this.animate(true,()=>{
            setTimeout(()=>{
                this.hide();
            },this.state.showDuration) ;// 显示多少秒之后自动关闭
        });
    };
    show = (option)=>{
        if(this.state.visible){
            this.hide(()=>{
                this.show(option);
            });
            return ;
        }
        let config = { ...defaultState } ;
        if(typeof option === 'string'){
            config.text = option ;
        }else{
            config = { ...config, ...option }
        }

        this.setState({ ...config,visible:true });
    };

    hide = (callback)=>{
        this.animate(false,()=>{
            this.setState({ visible:false },callback) ;
        })
    };

    animate = (visible,callback=()=>{} )=>{
        let toValue = visible ?1:0 ;
        Animated.timing(animateValue,{ toValue,duration: this.state.duration,}).start(()=>{
            callback();
        });
    };

    /**
     * 成功的toast
     */
    success  =(text,config ={})=>{
        this.show({
            element:<><Image style={ [styles.imgIcon,styles.successIcon] } source={Asset.success}/><Text>{ text }</Text></>,
            containerStyle:[styles.successToastContainerStyle,styles.commonIconToastContainerStyle],
            ...config
        })
    };

    info  =(text,config={})=>{
        this.show({
            element:<><Image style={ [styles.imgIcon,styles.infoIcon] } source={Asset.info}/><Text>{ text }</Text></>,
            containerStyle:[styles.infoToastContainerStyle,styles.commonIconToastContainerStyle],
            ...config
        });
    };

    error = (text,config={})=>{
        this.show({
            element:<><Image style={ [styles.imgIcon,styles.errorIcon] } source={Asset.close}/><Text>{ text }</Text></>,
            containerStyle:[styles.errorToastContainerStyle,styles.commonIconToastContainerStyle],
            ...config
        });
    }


    get containerStyle(){
        let style = this.state.bottom ?{ paddingBottom:100,justifyContent:'flex-end', }:{ paddingTop:100,justifyContent:'flex-start', } ;
        return [ styles.toastContainerStyle,style,this.state.wrapperStyle  ];
    }

    get wrapperStyle(){
        return [styles.wrapperStyle,{ opacity:animateValue, transform: [{scaleY:animateValue},{scaleX:animateValue}] },this.state.containerStyle  ]
    }

    get textStyle(){
        return [ styles.toastTextStyle,this.state.textStyle ] ;
    }

    render(){
        if(!this.state.visible){
            return null;
        }
        return (
            <View style={this.containerStyle}>
                <Animated.View style={this.wrapperStyle}>
                    { this.state.element? this.state.element:<Text style={this.textStyle}>{ this.state.text }</Text> }
                </Animated.View>
            </View>
        ) ;
    }
}

const styles = StyleSheet.create({
    toastContainerStyle:{
        position:'absolute',
        left:0,
        top:0,
        zIndex:99,
        alignItems:'center',
        backgroundColor:'transparent',
        width:'100%',
        height:'100%',
        paddingHorizontal:15,
    },
    wrapperStyle:{
        paddingVertical:4,
        paddingHorizontal:10,
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.65)',
        borderColor:'transparent',
        flexDirection:'row',
        borderRadius:4,
        borderWidth:1,
        shadowColor:'rgba(0,0,0,0.1)',
        shadowOffset:{
            height:1,
            width:1
        },
        shadowOpacity:1,
        shadowRadius:4,
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
