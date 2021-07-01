/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import config from '../../config'
import {
  StyleSheet,
  SafeAreaView,
  View, Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard
} from 'react-native'
import * as Notifications from 'expo-notifications'
import Switch from 'react-native-switch-pro'
import { Button, Modal } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'
import firebaseuser from '../firebase/firebaseconfig'
import registerForPushNotificationsAsync from '../services/pushNotification'
import LottieView from 'lottie-react-native'
// eslint-disable-next-line camelcase
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato'
import AppLoading from 'expo-app-loading'
// eslint-disable-next-line react/prop-types
function SetAlert ({ route }) {
  const navigation = useNavigation()
  // eslint-disable-next-line react/prop-types
  const { stockName, price } = route.params
  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line no-unused-vars
  const [isEnabled, setIsEnabled] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [expoPushToken, setExpoPushToken] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState(false)
  const [modal, setModal] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()
  // const animationRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const { height, width } = Dimensions.get('window')
  const [textInput, setTextInput] = useState('')
  const { colors } = useTheme()

  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  useEffect(() => {
    console.log(price)
    setTextInput(String(Math.round(price - (price * 0.1))))
    const token = registerForPushNotificationsAsync()
    setExpoPushToken(token)
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

  const checkTextInput = async () => {
    //* Check for the Name TextInput
    // if (!textInput.trim()) {
    //   alert('Please Enter details')
    //   return
    // }
    const userid = await firebaseuser()
    navigation.navigate('Home')

    const request = JSON.stringify({
      userid: userid,
      trigger: textInput,
      stockName: stockName,
      price: price
    })
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: request
    }
    const response = await fetch(config.API_URL + 'getTrigger', options)
    // eslint-disable-next-line no-unused-vars
    const json = await response.json()
  }

  function renderHeader (navigation) {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 10,
        marginTop: (Platform.OS === 'ios') ? 0 : 35
      }}>
        <AntDesign name="close" size={24} color="black"
          onPress={() => {
            const stock = 'Lookup a stock'
            const pricing = 'Prices updated at market close'
            const triggerr = 'Add'
            navigation.navigate('Home', {
              otherParam: stock,
              price: pricing,
              trigger: triggerr
            })
            navigation.navigate('Home')
          }}
          style={{ paddingTop: 10, paddingLeft: 35, width: '40%', color: colors.text }}/>
        <Text style={{ padding: 10, textAlign: 'left', width: '60%', fontSize: 20 }}>
            <Text style={{ fontWeight: '400', color: colors.text, fontFamily: 'Lato_700Bold' }}>Set Alert</Text>
        </Text>
      </View>
    )
  }
  function StalkPriceHeader () {
    const val = (Math.round(price - (price * 0.1))).toString()
    return (
      <View style={{ flex: 2, padding: 10, width: (Dimensions.get('window').width) }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30, lineHeight: 55, color: '#ec5d29', fontFamily: 'Lato_700Bold' }}>$</Text>
          <TextInput
            value = {textInput}
            keyboardType = 'numeric'
            onChangeText = {
              (value) => setTextInput(value)
            }
            style={{ fontSize: 80, lineHeight: 90, color: '#ec5d29', fontFamily: 'Lato_400Regular' }}>
            {/* {String(Math.round(price - (price * 0.1)))} */}
          </TextInput>
        </View>
        <Text style={{ fontWeight: '400', letterSpacing: 2, textAlign: 'center', color: '#ec5d29', fontFamily: 'Lato_400Regular' }}>Target Price for {stockName}</Text>
      </View>
    )
  }

  function enableNotification () {
    // const toggleSwitch = async () => {
    //   setIsEnabled(previousState => !previousState)
    //   console.log('toggle switch')
    //   console.log('isenabled: ' + isEnabled)
    //   if (!isEnabled) {
    //     console.log('enabled')
    //   } else {
    //     console.log('not enabled')
    //   }
    // }
    return (
      <View style={{ flex: 1, width: (Dimensions.get('window').width), height: 50 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 25, borderTopWidth: 0.25, borderTopColor: '#b2b2b2', marginLeft: '5%', marginRight: '5%' }}>
          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 17, color: colors.text, fontFamily: 'Lato_400Regular' }}>Price Alerts</Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: '#6a6e70', fontWeight: '400', fontFamily: 'Lato_400Regular' }}>Send 10% dip notification</Text>
          </View>
          <Switch
            width={57}
            height={30}
            circleColorInactive='#f1f1f1'
            backgroundInactive={colors.background}
            value = {isEnabled}
            style={{
              borderColor: colors.text,
              borderWidth: 0.5,
              padding: 2
            }}
            circleStyle={{
              width: 25,
              height: 25,
              borderWidth: 0.5,
              borderColor: '#fff'
            }}
            onSyncPress={async () => {
              // await toggleSwitch()
              const { status } = await Notifications.getPermissionsAsync()
              if (status !== 'granted') {
                setModal(true)
              } else {
                console.log('Already allowed')
              }
            }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
          <TouchableHighlight style={[styles.Button, { backgroundColor: colors.notification }]}
            onPress={checkTextInput }
            underlayColor='#f18d69'>
            <Text style={[styles.ButtonText, { fontFamily: 'Lato_400Regular' }]}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              {renderHeader(navigation)}
              {StalkPriceHeader()}
              {enableNotification()}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <Modal
            // style={{position:"absolute",width:width,height:width/1.2,backgroundColor:"#fff",bottom:0,borderRadius:50,alignItems:"center"}}
            visible={modal}
            contentContainerStyle={{ position: 'absolute', bottom: 0 }}
            onDismiss={ () => setModal(false)}
          >
            <View style={{ paddingBottom: 20, backgroundColor: '#fff', borderRadius: 50 }}><LottieView
              style={{ height: width, width: width, marginTop: -width / 3, marginBottom: -width / 2 }}
              source={require('../../assets/lottie_assets/Bell_new_shadow.json')}
              autoPlay
            />
              <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }} > Don't miss out </Text>
              <Text style={{ fontSize: 15, textAlign: 'center' }} > Don't risk miss another oppertunity, we'll send you a  reminder when a dip occurs</Text>

              <Button style={{ width: '80%', borderRadius: 30, padding: 10, marginTop: 10, borderWidth: 1, borderColor: '#000', alignSelf: 'center' }} labelStyle={{ fontWeight: 'bold', color: '#000' }}
                onPress={async () => {
                  await Permissions.getAsync(Permissions.NOTIFICATIONS)
                }}
              >
                Allow Notifications
              </Button>
              <Button style={{ backgroundColor: '#eeefef', width: '80%', borderRadius: 30, padding: 10, marginTop: 10, alignSelf: 'center' }} labelStyle={{ color: 'gray' }}
                onPress={ async () => {
                  setModal(false)
                }}
              >
                Maybe Later
              </Button>
              </View>
         </Modal>
      </SafeAreaView>
    )
  }
}

export default SetAlert
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around'
  },
  Button: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  ButtonText: {
    color: '#ffe6d2',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20
  }
})
