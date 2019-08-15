import React, { Component } from "react";
import { View, Text, Modal, ActivityIndicator, FlatList, } from "react-native";
import Styles from "./style" ;
import { SearchBar,ListItem } from "react-native-elements"

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

  /**
   * @param config modal 框配置参数
   * @param time 自动关闭时间 为0 则不自动关闭
   */
  show = () => {
    this.setState({ visible: true });
  };
  /**
   * 隐藏loading框
   * @param config
   */
  hide = (config = {}) => {
    this.setState({ visible: false });
  };

  searchData = (search )=>{
    this.setState({ search });
  };

  get data(){
    return this.props.data ;
  }

  isSelected =(item)=>{
    let id = item.id ;
    let selected = this.state.selected ;
    return selected.indexOf(id) === -1
  };

  onItemPress = (index)=>{
    let item = this.state.data[index] ;
    let selected = this.state.selected ;
    let id = item.id ;
    let isSelected = this.isSelected(item) ;
    if(isSelected){
      let idx = selected.indexOf(id) ;
      selected.slice(idx,1) ;
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
    return (
      <Modal
          animationType="slide"
        transparent={false}
        onRequestClose={this.hide}
        visible={this.state.visible}
        {...modalProps}>
        <View style={Styles.flex}>
          <SearchBar placeholder="数据检索"
                     { ...searchBarProps }
                     onChangeText={this.searchData}
                     value={this.state.search}/>
          <FlatList
              renderItem={this.renderItem}
              { ...flatListProps }
              data={[ ...this.data ]}/>
        </View>
      </Modal>
    );
  }
}
export default FlatListPicker ;