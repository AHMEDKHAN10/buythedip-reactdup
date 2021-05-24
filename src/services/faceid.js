// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import {
  Alert
} from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
// import {
//   isEnrolledAsync
// } from 'expo-local-authentication'

const faceid = async () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false)

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync()
      setIsBiometricSupported(compatible)
    })()
  }, [])

  const fallBackToDefaultAuth = () => {
    console.log('fall back to password authentication')
  }

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc
      }
    ])
  }

  // const handleBiometricAuth = async () => {
  // Check if hardware supports biometrics
  const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync()

  // Fallback to default authentication method (password) if Fingerprint is not available
  if (!isBiometricAvailable) {
    return alertComponent(
      'Please enter your password',
      'Biometric Authentication not supported',
      'OK',
      () => fallBackToDefaultAuth()
    )
  }
  // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
  const supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync()
  console.log({ supportedBiometrics })
  // Check Biometrics are saved locally in user's device
  const savedBiometrics = await LocalAuthentication.isEnrolledAsync()
  if (!savedBiometrics) {
    return alertComponent(
      'Biometric record not found',
      'Please login with your password',
      'OK',
      () => fallBackToDefaultAuth()
    )
  }

  // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)
  const biometricAuth = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Login with Biometrics',
    cancelLabel: 'Cancel',
    disableDeviceFallback: true
  })
  // Log the user in on success
  if (biometricAuth) {
    console.log('success')
    console.log({ isBiometricSupported })
    console.log({ isBiometricAvailable })
    console.log({ supportedBiometrics })
    console.log({ savedBiometrics })
    console.log({ biometricAuth })
    return ('biometric Auth')
  }
  return ('no biometric auth')
// }
  // return handleBiometricAuth()
}

export default faceid
