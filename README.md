# react-native-autofit

### react native 自适应不能全屏充满容器的解决方案

### 安装
`yarn add git+https://github.com/25juan/react-native-autofit.git`

### camera自动适应容器用法
```
import { FillToAspectRatio } from "react-native-autofit";

<FillToAspectRatio>
        <RNCamera { ...cameraProps }/>
</FillToAspectRatio
```

### 不同设备设置字体 宽度高度自适应
```
import { Text,View } from "react-native" ;
import { StyleUtils } from "react-native-autofit";

<View style={{ fontSize:StyleUtils.getAutoSize(50) }}>
        <Text style={{ fontSize:StyleUtils.getTextSize(14) }}/>
</View
```
