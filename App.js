import React, { useEffect, useState } from 'react'
import Routes from './src/routes'
import SplashScreen from './src/screens/SplashScreen'
import 'react-native-gesture-handler'
import StateProvider from './src/context/context'
import StateProviderModal from './src/context/modalContext'
import { NavigationContainer } from '@react-navigation/native'

export default function App () {
  const [loading, setLoading] = useState(true)
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
  // const appTheme = darkApp ? MyDarkTheme : MyTheme
  const appTheme = MyTheme
  useEffect(() => {
    const today = new Date()
    const time = today.getHours() + ':' + today.getMinutes()
    if (time >= '18:25' && time <= '6:55') {
      setDarkApp(true)
    } else {
      setDarkApp(false)
    }
    const handle = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(handle)
  }, [])

  return (
    <StateProvider>
      <StateProviderModal>
      <NavigationContainer theme={appTheme}>
      { loading ? <SplashScreen /> : <Routes /> }
      </NavigationContainer>
      </StateProviderModal>
    </StateProvider>
  )
}
