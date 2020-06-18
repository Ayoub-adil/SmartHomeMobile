/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable keyword-spacing */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import ServerErr from './ServerErr';
import Rooms from './Rooms';

export default class SignIn extends Component
{
  constructor(props){
    super(props);
    this.api='http://192.168.1.12:5000'
    this.state = {
      server:false,
      islogged: false ,
      login: '',
      psw:'', 
      msg:'pas de message',
    };

    this.fill();
    this.fill=this.fill.bind(this);

    // this.sess=this.sess.bind(this);
    // this.login=this.login.bind(this);
    // this.start=this.start.bind(this);
  }

  fill(){
    fetch(this.api+'/server')
      .then(res=>res.json())
      .then(data=>{this.setState({
        server: data.server,
      });
    })
    fetch(this.api+'/user/loginMobile')
		  .then(res=>res.json())
      .then(data=>{
        this.setState({ islogged : data.islogged , msg : data.msg })
        data.islogged?this.props.navigation.navigate('Home'):null
    })
  }
  
  login=async () =>
  {
    await fetch(this.api+'/user/loginMobile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login:this.state.login,
        psw:this.state.psw,
      })
    })
    this.fill();
  }

  render()
  {
    return(
      <View style={styles.container}>
      
<KeyboardAwareScrollView>
  <View style={styles.inner}>
    <Image
      style={{width:200 , height:200, marginBottom:20 , marginLeft:70, marginTop:30}}
      source={require('../images/key4.png')}
    />
    <Text style={styles.hello}>Hello <Text style={styles.user}>User</Text></Text>
    <Text style={styles.txt}>Authenticate your account</Text>
    <TextInput placeholder="Login" style={styles.textInput} onChangeText={(login) => this.setState({login})}/>
    <TextInput placeholder="Password" secureTextEntry={true} style={styles.textInput} onChangeText={(psw) => this.setState({psw})}/>
    <View style={styles.btnContainer}>
    {(this.state.msg === "pas de message")? null:<Text style={styles.err}>{this.state.msg}</Text>}
      <Button title="Sign in" onPress={this.login} />
    </View>
  </View>
</KeyboardAwareScrollView>

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
  header: {
    fontSize: 36,
    marginBottom: 48
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
  user: {
    color:'#007bff'
  },
  hello: {
    fontSize: 32,
    fontWeight:'bold',
    marginTop:5
  },
  txt: {
    marginBottom: 20,
    fontSize:18,
    marginTop:-10
  },
  err: {
    color: "red",
    textAlign:"center",
    marginBottom:20,
    fontWeight:"bold"
  },
});

