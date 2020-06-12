/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
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

export default class SignIn extends Component
{
  constructor(props){
    super(props);
    this.api='http://192.168.1.12:5000'
    this.state = {
      server:false,
      Login: '',
      psw:'', 
      islogged: false     
    };
    this.WorkingServer();
    this.WorkingServer=this.WorkingServer.bind(this);
    // this.GetTextLogin();
    // this.GetTextPsw();
    this.login();
    // this.GetTextLogin=this.GetTextLogin.bind(this);
    // this.GetTextPsw=this.GetTextPsw.bind(this);
    this.login=this.login.bind(this);
  }

  WorkingServer(){
    fetch(this.api+'/server').then(res=>res.json()).then(data=>{
      this.setState({
        server: data.server,
      });
    })
  }

  componentDidMount()
  {
    fetch(this.api+'/user/loginMobile')
		.then(res=>res.json())
    .then(data=>{this.setState({ islogged : data.islogged })})
    
    if (islogged=true){
      this.props.navigation.navigate('Home')
    }
    else{this.props.navigation.navigate('SignIn')}
  }

  login()
  {
    // this.props.navigation.navigate('Home');
    let collection = {}
    collection.login=this.state.login,
    collection.psw=this.state.psw

    let response = await fetch(this.api+'/user/loginMobile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collection)
    });
    
    let result = await response.json();

  }

  render()
  {
    return(
      <View style={styles.container}>
      {this.state.server
      ?
    <KeyboardAwareScrollView>
        <View style={styles.inner}>
          <Image
            style={{width:200 , height:200, marginBottom:20 , marginLeft:70, marginTop:30}}
            source={require('../images/key4.png')}
          />
          <Text style={styles.hello}>Hello <Text style={styles.user}>User</Text></Text>
          <Text style={styles.txt}>Authenticate your account</Text>
          <TextInput placeholder="Login" style={styles.textInput} onChangeText={(login) => this.setState({login})}/>
          <TextInput placeholder="Password" style={styles.textInput} onChangeText={(psw) => this.setState({psw})}/>
          <View style={styles.btnContainer}>
            <Button title="Sign in" onPress={this.login} />
          </View>
        </View>
    </KeyboardAwareScrollView >
    :<ServerErr/>
    }
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
});

