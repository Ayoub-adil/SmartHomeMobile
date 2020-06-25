import React, {Component} from 'react';
import {TextInput, StyleSheet, Text,Modal, View,
  ScrollView,TouchableOpacity,Button,Alert,Image,
        TouchableHighlight,StatusBar} from 'react-native';

export default class Profil extends Component
{
  constructor(props){
    super(props);
    this.api='http://192.168.1.12:5000'
    this.state = {
      login: '',
      psw:'',
    }

    this.getUsers();
    this.getUsers=this.forceUpdate.bind(this)

  }

  getUsers(){
    fetch(this.api+'users/tab')
    .then(res=>res.json())
    .then(data=>{this.setState({
      login : data.login,
      psw:data.psw
    })})
  }

  render()
  {
    const { modalVisible } = this.state;
    return (
      <View style={styles.container}>
        {/* <ScrollView> */}
         {[...this.state.login].map((e,i)=>
         <View style={styles.flexo}>
           <View style={styles.row}>
             <Text style={{color:"#007bff" , fontWeight:"bold"}}>Login</Text>
             <Text>{this.state.login[i]}</Text>
             </View>
           <View style={styles.row}>
             <Text style={{color:"#007bff" , fontWeight:"bold"}}>Password</Text>
             <Text>{this.state.psw[i]}</Text>
             </View>
         </View>)}
         {/* </ScrollView> */}
      </View>
    );
  }
}
      
const styles = StyleSheet.create({
  container: {
     flex: 1,
     marginTop:40,
     alignItems:'center'
  },
  txt: {
    marginTop:10,
    fontSize:15
  },
  button: {
    backgroundColor:"#7AAFFD",
    padding:20,
    margin:20,
    borderRadius:30
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 30
  },
  flexo: {
    display:"flex",
    flexDirection:"row"
  },
  row: {
    margin:30
  }
})