import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet, 
  Text
} from 'react-native';

export default class ServerErr extends Component
{

  GoHome=() =>
  {
    this.props.navigation.goBack();
  }

  render()
  {
    return(
    <View style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.welcome2}>Ouups !</Text>
          <Text style={styles.welcome}>The server is down, try again later. </Text>
          <Image
         style={{width:200 , height:280, marginBottom:20 , marginLeft:70, marginTop:7}}
         source={require('../images/ErrServer.jpg')}
         ></Image>
          <View style={styles.btnContainer}>
            <Button title="Go back" onPress={this.GoHome}/>
          </View>
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

