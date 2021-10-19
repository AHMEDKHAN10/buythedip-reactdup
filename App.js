import React, { useEffect, useState } from 'react'
import Routes from './src/routes'
import SplashScreen from './src/screens/SplashScreen'
import 'react-native-gesture-handler'
import StateProvider from './src/context/context'

export default function App () {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const handle = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(handle)
  }, [])

  return (
    <StateProvider>
      { loading ? <SplashScreen /> : <Routes /> }
    </StateProvider>
  )
}
