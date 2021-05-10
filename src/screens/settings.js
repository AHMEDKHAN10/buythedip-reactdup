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
import * as LocalAuthentication from 'expo-local-authentication'
import * as FaceDetector from 'expo-face-detector'
import { Camera } from 'expo-camera';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import KeyboardListener from 'react-native-keyboard-listener'
import { AntDesign } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import Switch from 'react-native-switch-pro'

function renderHeader(navigation){
  return(
    <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', width:'100%', height: 10}}>
      {/* <FontAwesomeIcon icon={ faLongArrowAltLeft } size={ 30 } style={{ marginTop: 5, paddingLeft:'15%'}} /> */}
      <AntDesign name="arrowleft" size={24} color="black" 
        onPress={()=> {
            navigation.navigate('Home')
          }
        } 
        style={{ paddingTop:10, paddingLeft:35, width: '40%'}}/>          
      <Text style={{padding: 10, textAlign:'left', width: '60%', fontSize:20}}>
        <Text style={{fontWeight:'400'}}>Settings</Text>
      </Text>
    </View>
  )
}



function Content2(){
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([])

  const faceDetected = ({faces}) => {
    setFaces({faces})
    console.log('faces: ' + {faces})
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])
  
  const faceDetector = () => {
    console.log('in face detector')
    return(
        <Camera
        style={{ flex: 1 }}
        type='front'
        // ... other props
        onFacesDetected={faceDetected}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.none,
          runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <Text style= {{top:200}}> is {faces} </Text>
        </View>
      </Camera>
      
      )
  }

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
    // if(LocalAuthentication.hasHardwareAsync()){
    //   console.log('has auth')
    //   // let types = LocalAuthentication.supportedAuthenticationTypesAsync()
    //   // console.log("Types: " + JSON.stringify(types))
    //   // if (hasPermission !== true) {
    //   //   return <Text>No access to camera</Text>
    //   // }
    //   faceDetector()
    //   // console.log("type: ", LocalAuthentication.supportedAuthenticationTypesAsync())
    //   // if(LocalAuthentication.supportedAuthenticationTypesAsync()){
    //   //   console.log('facial recognition')
    //   // }
    //   // return LocalAuthentication.supportedAuthenticationTypesAsync()
    // }
    // console.log("Auth: ",LocalAuthentication.hasHardwareAsync())
    
  }

  return(
    <View style={{flex:8, width:(Dimensions.get('window').width - (0.1*(Dimensions.get('window').width))), height:50}}>
      {/* <Ionicons name="settings-outline" size={24} color="black" style={{padding: 10}}/> */}
      <View  style={{marginTop:10,flexDirection:'row' ,width: '100%', height: 60, marginLeft:'0%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}>
        <View style={{width:'80%'}}>
          <Text style={{fontSize:17}}>Face ID</Text>
        </View>
        
        <Switch
          width= {57}
          height={30}
          circleColorInactive='#f1f1f1'
          backgroundInactive='#fff'
          value = {isEnabled}
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
          onSyncPress = {async () => {
            await toggleSwitch()
            
            // console.log("isenabled: " + isEnabled)
            //faceDetection()
          }}
        />
      
      </View>
      <View  style={{marginTop:40,flexDirection:'row' ,width: '100%', height: 60, marginLeft:'0%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}>
        <View style={{width:'80%'}}>
          <Text style={{fontSize:17}}>Manage Notifications</Text>
        </View>
        <AntDesign name="right" size={24} color="black" style={{width: '20%', justifyContent: 'center', marginLeft:'10%'}}/> 
      </View>
      <View  style={{marginTop:40,flexDirection:'row' ,width: '100%', height: 60, marginLeft:'0%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}>
        <View style={{width:'80%'}}>
          <Text style={{fontSize:17}}>Feature Request & Report Bugs</Text>
        </View>
        <AntDesign name="right" size={24} color="black" style={{width: '20%', justifyContent: 'center', marginLeft:'10%'}}/> 
      </View>
      <View  style={{marginTop:40, flexDirection:'row' ,width: '100%', height: 60, marginLeft:'0%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}>
        <View style={{width:'80%'}}>
          <Text style={{fontSize:17}}>Restore subscription</Text>
        </View>
        <AntDesign name="right" size={24} color="black" style={{width: '20%', justifyContent: 'center', marginLeft:'10%'}}/> 
      </View>
      <View style={{marginTop:40, flexDirection:'row' ,width: '100%', height: 60, marginLeft:'0%' , justifyContent:'center'}}>
        <TouchableHighlight  style={styles.ButtonAddStock} onPress={()=> navigation.navigate("FirstScreen")} underlayColor='#fff'>
          <Text style={styles.ButtonAddStockText}>Share with friends</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

function settings() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
    
    {renderHeader(navigation)}
    {Content2()}
    </SafeAreaView>
  )
}

export default settings

const styles = StyleSheet.create({
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
})