import React, { useState, useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { StyleSheet, SafeAreaView, View, Text, Dimensions, Button, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { IEXClient } from 'iex-api'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';

async function ButtonClick(){
    
}
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

function renderHeader(navigation){
   
    return(
        // flex:1,
        <View style={{flex:1, alignItems: 'flex-start', flexDirection: 'row', justifyContent:'space-between', width:'100%', height: 50, marginTop:50}}>
            <Ionicons name="settings-outline" size={24} color="black" style={{ paddingTop:10, paddingLeft:35, width: '40%'}}
                onPress={()=> {
                  navigation.navigate("Settings")
                }}
            />
            <Text style={{padding: 10, textAlign:'left', width: '60%', fontSize:23}}>
                <Text style={{fontWeight:'800'}}>DIP</Text>
                <Text style={{fontWeight:'400'}}>LIST</Text>
            </Text>
        </View>
    )
}
function Content1(navigation, otherParam, price, trigger){
    return(
        //flex:10,
        <View style={{flex:2, width:(Dimensions.get('window').width - (0.1*(Dimensions.get('window').width))), height:50}}>
            {/* <Ionicons name="settings-outline" size={24} color="black" style={{padding: 10}}/> */}
            <View  style={{width: '100%', height: 50, marginTop:50, marginLeft:'5%' ,alignItems:'left'}}>
                <Text style={{fontSize:25}}>
                    <Text style={{fontWeight:'800'}}>DIP</Text>
                    <Text style={{fontWeight:'400'}}>LIST</Text>
                </Text>
            </View>
            <TouchableOpacity  style={{flexDirection:'row' ,width: '100%', height: 60, marginLeft:'5%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}
                onPress= {() => {
                    navigation.navigate('StockScreenBluePrint',{
                        otherParam: otherParam,
                        price: price,
                        trigger: trigger
                    })
                }}
            >
                {otherParam == 'Lookup a stock' 
                ?    <View style={{width:'80%'}}>
                        <Text style={{fontSize:17}}>{otherParam}</Text>
                        <Text style={{marginTop:4,fontSize:14,color:'#6a6e70', fontWeight:'500'}}>{price}</Text> 
                    </View> 
                     
                :    <View style={{width:'80%'}}>
                        <Text style={{fontSize:17}}>{otherParam}</Text>
                        <Text style={{marginTop:4,fontSize:14,color:'#6a6e70', fontWeight:'500'}}>Last closed {price}</Text> 
                    </View>
                }
                {otherParam == 'Lookup a stock'
                ?   <TouchableHighlight  style={styles.Button2} onPress={()=> console.log("Button Tapped")} underlayColor='#fff'>
                        <Text style={styles.Button2Text}>{trigger}</Text>
                    </TouchableHighlight>

                :   <TouchableHighlight  style={styles.Button} onPress={()=> console.log("Button Tapped")} underlayColor='#fff'>
                        <Text style={styles.ButtonText}>${trigger}</Text>
                    </TouchableHighlight>
                }
                  
            </TouchableOpacity>
        </View>
    )
}
function Content2(){
    
    return(
        <View style={{flex:5, width:(Dimensions.get('window').width - (0.1*(Dimensions.get('window').width))), height:50}}>
            {/* <Ionicons name="settings-outline" size={24} color="black" style={{padding: 10}}/> */}
            <View  style={{width: '100%', height: 50, marginTop:50, marginLeft:'5%' ,alignItems:'left'}}>
                <Text style={{fontSize:25}}>
                    {/* <Text style={{fontWeight:'800'}}>DIP</Text> */}
                    <Text style={{fontWeight:'400'}}>INDICES</Text>
                </Text>
            </View>
            <View  style={{marginTop:10,flexDirection:'row' ,width: '100%', height: 60, marginLeft:'5%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}>
                <View style={{width:'50%'}}>
                    <Text style={{fontSize:17}}>DJIA</Text>
                    <Text style={{marginTop:4,fontSize:14,color:'#6a6e70', fontWeight:'500'}}>Last closed $29,891</Text> 
                </View>
                <TouchableOpacity  style={styles.ButtonSet} onPress={()=> console.log("Button Tapped")} underlayColor='#fff'>
                    <Text style={styles.ButtonSetText}>Set</Text>
                </TouchableOpacity>
            </View>
            <View  style={{marginTop:40,flexDirection:'row' ,width: '100%', height: 60, marginLeft:'5%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}>
                <View style={{width:'50%'}}>
                    <Text style={{fontSize:17}}>NASDAQ</Text>
                    <Text style={{marginTop:4,fontSize:14,color:'#6a6e70', fontWeight:'500'}}>Last closed $30,000</Text> 
                </View>
                <TouchableOpacity  style={styles.ButtonSet} onPress={()=> console.log("Button Tapped")} underlayColor='#fff'>
                    <Text style={styles.ButtonSetText}>Set</Text>
                </TouchableOpacity>
            </View>
            <View  style={{marginTop:40, flexDirection:'row' ,width: '100%', height: 60, marginLeft:'5%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}>
                <View style={{width:'50%'}}>
                    <Text style={{fontSize:17}}>S&P 500</Text>
                    <Text style={{marginTop:4,fontSize:14,color:'#6a6e70', fontWeight:'500'}}>Last closed $15,029</Text> 
                </View>
                <TouchableOpacity  style={styles.ButtonSet} onPress={() => navigate('HomeScreen')} underlayColor='#fff'>
                    <Text style={styles.ButtonSetText}>Set</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
function Content3(navigation){
    return(
        <View style={{flex:1, width:(Dimensions.get('window').width ), height:50, alignContent:'center', alignItems:'center'}}>
            
            <TouchableHighlight  style={styles.ButtonAddStock} onPress={()=> navigation.navigate("FirstScreen")} underlayColor='#fff'>
                <Text style={styles.ButtonAddStockText}>Add Stock</Text>
            </TouchableHighlight>
        </View>
    )
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
function Home({route}) {
  const [stockDetails, setStockDetails] = useState([])
  useEffect( () => {
    sleep(3000)
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
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }else {
      firebase.app(); // if already initialized, use that one
    }
    const auth = firebase.auth()
    var userid
    // You can await here
    async function fetchData() {
      let data
      console.log("fetchdata")
      await firebase.auth().signInAnonymously()
      .then(() => {
        console.log('anonymous user signed in')
        auth.onAuthStateChanged(async(firebaseUser) => {
          if (firebaseUser) {
            userid = firebaseUser.uid;
            console.log('uid', userid)
            let request = JSON.stringify({
                userid: userid,
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
            // const response = await fetch('http://127.0.0.1:3000/getData', options)
            // const json = await response.json();
            // data = json.data
            await fetch('http://127.0.0.1:3000/getData', options)
            .then( (response) => response.json)
            .then( (json) => {
              console.log('response')
              data = json.data
              setStockDetails(data)
            })
            
            // console.log(json.data[2].stockname)
          } else {
            console.log('user is not signed in')
          }
        })
        setStockDetails(data)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ': '+ errorMessage)
      });
    }
    
    fetchData()
    console.log("useeffect")
    console.log('data: ', stockDetails)

    //* FOR NOTIFICATION
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token))
    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   setNotification(notification)
    // });
    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response)
    // })
    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener)
    //   Notifications.removeNotificationSubscription(responseListener)
    // }
  },[])
    const navigation = useNavigation();
    const { otherParam, price, trigger } = route.params;
    return (
      <View style={styles.container}>
        {renderHeader(navigation)}
        {Content1(navigation, otherParam, price, trigger)}
        {Content2()} 
        {Content3(navigation)}
      </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   width: 100%
    },
    childView: {
 
        // width: 100,
        // height: 100,
        borderBottomWidth :5,
        borderBottomColor: '#000',
        backgroundColor: '#00BCD4',
     
      },

    Button:{
        marginLeft:'0%',
        width:'20%',
        backgroundColor:'#ec5d29',
        height: 35,
        borderRadius:8,
        // borderWidth: 1,
        // borderColor: '#fff'
        justifyContent: 'center'
      },
      ButtonText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    Button2:{
        marginLeft:'0%',
        width:'20%',
        backgroundColor:'#fff',
        height: 35,
        borderRadius:8,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center'
      },
      Button2Text:{
        color:'#000',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    ButtonSet:{
        marginLeft:'25%',
        width:'25%',
        backgroundColor:'#fff',
        height: 38,
        borderRadius:8,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2b3033'
        },
    ButtonSetText:{
        color:'#2b3033',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    ButtonAddStock:{
        width:'85%',
        backgroundColor:'#2b3033',
        height: 58,
        borderRadius:40,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2b3033'
        },
    ButtonAddStockText:{
        color:'#ffe6d2',
        fontSize: 20,
        textAlign:'center',
        paddingLeft : 10,
        paddingRight:10
    }
    
  });