/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
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



export default class kitchen extends Component{
  constructor(props){
    super(props);
    this.api='http://192.168.1.12:5000'
    this.state = {
      server:false,
      islogged: false ,
      rooom:0,
      window:'broken',      
    };
    this.fill();  
    this.fill=this.fill.bind(this)

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
    fetch(this.api+'/home/window').then(res=>res.json()).then(data=>{
      this.setState({ window: data.bedroom[this.state.rooom] })
    })  
  }
  
  
  changeWindowState() {
    fetch(this.api+'/change/window');
    this.fill();
  }
  render() {
    return (
    <View style={styles.container}>
         <Image
         style={styles.img}
         source={require('../images/kitchenRoom.png')}
         ></Image>

         <View style={styles.device}>
           <Text style={{fontSize:20, margin: 10}}>Window :</Text>
            <Switch 
              trackColor={{true: '#7AAFFD', false: 'grey'}}
              thumbColor='#007bff'
              value={this.state.window==='opened'?true:false} 
              onValueChange={this.changeWindowState}
            />
           <Text style={{fontSize:25, margin: 10}}>{this.state.window}</Text>
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

