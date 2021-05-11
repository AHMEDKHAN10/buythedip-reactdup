import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, //* play sound for notification
    shouldSetBadge: false
  })
})

// eslint-disable-next-line react/prop-types
function SetAlert ({ route }) {
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

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token)
    })

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

  async function registerForPushNotificationsAsync () {
    let token
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
      console.log('token' + token)
    } else {
      alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }
    return token
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
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 10 }}>
        <AntDesign name="arrowleft" size={24} color="black"
          onPress={() => {
            navigation.navigate('Home')
          }}
          style={{ paddingTop: 10, paddingLeft: 35, width: '40%' }}/>
        <Text style={{ padding: 10, textAlign: 'left', width: '60%', fontSize: 20 }}>
          <View style={{ width: '60%' }}>
            <Text style={{ fontSize: 17, fontWeight: '400', marginLeft: '25%' }}>{otherParam}</Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: '#6a6e70', fontWeight: '500' }}>Last closed {price}</Text>
          </View>
        </Text>
      </View>
    )
  }
  function StalkPriceHeader () {
    return (
      <View style={{ flex: 2, padding: 10, width: (Dimensions.get('window').width) }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30, lineHeight: 55, color: '#ec5d29' }}>$</Text>
          <Text style={{ fontSize: 80, lineHeight: 90, color: '#ec5d29' }}>{trigger}</Text>
        </View>
        <Text style={{ fontWeight: '400', letterSpacing: 1, textAlign: 'center', color: '#ec5d29' }}>Target Stock Price</Text>
      </View>
    )
  }
  function enableNotification () {
    return (
      <View style={{ flex: 1, width: (Dimensions.get('window').width), height: 50 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 25, borderTopWidth: 1, borderTopColor: '#e2e3e4', marginLeft: '5%', marginRight: '5%' }}>
          <View style={{ width: '90%' }}>
            <Text style={{ fontSize: 17 }}>Price Alerts</Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: '#6a6e70', fontWeight: '400' }}>Send 10% dip notification</Text>
          </View>
          <Switch
            width= {57}
            height={30}
            circleColorInactive='#f1f1f1'
            backgroundInactive='#fff'
            value = {isEnabled}
            style={{
              borderColor: '#000',
              borderWidth: 0.5,
              padding: 2
            }}
            circleStyle={{
              width: 25,
              height: 25,
              borderWidth: 0.5,
              borderColor: '#000'
            }}
            onSyncPress={async () => {
              await toggleSwitch()
            }}
          />
        </View>
        <View style={{ marginTop: 40, flexDirection: 'row', width: '100%', height: 60, marginLeft: '0%', justifyContent: 'center' }}>
          <TouchableHighlight style={styles.ButtonAddStock} onPress={() => navigation.navigate('FirstScreen')} underlayColor='#fff'>
              <Text style={styles.ButtonAddStockText}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
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
