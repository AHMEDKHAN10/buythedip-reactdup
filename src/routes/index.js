import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'
import Home from '../screens/Home'
import FirstScreen from '../screens/FirstScreen'
import SetAlert from '../screens/SetAlert'
import Settings from '../screens/settings'
import StockScreen from '../screens/stockScreenBluePrint'
import AddStock from '../screens/AddStock'
import AddStockScreen from '../screens/AddStockScreen'
import CommuinityGroup from '../screens/reuseable/commuinityGroups'
import firebaseuser from '../firebase/firebaseconfig'
import configg from '../../config'
import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons'
import { EventRegister } from 'react-native-event-listeners'
import SplashScreen from '../screens/SplashScreen'

const Stack = createStackNavigator()

export default function Routes () {
  const [route, setroute] = useState(faClosedCaptioning)
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    async function check () {
      const userid = await firebaseuser()
      const request = JSON.stringify({
        userid: userid
      })
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: request
      }
      const response = await fetch(configg.API_URL + 'getData', options)
      const json = await response.json()
      if (json.data.length !== 0) {
        setroute(true)
        return
      }
      setroute(false)
    }
    check()
    const today = new Date()
    const time = today.getHours() + ':' + today.getMinutes()
    // console.log('isSubscribed: ' + isSubscribed)
    if (time >= '18:25' && time <= '6:55') {
      setDarkApp(true)
      // EventRegister.emit('themeListener', true)
    } else {
      setDarkApp(false)
      // EventRegister.emit('themeListener', false)
    }
    // const eventListener = EventRegister.addEventListener(
    //   'themeListener',
    //   data => {
    //     setDarkApp(data)
    //   }
    // )
    return () => {
      // EventRegister.removeEventListener(eventListener)
    }
    // console.log('route: ' + route)
  }, [])
  const MyDarkTheme = {
    dark: true,
    colors: {
      primary: '#ffffff',
      background: '#000000',
      card: '#1C1C1D',
      text: '#ffffff',
      border: '#000000',
      notification: '#EC5D29'
    }
  }
  const MyTheme = {
    dark: false,
    colors: {
      primary: '#2B3033',
      background: '#ffffff',
      card: '#ffffff',
      text: '#2B3033',
      border: '#FFE6D1',
      notification: '#000000'
    }
  }

  const [darkApp, setDarkApp] = useState(false)
  const appTheme = darkApp ? MyDarkTheme : MyTheme
  return (
    // <NavigationContainer theme={appTheme}>
      <Stack.Navigator initialRouteName={route ? 'Home' : 'FirstScreen'} screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="AddStockScreen" component={AddStockScreen} />
        <Stack.Screen name="AddStock" component={AddStock} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SetAlert" component={SetAlert} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="CommunityGroup" component={CommuinityGroup} />
        <Stack.Screen name="StockScreenBluePrint" component={StockScreen} />
      </Stack.Navigator>
    // </NavigationContainer>
  )
}
// options={{ headerLeft: null}}
