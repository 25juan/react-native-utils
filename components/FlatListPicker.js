import React, { Component } from "react";
import { View, Text, Modal, ActivityIndicator, FlatList, } from "react-native";
import Styles from "./style" ;
import { SearchBar,ListItem,Icon,Divider } from "react-native-elements"
import navigation from "../../../src/navigation/NService";

export let RNFlatPicker = null ;

export class FlatListPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      search:"",
      data:[],
      selected:[]
    };
  }
  
  componentDidMount() {
    RNFlatPicker =  this ;
  }

  dataSource = [];
  /**
   * @param config modal 框配置参数
   * @param time 自动关闭时间 为0 则不自动关闭
   * dataSource 数据格式 [{ label:"22",id:22 },{ label:"11",id:11 }]
   */
  show = (dataSource=[],selected=[]) => {
    this.dataSource = dataSource ;
    this.setState({ visible: true,selected });
    return new Promise((resolve, reject)=>{
      this.resolve = resolve ;
    });
  };
  /**
   * 隐藏loading框
   * @param config
   */
  hide = (config = {}) => {
    this.setState({ visible: false });
    this.resolve(this.state.selected);
  };

  searchData = (search )=>{
    this.setState({ search });
  };

  get data(){
    let search = this.state.search ;
    if(!search){
      return [ ...this.dataSource ] ;
    }
    console.log(this.dataSource.filter(item=>{
      return item.label.indexOf(search) !== -1
    }))
    return this.dataSource.filter(item=>{
      return item.label.indexOf(search) !== -1
    });
  }

  isSelected =(item)=>{
    let id = item.id ;
    let selected = this.state.selected ;
    return selected.indexOf(id) !== -1
  };

  onItemPress = (index)=>{
    let item = this.data[index] ;
    let selected = this.state.selected ;
    let id = item.id ;
    let isSelected = this.isSelected(item) ;
    if(isSelected){
      let idx = selected.indexOf(id) ;
      selected.splice(idx,1) ;
    }else{
      selected.push(id);
    }
    this.setState(this.state) ;
  };

  renderItem = ({ item,index })=>{
    let iconProps = {
      name: "star-o",
      type: "font-awesome",
      size: 20,
      color: "#aaa"
    };
    let selected = this.isSelected(item) ;
    if(selected){
      iconProps.name = "star" ;
      iconProps.color = "#f50" ;
    }

    return <ListItem
        rightIcon={iconProps}
        onPress={() => this.onItemPress(index)}
        title={item.label}
        bottomDivider={true}/>
  };

  render() {
    let { modalProps={},flatListProps={},searchBarProps={} } = this.props;
    let iconProps = {
      name: "md-arrow-back",
      type: "ionicon",
      onPress: this.hide,
      color: "#333",
      iconStyle: { paddingHorizontal: 16, paddingVertical: 8 },
      underlayColor: "transparent"
    } ;

    console.log(this.data);

    return (
      <Modal
          animationType="slide"
        transparent={false}
        onRequestClose={this.hide}
        visible={this.state.visible}
        {...modalProps}>
        <View style={Styles.flex}>
          <View style={[Styles.row,{ alignItems:'center' }]}>
            <Icon { ...iconProps }/>
            <View style={Styles.flex}>
              <SearchBar placeholder="数据检索"
                         containerStyle={{ backgroundColor:'transparent',borderBottomWidth:0 }}
                         inputContainerStyle={{ backgroundColor:'rgb(240,240,240)' }}
                         { ...searchBarProps }
                         onChangeText={this.searchData}
                         lightTheme={true}
                         value={this.state.search}/>
            </View>
          </View>
          <Divider  style={{ backgroundColor: 'rgb(240,240,240)' }} />
          <FlatList
              renderItem={this.renderItem}
              keyExtractor={item=>`${item.id}`}
              { ...flatListProps }
              data={[ ...this.data ]}/>
        </View>
      </Modal>
    );
  }
}
export default FlatListPicker ;