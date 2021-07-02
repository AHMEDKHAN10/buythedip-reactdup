import React from 'react'
import {
  SafeAreaView,
  Text,
  Image,
  Platform
} from 'react-native'
import logo from '../../assets/applogo.png'
import { useTheme } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
// eslint-disable-next-line camelcase
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato'

const SplashScreen = () => {
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            padding: 10,
            textAlign: 'center',
            width: '100%',
            fontSize: 23,
            height: 50
            // backgroundColor: colors.background
          }}
        >
          <Text style={{
            fontWeight: Platform.OS === 'ios' ? '800' : 'bold', color: colors.text, fontFamily: 'Lato_700Bold'
          }}>
            DIP
          </Text>
          <Text style={{ fontWeight: '400', color: colors.text, fontFamily: 'Lato_400Regular' }}>LIST</Text>
        </Text>
        <Image style={{ marginTop: 40 }} source={logo}/>
      </SafeAreaView>
    )
  }
}

export default SplashScreen
