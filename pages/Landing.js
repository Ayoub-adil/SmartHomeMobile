/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable semi */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet, 
  Text
} from 'react-native';

export default class Landing extends Component
{
  constructor(props){
    super(props);
    this.api='http://192.168.1.12:5000'
    this.state = {
      server:false,
      islogged: false ,
    };
    this.fill();
    this.fill=this.fill.bind(this);
    
    this.restart();
    this.restart=this.restart.bind(this);

  }
  fill(){
    fetch(this.api+'/server')
      .then(res=>res.json())
      .then(data=>{this.setState({server: data.server,})})
    fetch(this.api+'/user/loginMobile')
		  .then(res=>res.json())
      .then(data=>{this.setState({ islogged : data.islogged})})
  }

  restart()
	{
    fetch('/SuperAdmin/message')
  }

  start=() =>
  {
    if(this.state.server){
      this.restart()
      this.state.islogged
        ?this.props.navigation.navigate('Home')
        :this.props.navigation.navigate('SignIn');      
    }
    else{
      this.props.navigation.navigate('Sorry!')
    }
  }

  render()
  {
    return(
    <View style={styles.container}>
      
        <View style={styles.inner}>
          <Text style={styles.welcome}>Welcome to <Text style={styles.smarthome}>Smarthome</Text></Text>
          <Text style={styles.txt}>Let's manage your smart home</Text>
          <Image
         style={{width:300 , height:260, marginBottom:20 , marginLeft:30, marginTop:7}}
         source={require('../images/home.png')}
         ></Image>
          <View style={styles.btnContainer}>
            <Button title="Get Started" onPress={this.start}/>
          </View>
        </View>
     
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F9F9F9'
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 20
  },
  btnContainer: {
    marginTop: 5
  },
  welcome: {
    fontSize: 27,
    fontWeight:'bold',
    marginTop:20
  },
  txt: {
    marginBottom: 20,
    fontSize:18,
    marginTop:-20
  },
  smarthome: {
    color:'#007bff'
  }
});

