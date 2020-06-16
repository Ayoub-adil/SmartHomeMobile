/* eslint-disable prettier/prettier */
/* eslint-disable no-extra-semi */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable space-infix-ops */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import 'react-native-gesture-handler';
import React, { Component , useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet, 
  Text
} from 'react-native';

import Bedroom from './Bedroom';
import livingroom from './livingroom';
import kitchen from './kitchen';


import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class Rooms extends Component
{
  constructor(props){
    super(props);
    this.api='http://192.168.1.12:5000'
    this.state={
      server:false,
      islogged: false ,
      plan:'homeSweetHome',
    }
    this.fill();
    this.fill=this.fill.bind(this);
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
    fetch(this.api+'/home/plan')
      .then(res=>res.json())
      .then(data=>{this.setState({ plan: data.plan })})
  }
  
  
  onB=(t,r) =>
  {
    fetch(this.api+'/change/rooom', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        typeofroom:t,
        rooom:r,
      })
    })
    this.props.navigation.navigate(t);
  }

  render(){
    
    return (

        <View style={styles.container}>

        <Stack.Navigator>
        <Stack.Screen name="Bedroom" component={Bedroom} />
        <Stack.Screen name="livingroom" component={livingroom} />
        <Stack.Screen name="kitchen" component={kitchen} />
        </Stack.Navigator>


        <ScrollView>

        <Text style = {styles.tit}>Bedrooms</Text>
        {[...Array(this.state.plan.bedroom)].map((e,i)=>
          <TouchableOpacity style={styles.button}onPress={()=>{this.onB("bedroom",i)}}>
            <View style = {styles.item}>
              <Image
                style={{width:50 , height:32}}
                source={require('../images/bedroomN.png')}
              />
              <Text key={i} style = {styles.txt}>bedroom {i+1}</Text>
            </View>
          </TouchableOpacity>
        )
        }
        <Text style = {styles.tit}>livingrooms</Text>
        {[...Array(this.state.plan.livingroom)].map((e,i)=>
          <TouchableOpacity style={styles.button} onPress={()=>{this.onB("livingroom",i)}}>
            <View style = {styles.item}>
              <Image
                style={{width:50 , height:32}}
                source={require('../images/livingroomN.png')}
              />
              <Text key={i} style = {styles.txt}>livingroom {i+1}</Text>
            </View>
          </TouchableOpacity>
        )
        }
        <Text style = {styles.tit}>kitchens</Text>
        {[...Array(this.state.plan.kitchen)].map((e,i)=>
          <TouchableOpacity style={styles.button} onPress={()=>{this.onB("kitchen",i)}}>
            <View style = {styles.item}>
              <Image
                style={{width:50 , height:32}}
                source={require('../images/kitchenN.png')}
              />
              <Text key={i} style = {styles.txt}>kitchen {i+1}</Text>
            </View>
          </TouchableOpacity>
        )
        }
        </ScrollView>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F9F9F9',
  },
  item: {
    backgroundColor : '#7AAFFD',
    padding: 20,
    paddingLeft:50,
    paddingRight:50,
    margin: 20,
    borderRadius: 40
  },
  txt: {
    color: '#F9F9F9',
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Quicksand-Medium"
  },
  tit: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Quicksand-Medium",
    margin: 10
  }
});

