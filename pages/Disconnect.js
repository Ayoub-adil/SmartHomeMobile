/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable semi */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet, 
  Text,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class Disconnect extends Component
{
  constructor(props){
    super(props);
    this.api='http://192.168.1.12:5000'
    this.disconnect=this.disconnect.bind(this)
    }
    disconnect(){
      fetch(this.api+'/disconnectMob');
      this.props.navigation.navigate('Landing')
    }

  render()
  {
    return(
    <View style={styles.container}>
      <FontAwesome5 style={styles.icon} size={80} name="frown" solid />
      <Text style={styles.txt}>Are you sure you want to disconnect from the application ?</Text>
      <Button 
        style={styles.btn} 
        title="Disconnect"
        onPress={() => this.disconnect()}
        />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F9F9F9',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  txt: {
    fontSize: 18,
    margin:25,
    textAlign: "center"
  },
  titre: {
    fontSize: 30,
    fontWeight:"bold",
    textAlign: "center"
  },
  icon: {
    color:"#007bff",
    margin: 20
  }
});

