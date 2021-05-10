import React, {useEffect, useState, useRef } from 'react'
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
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import KeyboardListener from 'react-native-keyboard-listener';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Switch from 'react-native-switch-pro'
import * as firebase from 'firebase';

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
      ios: { sound: true },
    },
    trigger: { seconds: 1 },
  })
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }
  return token
}

function SetAlert({route}) {
  const navigation = useNavigation()
  const { otherParam, price } = route.params
  const [isEnabled, setIsEnabled] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
      //printing the company name getting from the previous screen
      console.log("name in setalert: "+ otherParam)
      console.log("price in setalert: "+ price)
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token))

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification)
      })

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response)
      })

      return () => {
        Notifications.removeNotificationSubscription(notificationListener)
        Notifications.removeNotificationSubscription(responseListener)
      }
  }, [])

  const [textInput, setTextInput] = useState('');

  const checkTextInput = async() => {
      //Check for the Name TextInput
      if (!textInput.trim()) {
        alert('Please Enter details');
        return;
      }
      var firebaseConfig = {
          apiKey: "AIzaSyD6f14ph0RzjoUn673MPGri_NxOkPEvccs",
          authDomain: "diplist-a1ba9.firebaseapp.com",
          databaseURL: "https://diplist-a1ba9-default-rtdb.firebaseio.com",
          projectId: "diplist-a1ba9",
          storageBucket: "diplist-a1ba9.appspot.com",
          messagingSenderId: "810287966234",
          appId: "1:810287966234:web:ae2658a0efedbefda789a3",
          measurementId: "G-6VETDDQM22"
        };
        // Initialize Firebase
        // firebase.initializeApp(firebaseConfig);
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }else {
          firebase.app(); // if already initialized, use that one
        }
        const auth = firebase.auth()
        var userid
        await firebase.auth().signInAnonymously()
        .then(() => {
            console.log('anonymous user signed in')
            auth.onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    userid = firebaseUser.uid;
                    console.log('uid', userid)
                } else {
                    console.log('user is not signed in')
                }
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + ': '+ errorMessage)
        });
      navigation.navigate("Home",{
          otherParam: otherParam,
          price: price,
          trigger: textInput
      })
      navigation.navigate("Home")

      let request = JSON.stringify({
          userid: userid,
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
          <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', width:'100%', height: 10}}>
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
                      navigation.navigate("Home")
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
                  <Text style={{fontWeight:'400',letterSpacing:2, textAlign:'center',color:'#ec5d29'}}>Target Price for TSLA</Text>
                  {/* <Text style={{fontWeight:'400', marginTop:4, color:'#ec5d29', textAlign:'center'}}>Target price for {otherParam}</Text> */}
          </View>
      )
  }

  function enableNotification(){
    const toggleSwitch = async () => {
      setIsEnabled(previousState => !previousState);
      console.log("toggle switch")
      console.log("isenabled: " + isEnabled)
      if(!isEnabled){
        console.log('enabled')
        // faceDetector()
      }else{
        console.log('not enabled')
      }
    }
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
            value = {isEnabled}
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
            onSyncPress={ async () => {
              await toggleSwitch()
            }}
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