/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable space-infix-ops */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Slider,
} from 'react-native';
import { Switch } from 'react-native-gesture-handler';


export default class bedroom extends Component
{
  constructor(props){
    super(props);
    this.api='http://192.168.1.12:5000'
    this.state = {
      rooom:0,
      lamp: "broken",
      window:'broken',      
      climatiseur:"broken",
      temperature:0,
      temp: 0,

    };
    // this.getRoom();  
    this.getLampState();
    this.getTemperature();
    this.getWindowState();

    // this.getRoom=this.getRoom.bind(this)
    this.getLampState=this.getLampState.bind(this)
    this.getTemperature=this.getTemperature.bind(this);
    this.getWindowState=this.getWindowState.bind(this);

    this.changeLampState=this.changeLampState.bind(this) 
    // this.handleTemperature=this.handleTemperature.bind(this) 
    // this.handleTemperatureinput=this.handleTemperatureinput.bind(this) 
    // this.changeTemperature=this.changeTemperature.bind(this) 
    // this.changeAirConditionerState=this.changeAirConditionerState.bind(this) 
    this.changeWindowState=this.changeWindowState.bind(this) 
  }

  getRoom(){
    fetch(this.api+'/home/room').then(res=>res.json()).then(data=>{
      this.setState({ rooom: data.room })
    })
    console.log(this.state.rooom)
  }

  getLampState(){
    fetch(this.api+'/home/lamp').then(res=>res.json()).then(data=>{
      this.setState({ lamp: data.bedroom[this.state.rooom] })
    })
  }

  getTemperature(){
    fetch(this.api+'/home/temperature').then(res=>res.json()).then(data=>{
      this.setState({
        temperature: data.temperature.bedroom[this.state.rooom],
        temp: data.temperature.bedroom[this.state.rooom],
        climatiseur: data.airConditioner.bedroom[this.state.rooom], 
      })
    })
  }

  getWindowState(){
    fetch(this.api+'/home/window').then(res=>res.json()).then(data=>{
      this.setState({ window: data.bedroom[this.state.rooom] })
    })
  }

  render()
  {
    return (
    <View style={styles.container}>
      {/* <ScrollView> */}
        <Image style={styles.img} source={require('../images/bedroomRoom.png')}/>

        <View style={styles.device}>
          <Text style={styles.text}>Temperature</Text>
          <Text style={styles.deg}>{this.state.temperature}°C</Text>
          <Slider 
            style={styles.slider} 
            value={this.state.temperature} 
            minimumValue={15}
            maximumValue={50} 
            step={1} 
            minimumTrackTintColor="#FF8D8D" 
            thumbTintColor="#FF8D8D" 
            // onValueChange={(slideValue) => this.setState({slideValue})} 
          />
        </View>

        <View style={styles.device}>
          <Text style={styles.text}>Light : {this.state.lamp}</Text>
          <Switch 
            value={this.state.lamp==="on"?true:false} 
            onValueChange={this.changeLampState} 
          />
        </View>

        <View style={styles.device}>
          <Text style={styles.text}>Window : {this.state.window}</Text>
          <Switch 
            value={this.state.window==='opened'?true:false} 
            onValueChange={this.changeWindowState} 
          />
        </View>


      {/* <Button title="change" onPress={this.change}></Button> */}
      {/* </ScrollView> */}
    </View>
    );
  }


  changeLampState() {
    fetch(this.api+'/change/lamp');
    this.getLampState();
    //console.log(this.state.temperature)
  }

  handleTemperature(value) {
    this.setState({ temp: +value }); 
    console.log('slider '+value)  
    // this.changeTemperature(); 
  }
  handleTemperatureinput(e) {
    this.setState({ temp: e.target.value }); 
    console.log('input '+e.target.value)  
    // this.changeTemperature(); 
  }

  // async changeTemperature() {
  //   let result=await fetch('/change/temperature',{
  //     'method':'POST',
  //     'mode': 'no-cors',
  //     'headers':{
  //       'accept':'application/json',
  //       'content-type':'application/json'
  //     },
  //     'body':JSON.stringify({
  //       tmp:this.state.temp
  //     })
  //   });
  //   this.getTemperature();
  //   //console.log(result);
  // }

  changeAirConditionerState() {
    fetch(this.api+'/change/airConditioner');
    this.getTemperature();
  }

  changeWindowState() {
    fetch(this.api+'/change/window');
    this.getWindowState();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F9F9F9',
  },
  img:{
    width:290 ,
    height:180 ,
    marginLeft:50,
    marginTop:30,
  },
  text:{fontSize:18, marginBottom:10},
  slider: {
    width:'100%',
    margin:10,
  },
  device: {
    marginBottom:1,
    marginTop:30,
    alignItems: 'center',
  },
  deg: {
    fontSize:20,
    fontWeight:'bold',
  },
});

