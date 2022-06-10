import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity, TextInput} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";



export default class TransactionScreen extends Component {
  constructor(){
    super();
    this.state={
      domState : "normal",
      hasCameraPermissions : null,
      scanned: false,
      scannedData:""
    }
  }

  getCameraPermission=async(domState)=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions : status === "granted",
      domState:domState,
      scanned:false
    })
  }

  handleBarcodeScanned=async({type,data})=>{
    this.setState({
      scannedData:data,
      domState:"normal",
      scanned:"true"
    })
  }
  render() {
    const { domState,hasCameraPermissions,scanned,scannedData} = this.state;

    if(domState === "scanner"){
      return(
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned} style={StyleSheet.absoluteFillObject}/>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>

        </View>
       <View style={styles.lowerContainer}>
       <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput}
            placeholder={"Book Id"}
            placeholderTextColor={"white"}
            value={this.state.bookId}
            />
              <TouchableOpacity style={styles.button} onPress={()=>this.getCameraPermissions('bookId')}>
              <Text style={styles.buttonText}> Scan</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput}
            placeholder={"Student Id"}
            placeholderTextColor={"white"}
            value={this.state.studentId}
            />
            <TouchableOpacity style={styles.button}  onPress={()=>this.getCameraPermissions('studentId')}>
              <Text style={styles.buttonText}> Scan</Text>
            </TouchableOpacity>
          </View>

       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 15
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius:10
  },
  buttonText: {
    fontSize: 24,
    color: "#DA0101",
    fontFamily:'Rajdhani_600SemiBold'
  },
  lowerContainer:{
    flex:0.5,
    alignItems:"center"
  },
  textInputContainer:{
    borderWidth:2,
    borderRadius:10,
    flexDirection:"row",
    backgroundColor:"#9DFD24",
    borderColor:"white"
  },
  textInput:{
    width:"57%",
    height:50,
    padding:10,
    borderColor:"white",
    borderRadius:10,
    borderWidth:3,
    fontSize:18,
    backgroundColor:"#5653D4",
    fontFamily:'Rajdhani_600SemiBold',
    color:"white"
  },
  upperContainer:{
    flex:0.5,
    justifyContent:"center",
    alignItems:"center"
  }
});
