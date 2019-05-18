import { Dimensions,PixelRatio,Text as RNText } from "react-native" ;
const uiWidth=750;// 设计稿的宽度
const uiHeight=1334; // 设计稿的高度
const defaultPixel = 2;
const scaleWidth = uiWidth / defaultPixel;
const scaleHeight = uiHeight / defaultPixel;
const pixelRatio = PixelRatio.get();

export const styleUtils = {
    get screenWidth(){
        return Dimensions.get('window').width ;
    },
    get screenHeight(){
        return Dimensions.get('window').height ;
    },
    get fontScale(){
        return PixelRatio.getFontScale() ;
    },

    get scale(){
        return Math.min(this.screenWidth / scaleWidth, this.screenHeight / scaleHeight);
    } ,

    getAutoSize(size){
        return Math.round(size * this.scale + 0.5);
    },

    getTextSize(fontSize){
        return (Math.round((fontSize * this.scale + 0.5) * defaultPixel / this.fontScale))/defaultPixel;
    },
} ;

export default styleUtils ;