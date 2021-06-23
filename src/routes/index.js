import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'
import Home from '../screens/Home'
import FirstScreen from '../screens/FirstScreen'
import SetAlert from '../screens/SetAlert'
import Settings from '../screens/settings'
import StockScreen from '../screens/stockScreenBluePrint'
import firebaseuser from '../firebase/firebaseconfig'
import configg from '../../config'
import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons'

const Stack = createStackNavigator()

export default function Routes () {
  const [route, setroute] = useState(faClosedCaptioning)

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
    // console.log('route: ' + route)
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ route ? 'Home' : 'FirstScreen'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SetAlert" component= { SetAlert } />
        <Stack.Screen name="Settings" component= { Settings } />
        <Stack.Screen name="StockScreenBluePrint" component={StockScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
// options={{ headerLeft: null}}
