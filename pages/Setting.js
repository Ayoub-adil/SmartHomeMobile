/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-infix-ops */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  Switch,
  SafeAreaView,
  ScrollView ,
  StyleSheet, 
  Text
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class Setting extends Component
{

  constructor(props){
    super(props);
    this.api='http://192.168.1.12:5000'
    this.state={
      outsideT:'Conexion au termometre..',
      rain:'Conexion au capteur de pluie..',
      door:'Conexion au capteur..',
      garageDoor:'Conexion au capteur..',
      alert:"obtention de l'etat ...",
      watering:"obtention de l'etat ...",
      mvt:"connexion au capteur de mouvement"
    }
    this.getOutsideTemperature();
    this.getDoorState();
    this.getGarageDoorState();
    this.getAlert();
    this.getMvtLight();

    this.getOutsideTemperature=this.getOutsideTemperature.bind(this);
    this.getDoorState=this.getDoorState.bind(this);
    this.getGarageDoorState=this.getGarageDoorState.bind(this);
    this.getAlert=this.getAlert.bind(this);
    this.getMvtLight=this.getMvtLight.bind(this);

    this.changeDoorState=this.changeDoorState.bind(this) 
    this.changeGarageDoorState=this.changeGarageDoorState.bind(this) 
    this.changeAlert=this.changeAlert.bind(this) 
    this.changeWatering=this.changeWatering.bind(this) 
    this.changeMvtLight=this.changeMvtLight.bind(this) 
  }
  

  getOutsideTemperature(){
      fetch(this.api+'/home/outsideTemperature').then(res=>res.json()).then(data=>{
        this.setState({
          outsideT: data.outsideTemperature,
          rain: data.rain[0],
        });
      })
  }
  getDoorState(){
      fetch(this.api+'/home/door').then(res=>res.json()).then(data=>{
        this.setState({
          door: data.door,
        });
      })
  }
  getGarageDoorState(){
      fetch(this.api+'/home/garageDoor').then(res=>res.json()).then(data=>{
        this.setState({
          garageDoor: data.garageDoor,
        });
      })
  }
  getAlert(){
      fetch(this.api+'/home/alert').then(res=>res.json()).then(data=>{
        this.setState({
          alert: data.alert,
          watering: data.watering,
        });
      })
  }
  getMvtLight(){
      fetch(this.api+'/home/mvtLight').then(res=>res.json()).then(data=>{
        this.setState({
          mvt: data.mvt,
        });
      })
  }

  
  render()
  {
    return(
    <SafeAreaView style={styles.container}>
      <ScrollView>

      <View style={styles.list}>
        <View>
          <FontAwesome5 style={styles.icon} size={20} name="cloud" />
          <Text style={styles.txt}>Weather</Text>
        </View>
        <View>
          <Text style={styles.txt}>{this.state.rain?null:<Text>Pas de </Text>}Pluie</Text>
          <Text style={styles.txt}>{this.state.outsideT}°C</Text>
        </View>
      </View>

      <View style={styles.list}>
        <View>
          <FontAwesome5 style={styles.icon} size={20} name="exclamation-triangle" solid />
          <Text style={styles.txt}>Alert</Text>
        </View>
        <View>
          <Text style={styles.txt}>Watering : {this.state.watering} </Text>
          <Switch
            style={styles.swch}
            onValueChange={this.changeWatering}
            value={this.state.watering==='on'?true:false} 
        />
        </View>
        <View>
          <Text style={styles.txt}>Alarm : {this.state.alert}</Text>
          <Switch
        onValueChange={this.changeAlert}
        value={this.state.alert==='on'?true:false} 
        />
        </View>
      </View>

      <View style={styles.list}>
        <View>
          <FontAwesome5 style={styles.icon} size={20} name="lightbulb" solid />
          <Text style={styles.txt}>Hall ligth</Text>
        </View>
        <View>
          <Text style={styles.txt}>{this.state.mvt?<Text>on </Text>:<Text>off </Text>}</Text>
          <Switch
        onValueChange={this.changeMvtLight} 
        value={this.state.mvt} 
        />
        </View>
      </View>

      <View style={styles.list}>
        <View>
          <FontAwesome5 style={styles.icon} size={20} name="door-open" />
          <Text style={styles.txt}>Door System</Text>
        </View>
        <View>
          <Text style={styles.txt}>{this.state.door?<Text>Locked </Text>:<Text>Unlocked </Text>} </Text>
          <Switch
        onValueChange={this.changeDoorState} 
        value={this.state.door}
        />
        </View>
      </View>

      <View style={styles.list}>
        <View>
          <FontAwesome5 style={styles.icon} size={20} name="door-open" />
          <Text style={styles.txt}>Door : Garage</Text>
        </View>
        <View>
          <Text style={styles.txt}>{this.state.garageDoor} </Text>
          <Switch
        onValueChange={this.changeGarageDoorState} 
        value={this.state.garageDoor==="opened"?true:false} 
        />
        </View>
      </View>

      </ScrollView>
    </SafeAreaView>
    );
    }
    
    changeDoorState() {
      fetch(this.api+'/change/door');
      this.getDoorState();
  }

  changeGarageDoorState() {
      fetch(this.api+'/change/garageDoor');
      this.getGarageDoorState();
  }
  changeAlert() {
      fetch(this.api+'/change/alert');
      this.getAlert();
  }
  changeWatering() {
      fetch(this.api+'/change/watering');
      this.getAlert();
  }
  changeMvtLight() {
      fetch(this.api+'/change/mvtLight');
      this.getMvtLight();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F9F9F9',
    alignItems: 'center'
  },
  list: {
    width: 340,
    height: 100,
    backgroundColor:"#E5E5E5",
    alignItems: 'center',
    flexDirection:"row",
    justifyContent:"space-between",
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight:20,
    marginTop: 25  },
  icon: {
    color:'#007bff',
    marginLeft: 10
  },
  txt: {
    color:'#202020',
    fontWeight:"bold"
  },
  swch: {
    color:'#007bff',
  },
  // scrollView: {
  //   marginHorizontal: 20
  // }
});

