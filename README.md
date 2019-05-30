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
### 对话框(Alert)
```
import React from "react" ;
import { Text,View } from "react-native" ;
import { Alert,RNAlert } from "react-native-utils";

class App extends React.Component{

    showDailog = ()=>{
        RNAlert.showAlert().then(idex=>alert(`${idex}`))
    }
    
    render() {
        return (
          <View>
             <Text onPress={this.showDialog}>点我显示对话框</Text>
             <Alert/>
          </View>
        );
      }
}

```
