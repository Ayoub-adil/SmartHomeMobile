/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable space-infix-ops */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import { Switch } from 'react-native-gesture-handler';



export default class kitchen extends Component
{
  constructor(props){
    super(props);
    this.state={
        rooom:0,
        window:'broken',      
    } 
    this.getRoom();  
    this.getWindowState();

    this.getRoom=this.getRoom.bind(this)
    this.getWindowState=this.getWindowState.bind(this);

    this.changeWindowState=this.changeWindowState.bind(this) 
  }
  getRoom(){
    fetch('/home/room').then(res=>res.json()).then(data=>{
      this.setState({ rooom: data.room })
    })
    console.log(this.state.rooom)
  }

  getWindowState(){
    fetch('/home/window').then(res=>res.json()).then(data=>{
      this.setState({ window: data.kitchen[this.state.rooom] })
    })
  }
  
  changeWindowState() {
    fetch('/change/window');
    this.getWindowState();
}
  render() {
    return (
    <View style={styles.container}>
         <Image
         style={styles.img}
         source={require('../images/kitchenRoom.png')}
         ></Image>

         <View style={styles.device}>
           <Text style={{fontSize:25, margin: 10}}>Window : </Text>
           <Switch value={this.state.switchValue} onValueChange={(switchValue) => this.setState({switchValue})} />
           <Text style={{fontSize:25, margin: 10}}>{this.state.switchValue ? 'opened' : 'closed'}</Text>
         </View>

    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F9F9F9',
  },
  img:{
    width:270 ,
    height:220 ,
    marginLeft:68,
    marginTop:60,
  },
  device: {
    marginBottom:1,
    marginTop:80,
    alignItems: "center",
  },
});

