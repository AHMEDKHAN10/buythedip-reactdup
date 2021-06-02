import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'
import Home from '../screens/Home'
import FirstScreen from '../screens/FirstScreen'
import SetAlert from '../screens/SetAlert'
import Settings from '../screens/settings'
import StockScreen from '../screens/stockScreenBluePrint'

const Stack = createStackNavigator()

export default function Routes () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen" screenOptions={{ headerShown: false }}>
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
