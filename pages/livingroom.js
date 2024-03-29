/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable space-infix-ops */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, ScrollView, Image, StyleSheet, Text, Slider} from 'react-native';
import {Switch, TouchableOpacity} from 'react-native-gesture-handler';

export default class livingroom extends Component {
  constructor(props){
    super(props);
    this.api='http://192.168.1.12:5000'
    this.state = {
      server:false,
      islogged: false ,
      rooom:0,
      lamp: "broken",
      window:'broken',      
      climatiseur:"broken",
      temperature:0,
      temp: 0,

    };
    this.fill();  


    this.fill=this.fill.bind(this)


    this.changeLampState=this.changeLampState.bind(this) 
    this.handleTemperature=this.handleTemperature.bind(this) 
    // this.handleTemperatureinput=this.handleTemperatureinput.bind(this) 
    this.changeTemperature=this.changeTemperature.bind(this) 
    this.changeAirConditionerState=this.changeAirConditionerState.bind(this) 
    this.changeWindowState=this.changeWindowState.bind(this) 
  }

  fill(){
    fetch(this.api+'/server')
      .then(res=>res.json())
      .then(data=>{
        this.setState({server: data.server});
        data.server?null:this.props.navigation.navigate('Sorry!')
      })
    fetch(this.api+'/user/loginMobile')
      .then(res=>res.json())
      .then(data=>{
        this.setState({ islogged : data.islogged })
        data.islogged?null:this.props.navigation.navigate('SignIn')
      })
    fetch(this.api+'/home/room').then(res=>res.json()).then(data=>{
      this.setState({ rooom: data.room })
    })
    fetch(this.api+'/home/lamp').then(res=>res.json()).then(data=>{
      this.setState({ lamp: data.livingroom[this.state.rooom] })
    })
    fetch(this.api+'/home/temperature').then(res=>res.json()).then(data=>{
      this.setState({
        temperature: data.temperature.livingroom[this.state.rooom],
        temp: data.temperature.livingroom[this.state.rooom],
        climatiseur: data.airConditioner.livingroom[this.state.rooom], 
      })
    })
    fetch(this.api+'/home/window').then(res=>res.json()).then(data=>{
      this.setState({ window: data.livingroom[this.state.rooom] })
    })  
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Image
          style={styles.img}
          source={require('../images/LivingroomRoom.png')}></Image>
          
          <View style={styles.device}>
          <Text style={styles.text}>Air Conditionner : {this.state.climatiseur}</Text>
          
          <Switch 
            trackColor={{true: '#7AAFFD', false: 'grey'}}
            thumbColor="#007bff"
            value={this.state.climatiseur==="on"?true:false} 
            onValueChange={this.changeAirConditionerState} 
          />
          {this.state.climatiseur==='on'?
          <Slider 
            style={styles.slider} 
            value={this.state.temperature} 
            minimumValue={15}
            maximumValue={50} 
            step={1} 
            minimumTrackTintColor="#FF8D8D" 
            thumbTintColor="#FF8D8D" 
            onValueChange={this.handleTemperature} 
          />
          :null}

          {this.state.climatiseur==='on'?
          <TouchableOpacity style={styles.button} onPress={()=>this.changeTemperature()}>
            <Text>Adjust to : {this.state.temp}</Text>
          </TouchableOpacity>
          :null}

        </View>
        <View style={styles.device}>
          <Text style={styles.text}>Temperature</Text> 
          <Text style={styles.deg}>{this.state.temperature}°C</Text>
          
        </View>

        <View style={styles.device}>
          <Text style={styles.text}>Light : {this.state.lamp}</Text>
          <Switch 
            trackColor={{true: '#7AAFFD', false: 'grey'}}
            thumbColor='#007bff'
            value={this.state.lamp==="on"?true:false} 
            onValueChange={this.changeLampState} 
          />
        </View>

        <View style={styles.device}>
          <Text style={styles.text}>Window : {this.state.window}</Text>
          <Switch 
            trackColor={{true: '#7AAFFD', false: 'grey'}}
            thumbColor='#007bff'
            value={this.state.window==='opened'?true:false} 
            onValueChange={this.changeWindowState} 
          />
        </View>



        {/* <Button title="change" onPress={this.change}></Button> */}
        </ScrollView>
      </View>
    );
  }
  changeLampState() {
    fetch(this.api+'/change/lamp');
    this.fill();
    //console.log(this.state.temperature)
  }

  handleTemperature(value) {
    this.setState({ temp: +value }); 
  }



 
  changeTemperature() {
    fetch(this.api+'/change/temperatureMob', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tmp:this.state.temp,
      })
    });
    this.fill();
  }

  changeAirConditionerState() {
    fetch(this.api+'/change/airConditioner');
    this.fill();
  }

  changeWindowState() {
    fetch(this.api+'/change/window');
    this.fill();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  img: {
    width: 290,
    height: 225,
    marginLeft: 50,
    marginTop: 30,
  },
  text:{fontSize:18, marginBottom:10},
  slider: {
    width: '100%',
    margin: 10,
  },
  device: {
    marginBottom: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  deg: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

