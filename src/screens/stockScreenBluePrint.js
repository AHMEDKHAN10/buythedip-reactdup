// import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import firebaseuser from '../firebase/firebaseconfig'
import config from '../../config'

import {
  StyleSheet,
  SafeAreaView,
  View, Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
// import { AntDesign } from '@expo/vector-icons'
// import Switch from 'react-native-switch-pro'
// import PushNotification from '../services/pushNotification'
import registerForPushNotificationsAsync from '../services/pushNotification'
import AppLoading from 'expo-app-loading'
// eslint-disable-next-line camelcase
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato'
// import { Input } from 'antd'
const backButton = require('../../assets/backButton.png')
const backButtonDark = require('../../assets/backButtonDark.png')

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, //* play sound for notification
    shouldSetBadge: false
  })
})

// eslint-disable-next-line react/prop-types
function stockScreenBluePrint ({ route }) {
  const [isEnabled, setIsEnabled] = useState(false)
  const navigation = useNavigation()
  const [keyBoard, setkeyBoard] = useState(false)
  // eslint-disable-next-line react/prop-types
  const { otherParam, price, trigger } = route.params
  const [textInput, setTextInput] = useState(trigger)
  // eslint-disable-next-line no-unused-vars
  const [expoPushToken, setExpoPushToken] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  const deleteStock = async () => {
    const userid = await firebaseuser()
    const request = JSON.stringify({
      userid: userid,
      stockName: otherParam
    })
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: request
    }
    try {
      const response = await fetch(config.API_URL + 'delData', options)
      console.log('deleting ..... ')
      const json = await response.json()
      console.log(json)
      navigation.navigate('Home')
    } catch (e) {
      console.error(e)
    }
  }
  const updateStock = async () => {
    const userid = await firebaseuser()
    navigation.navigate('Home')

    const request = JSON.stringify({
      userid: userid,
      trigger: textInput,
      stockName: otherParam,
      price: price,
      GeneralTenPercentDipNotify: isEnabled,
      TriggerPriceTenPercentDipNotify: null
    })
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: request
    }
    await fetch(config.API_URL + 'getTrigger', options)
  }

  useEffect(() => {
    // console.log('array: ' + array)
    const token = registerForPushNotificationsAsync()
    setExpoPushToken(token)
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide)

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide)
    }
  }, [])

  const _keyboardDidShow = () => {
    setkeyBoard(true)
    // alert('Keyboard Shown');
  }

  const _keyboardDidHide = () => {
    setkeyBoard(false)
    // alert('Keyboard Hidden');
  }

  async function schedulePushNotification () {
    await Notifications.scheduleNotificationAsync({
      content: {
        sound: 'default',
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' }
        // ios: { sound: true },
      },
      trigger: { seconds: 1 }
    })
  }

  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState)
    console.log('toggle switch')
    console.log('isenabled: ' + isEnabled)
    if (!isEnabled) {
      console.log('enabled')
      schedulePushNotification()
    } else {
      console.log('not enabled')
    }
  }

  function renderHeader () {
    // {colors.background === '#000000' ? backButton : backButtonDark}
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 10 }}>
        {/* <AntDesign name="arrowleft" size={24} color= {colors.text}
          onPress={() => {
            navigation.navigate('Home')
          }}
          style={{ paddingTop: 10, paddingLeft: 24, width: '40%' }}/> */}
          <View style={{ width: '40%', paddingLeft: 24, paddingTop: 15 }}>
          <TouchableOpacity onPress={ () => {
            const stock = 'Lookup a stock'
            const pricing = 'Prices updated at market close'
            const triggerr = 'Add'
            navigation.navigate('Home', {
              otherParam: stock,
              price: pricing,
              trigger: triggerr
            })
            navigation.navigate('Home')
          }
          }>
          <Image
            source = { colors.background === '#000000' ? backButtonDark : backButton}
            style={{ paddingLeft: 34, height: 16, width: 16 }}
          />
          </TouchableOpacity>
          </View>
        <Text style={{ padding: 10, textAlign: 'left', width: '60%', fontSize: 20 }}>
          <View style={{ width: '60%' }}>
            <Text style={{ fontSize: 17, marginLeft: '25%', color: colors.text, fontFamily: 'Lato_700Bold' }}>{otherParam}</Text>
            <Text style={{ marginTop: 4, fontSize: 12, color: '#6a6e70', fontWeight: '500', fontFamily: 'Lato_400Regular' }}>Last closed ${price}</Text>
          </View>
        </Text>
      </View>
    )
  }

  function StalkPriceHeader () {
    return (
      <View style={{ flex: 2, padding: 10, width: (Dimensions.get('window').width) }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30, lineHeight: 55, color: '#ec5d29', fontFamily: 'Lato_700Bold' }}>$</Text>
          <TextInput
            value={textInput}
            keyboardType = 'numeric'
            onChangeText = {
              (value) => setTextInput(value)
            }
            onEndEditing= {() => console.log(textInput)}
            style={{ fontSize: 80, lineHeight: 90, color: '#ec5d29', fontFamily: 'Lato_400Regular' }}></TextInput>
        </View>
        <Text style={{ fontWeight: '400', letterSpacing: 1, textAlign: 'center', color: '#ec5d29', fontFamily: 'Lato_400Regular' }}>Price alert for {otherParam}</Text>
      </View>
    )
  }

  function enableNotification () {
    return (
      <View style={{ flex: keyBoard ? 1.3 : 0.7, width: (Dimensions.get('window').width), height: 50 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 0, paddingRight: 0, paddingTop: 20, borderTopWidth: 0.25, borderTopColor: '#b2b2b2', marginLeft: '5%', marginRight: '5%' }}>
          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 15, color: colors.text, fontFamily: 'Lato_400Regular' }}>Price Alerts</Text>
            <Text style={{ marginTop: 4, fontSize: 13, color: '#6a6e70', fontFamily: 'Lato_400Regular' }}>Send 10% dip notification</Text>
          </View>
          <ToggleSwitch
              isOn={isEnabled}
              onColor="#04D700"
              offColor="#C4C4C4"
              size= 'large'
              onToggle={async () => await toggleSwitch()}
            />
        </View>
        <View style={{ marginTop: 20, flexDirection: 'row', width: '100%', height: 60, marginLeft: '0%', justifyContent: 'center' }}>
          {keyBoard
            ? <TouchableHighlight style={[styles.ButtonUpdateStock, { backgroundColor: colors.text }]} onPress={updateStock} underlayColor='#fff'>
                <Text style={[styles.ButtonAddStockText, { color: colors.background, fontFamily: 'Lato_700Bold', lineHeight: 24 }]}>Update</Text>
              </TouchableHighlight>
            : <TouchableHighlight style={[styles.ButtonAddStock, { backgroundColor: colors.card }]} onPress={deleteStock} underlayColor='#fff'>
                <Text style={[styles.ButtonAddStockText, { color: colors.text, fontFamily: 'Lato_700Bold', lineHeight: 24 }]}>Delete</Text>
              </TouchableHighlight>
          }
        </View>
      </View>
    )
  }
  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.inner} >
              {renderHeader()}
              {StalkPriceHeader()}
              {enableNotification()}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

export default stockScreenBluePrint

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
    backgroundColor: '#000',
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
  },
  ButtonAddStock: {
    width: '90%',
    backgroundColor: '#fff',
    height: 58,
    borderRadius: 40,
    justifyContent: 'center',
    borderWidth: 1
    // borderColor: '#2b3033'
  },
  ButtonUpdateStock: {
    width: '100%',
    backgroundColor: '#fff',
    height: 58,
    // borderRadius: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2b3033'
  },
  ButtonAddStockText: {
    color: '#2b3033',
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
})
