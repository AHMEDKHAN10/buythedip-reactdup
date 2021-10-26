/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useRef, useContext } from 'react'
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
  Keyboard,
  Image
} from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import * as Notifications from 'expo-notifications'
import { Button, Modal } from 'react-native-paper'
import firebaseuser from '../firebase/firebaseconfig'
import registerForPushNotificationsAsync from '../services/pushNotification'
import LottieView from 'lottie-react-native'
// eslint-disable-next-line camelcase
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato'
import AppLoading from 'expo-app-loading'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Context } from '../context/context'
// import { Context } from '../context/context'
const backButton = require('../../assets/backButton.png')
const backButtonDark = require('../../assets/backButtonDark.png')

function SetAlert ({ route }) {
  const [keyBoard, setkeyBoard] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('')
  const [textInput, setTextInput] = useState('')
  const [notification, setNotification] = useState(false)
  const [modal, setModal] = useState(false)

  const notificationListener = useRef()
  const responseListener = useRef()

  const navigation = useNavigation()
  const { stockName, price } = route.params

  const { width } = Dimensions.get('window')
  const { colors } = useTheme()

  const { setIsNewlyAdded } = useContext(Context)
  // const [isSubscribed, setIsSubscribed] = useContext(Context)
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })

  useEffect(() => {
    setTextInput(String(Math.round(price - (price * 0.1))))
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token)
    })
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide)

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)
      Notifications.removeNotificationSubscription(responseListener)
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide)
    }
  }, [isEnabled])

  const _keyboardDidShow = () => {
    setkeyBoard(true)
  }

  const _keyboardDidHide = () => {
    setkeyBoard(false)
  }
  const checkTextInput = async () => {
    const userid = await firebaseuser()
    navigation.navigate('Home')
    setIsNewlyAdded(true)
    const request = JSON.stringify({
      userid: userid,
      trigger: textInput,
      stockName: stockName,
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
    const response = await fetch(config.API_URL + 'getTrigger', options)
    // eslint-disable-next-line no-unused-vars
    const json = await response.json()
    // storeToken()
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
        <View style={{ width: '40%', paddingLeft: 24, paddingTop: 15 }}>
          <TouchableOpacity onPress={() => {
            const stock = 'Lookup a stock'
            const pricing = 'Prices updated at market close'
            const triggerr = 'Add'
            navigation.navigate('Home', {
              otherParam: stock,
              price: pricing,
              trigger: triggerr
            })
            // navigation.navigate('Home')
          }
          }>
            <Image
              source={ colors.background === '#000000' ? backButtonDark : backButton }
              style={{ paddingLeft: 34, height: 16, width: 16 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ padding: 10, textAlign: 'left', width: '60%', fontSize: 20 }}>
          <Text style={{ color: colors.text, fontFamily: 'Lato_700Bold' }}>Set Alert</Text>
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
            keyboardType='numeric'
            onChangeText={
              (value) => setTextInput(value)
            }
            style={{ fontSize: 80, lineHeight: 90, color: '#ec5d29', fontFamily: 'Lato_400Regular' }}>
          </TextInput>
        </View>
        <Text style={{ fontWeight: '400', letterSpacing: 2, textAlign: 'center', color: '#ec5d29', fontFamily: 'Lato_400Regular' }}>Price alert for {stockName}</Text>
      </View>
    )
  }

  function enableNotification () {
    return (
      <View style={{ flex: keyBoard ? 1.3 : 0.7, width: (Dimensions.get('window').width), height: 50, alignSelf: 'flex-end' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 0, paddingRight: 0, paddingTop: 25, borderTopWidth: 0.25, borderTopColor: '#b2b2b2', marginLeft: '5%', marginRight: '5%' }}>
          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 15, color: colors.text, fontFamily: 'Lato_400Regular' }}>Price Alerts</Text>
            <Text style={{ marginTop: 4, fontSize: 13, color: '#6a6e70', fontWeight: '400', fontFamily: 'Lato_400Regular' }}>Send 10% dip notification</Text>
          </View>
          <ToggleSwitch
            isOn={isEnabled}
            onColor="#04D700"
            offColor="#C4C4C4"
            size='large'
            onToggle={() => setIsEnabled(previousState => !previousState)}
          />
        </View>
        <View style={{ marginTop: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
          <TouchableHighlight style={[styles.Button, { backgroundColor: colors.notification }]}
            onPress={checkTextInput}
            underlayColor='#f18d69'>
            <Text style={[styles.ButtonText, { fontFamily: 'Lato_400Regular' }]}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
  if (!fontsLoaded) {
    return <AppLoading />
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
          // style={{ position: 'absolute', width: width, height: (width / 1.2), backgroundColor: '#fff', bottom: 0, borderRadius: 50, alignItems: 'center' }}
          // style={{height: 400, bottom: 0 }}
          visible={modal}
          contentContainerStyle={{ position: 'absolute', bottom: -30 }}
          onDismiss={() => setModal(false)}
        >
          <View style={{ paddingBottom: 20, backgroundColor: '#fff', borderRadius: 50, height: 400 }}>
            <LottieView
              style={{ height: width, width: width, marginTop: -80, marginBottom: -width / 2 }}
              source={require('../../assets/lottie_assets/Bell_new_shadow.json')}
              autoPlay
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', fontFamily: 'Lato_700Bold', letterSpacing: 2 }} > Don't miss out 🚀</Text>
            <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10, letterSpacing: 0.5 }} > Don't risk miss another oppertunity, we'll send you a  reminder when a dip occurs</Text>

            <Button style={{ width: '80%', borderRadius: 30, padding: 10, marginTop: 30, borderWidth: 1, borderColor: '#000', alignSelf: 'center' }}
              labelStyle={{ fontWeight: 'bold', color: '#000', fontFamily: 'Lato_700Bold' }}
              onPress={async () => {
                // await Permissions.getAsync(Permissions.NOTIFICATIONS)
                const { status: existingStatus } = await Notifications.getPermissionsAsync()
                let finalStatus = existingStatus
                if (existingStatus !== 'granted') {
                  const { status } = await Notifications.requestPermissionsAsync()
                  finalStatus = status
                }
                if (finalStatus !== 'granted') {
                  alert('Failed to get push token for push notification!')
                  setIsEnabled(false)
                  setModal(false)
                  // return
                } else {
                  setIsEnabled(true)
                  setModal(false)
                }
              }}
            >
              Allow Notifications
            </Button>
            <Button style={{ backgroundColor: '#eeefef', width: '80%', borderRadius: 30, padding: 10, marginTop: 10, alignSelf: 'center' }}
              labelStyle={{ color: 'gray' }}
              onPress={async () => {
                setModal(false)
                setIsEnabled(false)
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
