import React, { useEffect, useState } from 'react'
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
// import { EventRegister } from 'react-native-event-listeners'

const Stack = createStackNavigator()

export default function Routes () {
  const [route, setroute] = useState(faClosedCaptioning)
  // const [darkMode, setDarkMode] = useState(false)
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
  }, [])

  return (
    <Stack.Navigator initialRouteName={route ? 'Home' : 'FirstScreen'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="AddStockScreen" component={AddStockScreen} />
      <Stack.Screen name="AddStock" component={AddStock} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SetAlert" component={SetAlert} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="CommunityGroup" component={CommuinityGroup} />
      <Stack.Screen name="StockScreenBluePrint" component={StockScreen} />
    </Stack.Navigator>
  )
}
// options={{ headerLeft: null}}
