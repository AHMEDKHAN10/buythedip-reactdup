import React, { useEffect, useState } from 'react'
import Routes from './src/routes'
import SplashScreen from './src/screens/SplashScreen'

export default function App () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handle = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(handle)
  }, [])

  return loading ? <SplashScreen /> : <Routes />
}
