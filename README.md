# react-native-utils

### react native 日常工具组件封装

### 安装
`yarn add git+https://github.com/25juan/react-native-utils.git`

### camera自动适应容器用法
```
import { FillToAspectRatio } from "react-native-utils";

<FillToAspectRatio>
        <RNCamera { ...cameraProps }/>
</FillToAspectRatio
```

### 不同设备设置字体 宽度高度自适应
```
import { Text,View } from "react-native" ;
import { StyleUtils } from "react-native-utils";

<View style={{ fontSize:StyleUtils.getAutoSize(50) }}>
        <Text style={{ fontSize:StyleUtils.getTextSize(14) }}/>
</View
```
### 工具组件API方式调用
```
import React, { Component, lazy, Suspense } from "react";
import { Text,View } from "react-native" ;
import { Dialog,RNDialog } from "react-native-utils";

let Navigation = lazy(() => import("./navigation"));

// 这儿通过 Suspense动态加载组件，等待Dialog渲染完成之后，
// Navigation组件里面才能调用对话框组件API
class App extends React.Component{
    componentDidMount(){
        // 调用弹框
        RNDialog
        .Alert
        .showAlert({
            title:'消息',
            content:"",
            buttons:[{
                text:"取消",
                props:{}}]
        }).then(idex=>alert(`${idex}`)) ;
        // Picker 框调用    
        RNDialog
        .Picker
        .showPicker({
            title:'消息',
            data:[{
                title:"成都"
               },{
                title:"北京"
            }]
         }).then(obj=>console.log(obj));
         
        // Toast 调用
        RNDialog
        .Toast
        .show("Toast 调用成功");
        
        // Loading 调用
        RNDialog
        .Loading
        .show("数据加载中");
        
        // Loading 调用
        RNDialog
        .FlatListPicker
        .show([{ label:"22",id:22 },{ label:"11",id:11 }]
        ,[11]).then(result=>{
            console.log(result);   
        });
    }
    render() {
        return (
          <>
            <Suspense fallback={<Loading />}>
                <Navigation
                    ref={navigator => {
                        NavigationService.setTopLevelNavigator(navigator);
                    }}/>
            </Suspense>
            <Dialog />
          </>
        );
      }
}

```