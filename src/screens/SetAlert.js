import React, {useEffect, useState} from 'react'
import { useNavigation } from "@react-navigation/native";
import { 
    StyleSheet, 
    SafeAreaView, 
    View, Text, 
    TextInput, 
    Dimensions, 
    Button, 
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity, 
    Platform, 
    TouchableWithoutFeedback,
    TouchableHighlight, 
    Keyboard,
    // Switch
} from 'react-native'
import KeyboardListener from 'react-native-keyboard-listener';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Switch from 'react-native-switch-pro'

function SetAlert({route}) {
    const navigation = useNavigation();
    const { otherParam, price } = route.params;
    
    useEffect(() => {
        //printing the company name getting from the previous screen
        console.log("name in setalert: "+ JSON.stringify(otherParam))
        console.log("price in setalert: "+ JSON.stringify(price))
    }, [])

    const [textInput, setTextInput] = useState('');

    const checkTextInput = async() => {
        //Check for the Name TextInput
        if (!textInput.trim()) {
          alert('Please Enter details');
          return;
        }
        navigation.navigate("Home",{
            otherParam: otherParam,
            price: price,
            trigger: textInput
        })
        
        let request = JSON.stringify({
            trigger : textInput,
          })
          const options = {
            method: "POST",
            headers: {
              Accept: 'application/json',
              "Content-Type" : "application/json"
            },
            body: request
          };
          // console.log("name: "+ options.body.stock)
          const response = await fetch('http://127.0.0.1:3000/getTrigger', options)
          const json = await response.json();
          console.log(json)
          // setPrice(json.price)
    };

    function renderHeader(navigation){
        return(
            <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', width:'100%', height: '10'}}>
                <AntDesign name="close" size={24} color="black" 
                    onPress={()=> {
                        var stock = 'Lookup a stock'
                        var pricing = 'Prices updated at market close'
                        var triggerr= 'Add'
                        navigation.navigate("Home", {
                            otherParam: stock,
                            price: pricing,
                            trigger: triggerr
                        })
                        }
                    } 
                    style={{ paddingTop:10, paddingLeft:35, width: '40%'}}/>            
                <Text style={{padding: 10, textAlign:'left', width: '60%', fontSize:20}}>
                    {/* <Text style={{fontWeight:'800'}}>DIP</Text> */}
                    <Text style={{fontWeight:'400'}}>Set Alert</Text>
                </Text>
            </View>
        )
    }
    function StalkPriceHeader(){
        return(
            <View style={{flex:2, padding:10, width:(Dimensions.get('window').width)}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent:'center'}}>
                        <Text style={{fontSize: 30, lineHeight: 55, color:'#ec5d29'}}>$</Text>
                        <TextInput placeholder='900' keyboardType='numeric' 
                        onChangeText={
                            (value) => setTextInput(value)
                            } 
                        style={{fontSize: 80, lineHeight: 90, color:'#ec5d29'}}></TextInput>
                    </View>
                    {/* <Text style={{fontWeight:'400',letterSpacing:4, textAlign:'center', fontSize:80,height: 90, color:'#c6c8c9'}}>GME</Text> */}
                    <Text style={{fontWeight:'400', marginTop:4, color:'#ec5d29', textAlign:'center'}}>Target price for {otherParam}</Text>
            </View>
        )
    }
    function enableNotification(){
        return(
            <View style={{flex:1, width:(Dimensions.get('window').width), height:50}}>
                <View style={{flexDirection: 'row', justifyContent:'center',padding:10}}>
                    <View style={{width:'80%'}}>
                        <Text style={{fontSize:17}}>Price Alerts</Text>
                        <Text style={{marginTop:4,fontSize:14,color:'#6a6e70', fontWeight:'400'}}>Send 10% dip notification</Text> 
                    </View>
                    <Switch 
                        width= {57}
                        height={30} 
                        circleColorInactive='#f1f1f1' 
                        backgroundInactive='#fff'
                        
                        // value = {isEnabled}
                        // onValueChange = {toggleSwitch} 
                        // borderColor='#000' 
                        // borderWidth= {isEnabled ? 0: 0.5}
                        style={{
                            borderColor:'#000',
                            borderWidth: 0.5, 
                            padding: 2
                        }}
                        circleStyle={{
                            width:25, 
                            height:25, 
                            borderWidth: 0.5,
                            borderColor:'#000', 
                        }} 
                        
                        onSyncPress={()=> console.log("Button Tapped")}
                    />
                </View>
                <View style={{flex:1,flexDirection:'column',justifyContent:'center', marginTop:10}}>
                    <TouchableHighlight  style={styles.Button} 
                        onPress={checkTextInput } 
                        underlayColor='#fff'>
                        <Text style={styles.ButtonText}>Submit</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {/* <Text style={styles.header}>Header</Text> */}
                    {renderHeader(navigation)}
                    {StalkPriceHeader()}
                    {/* <KeyboardListener
                        onWillShow={() => { enableNotification() }}
                        onWillHide={() => { }}
                    /> */}
                    {enableNotification()}
                    {/* <TextInput placeholder="Username" style={styles.textInput} /> */}
                    {/* <View style={styles.btnContainer}>
                        <Button title="Submit" onPress={() => null} />
                    </View> */}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
            {/* {renderHeader()}
            {StalkPriceHeader()}
            {enableNotification()} */}
        </SafeAreaView>
    )
}

export default SetAlert
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
    },
    // header: {
    // fontSize: 36,
    // marginBottom: 48
    // },
    // textInput: {
    // height: 40,
    // borderColor: "#000000",
    // borderBottomWidth: 1,
    // marginBottom: 36
    // },
    // btnContainer: {
    // backgroundColor: "white",
    // marginTop: 12
    // },
    Button:{
        // marginLeft:'25%',
        width:'100%',
        backgroundColor:'#000',
        height: 55,
        justifyContent: 'center',
        alignSelf: 'flex-end',
      },
      ButtonText:{
        color:'#ffe6d2',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontSize: 20
    },
    Switch:{

    }
  });