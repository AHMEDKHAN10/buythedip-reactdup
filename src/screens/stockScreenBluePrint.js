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
  Keyboard
} from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import Switch from 'react-native-switch-pro'
// import PushNotification from '../services/pushNotification'
import registerForPushNotificationsAsync from '../services/pushNotification'
import AppLoading from 'expo-app-loading'
// eslint-disable-next-line camelcase
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato'

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
  // eslint-disable-next-line react/prop-types
  const { otherParam, price, trigger } = route.params
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

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

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
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 10 }}>
        <AntDesign name="arrowleft" size={24} color= {colors.text}
          onPress={() => {
            navigation.navigate('Home')
          }}
          style={{ paddingTop: 10, paddingLeft: 35, width: '40%' }}/>
        <Text style={{ padding: 10, textAlign: 'left', width: '60%', fontSize: 20 }}>
          <View style={{ width: '60%' }}>
            <Text style={{ fontSize: 17, fontWeight: '400', marginLeft: '25%', color: colors.text, fontFamily: 'Lato_700Bold' }}>{otherParam}</Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: '#6a6e70', fontWeight: '500', fontFamily: 'Lato_400Regular' }}>Last closed {price}</Text>
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
          <Text style={{ fontSize: 80, lineHeight: 90, color: '#ec5d29', fontFamily: 'Lato_400Regular' }}>{trigger}</Text>
        </View>
        <Text style={{ fontWeight: '400', letterSpacing: 1, textAlign: 'center', color: '#ec5d29', fontFamily: 'Lato_400Regular' }}>Price alert for {otherParam}</Text>
      </View>
    )
  }

  function enableNotification () {
    return (
      <View style={{ flex: 1, width: (Dimensions.get('window').width), height: 50 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 25, borderTopWidth: 0.25, borderTopColor: '#b2b2b2', marginLeft: '5%', marginRight: '5%' }}>
          <View style={{ width: '90%' }}>
            <Text style={{ fontSize: 17, color: colors.text, fontFamily: 'Lato_400Regular' }}>Price Alerts</Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: '#6a6e70', fontWeight: '400', fontFamily: 'Lato_400Regular' }}>Send 10% dip notification</Text>
          </View>
          <Switch
            width= {57}
            height={30}
            circleColorInactive='#f1f1f1'
            backgroundInactive= {colors.background}
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
              borderColor: colors.text
            }}
            onSyncPress={async () => {
              await toggleSwitch()
            }}
          />
        </View>
        <View style={{ marginTop: 40, flexDirection: 'row', width: '100%', height: 60, marginLeft: '0%', justifyContent: 'center' }}>
          <TouchableHighlight style={[styles.ButtonAddStock, { backgroundColor: colors.text }]} onPress={deleteStock} underlayColor='#fff'>
              <Text style={[styles.ButtonAddStockText, { color: colors.background, fontFamily: 'Lato_400Regular' }]}>Delete</Text>
          </TouchableHighlight>
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
            <View style={styles.inner}>
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
    width: '85%',
    backgroundColor: '#fff',
    height: 58,
    borderRadius: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2b3033'
  },
  ButtonAddStockText: {
    color: '#2b3033',
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
})
