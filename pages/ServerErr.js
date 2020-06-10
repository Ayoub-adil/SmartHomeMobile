/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable comma-dangle */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet, 
  Text
} from 'react-native';

export default class ServerErr extends Component
{

  GoHome=() =>
  {
    window.location.reload(true);
    // this.props.navigation.goBack();
  }

  render()
  {
    return(
    <View style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.welcome2}>Ouups !</Text>
          <Text style={styles.welcome}>The server is down </Text>
          <Image
         style={{width:200 , height:280, marginBottom:20 , marginLeft:70, marginTop:7}}
         source={require('../images/ErrServer.jpg')}
         ></Image>
         <Text style={styles.welcome}>Please give us some moment to fix the problem ..</Text>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
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
    fontSize: 25,
    fontWeight:'bold',
    marginTop:5,
    textAlign:"center"
  },
  welcome2: {
    fontSize: 32,
    fontWeight:'bold',
    marginTop:2,
    textAlign:"center",
    color:"#007bff"
  }
});

