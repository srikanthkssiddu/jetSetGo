import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import SplashScreenController from "./splashScreenController";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default class SplashScreen extends SplashScreenController {
  render() {
    const emptyInput = this.state.origin === "" && this.state.destination === ""
    return (
      <ImageBackground
        source={require("../../assets/whiteBack.jpeg")}
        style={styles.backgroundImage}
      >
        <Text style={styles.appTitle}>jetSetGo</Text>
       <Image
       source={require("../../assets/planeIcon.jpeg")}
       style={styles.appIcon}
       />
        <View style={styles.container}>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="plane-departure" size={20} color="#808080" />
          <TextInput
            style={styles.input}
            placeholder="Where From"
            value={this.state.origin}
            onChangeText={text => this.setState({ origin: text })}
          />
        </View>
       
        <View style={styles.inputContainer}>
          <FontAwesome5 name="plane-arrival" size={20} color="#808080" />
          <TextInput
            style={styles.input}
            placeholder="Where To"
            value={this.state.destination}
            onChangeText={text => this.setState({ destination: text })}
          /></View>

          <TouchableOpacity style={styles.button} onPress={this.onGetStarted}
          disabled={emptyInput}
          >
            <Text  style={[styles.buttonText, emptyInput && styles.disabledButton]}>Search results</Text>
           
          </TouchableOpacity>
          <Text  style={styles.orText}>
            OR
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.getAllResults}
         
          >
            <Text  style={styles.buttonText}>Get all results</Text>
           
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: "100%",
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton:{
    // opacity:0.5
  },
  appIcon:{
width:150,
height:100,
borderRadius:15,
marginTop:-75,
marginBottom:25
},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    marginHorizontal:15,
    borderRadius:5,
    paddingLeft:10
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#cccccc',
  
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    borderRadius: 15,
    width: "90%",
    backgroundColor: "#F9F9F9",
    ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        },
        android: {
          elevation: 5,
        },
      }),
  },
  appTitle: {
    fontWeight: "900",
    fontSize: 30,
    alignSelf: "center",
    color:'#800000',marginBottom:100,
  },
  button: {
    backgroundColor: "#F9F9F9",
    paddingVertical: 8,
    paddingHorizontal: 90,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth:1.5,
    borderColor:"#800000",
    marginTop:10,
  },
  RightIcon: {
    marginLeft: 10,
    alignSelf: "center",
    color: "#292524",
  },
  buttonText: {
    color: "#800000",
    fontSize: 17.5,
    fontWeight: "bold",
  },
  orText:{
    color: "#800000",
    fontSize: 17.5,
    fontWeight: "bold",
    marginTop:7
  }
});
