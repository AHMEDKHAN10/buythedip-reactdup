import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
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
import { AntDesign } from '@expo/vector-icons'
import firebaseuser from '../firebase/firebaseconfig'
import registerForPushNotificationsAsync from '../services/pushNotification'

// eslint-disable-next-line react/prop-types
function SetAlert ({ route }) {
  const navigation = useNavigation()
  // eslint-disable-next-line react/prop-types
  const { stockName, price } = route.params
  // eslint-disable-next-line react/prop-types
  const [isEnabled, setIsEnabled] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [expoPushToken, setExpoPushToken] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    console.log(price)
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

  const [textInput, setTextInput] = useState('')

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
          style={{ paddingTop: 10, paddingLeft: 35, width: '40%' }}/>
        <Text style={{ padding: 10, textAlign: 'left', width: '60%', fontSize: 20 }}>
            <Text style={{ fontWeight: '400' }}>Set Alert</Text>
        </Text>
      </View>
    )
  }
  function StalkPriceHeader () {
    return (
      <View style={{ flex: 2, padding: 10, width: (Dimensions.get('window').width) }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30, lineHeight: 55, color: '#ec5d29' }}>$</Text>
          <TextInput
            value = {String(Math.round(price - (price * 0.1)))}
            keyboardType = 'numeric'
            onChangeText = {
              (value) => setTextInput(value)
            }
            style={{ fontSize: 80, lineHeight: 90, color: '#ec5d29' }}>
            {String(Math.round(price - (price * 0.1)))}
          </TextInput>
        </View>
        <Text style={{ fontWeight: '400', letterSpacing: 2, textAlign: 'center', color: '#ec5d29' }}>Target Price for {stockName}</Text>
      </View>
    )
  }

  function enableNotification () {
    const toggleSwitch = async () => {
      setIsEnabled(previousState => !previousState)
      console.log('toggle switch')
      console.log('isenabled: ' + isEnabled)
      if (!isEnabled) {
        console.log('enabled')
      } else {
        console.log('not enabled')
      }
    }
    return (
      <View style={{ flex: 1, width: (Dimensions.get('window').width), height: 50 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
          <View style={{ width: '80%' }}>
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
            onSyncPress={ async () => {
              await toggleSwitch()
            }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
          <TouchableHighlight style={styles.Button}
            onPress={checkTextInput }
            underlayColor='#fff'>
            <Text style={styles.ButtonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
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
  }
})
