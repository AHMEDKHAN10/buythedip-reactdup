import React from 'react'
import {
  SafeAreaView,
  Text,
  // Image,
  Dimensions,
  Platform
} from 'react-native'
// import logo from '../../assets/applogo.png'
import { useTheme } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import LottieView from 'lottie-react-native'
// eslint-disable-next-line camelcase
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato'

const SplashScreen = () => {
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  // eslint-disable-next-line no-unused-vars
  const { height, width } = Dimensions.get('window')
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
        {/* <Image style={{ marginTop: 40 }} source={logo}/> */}
        <LottieView
          style={{ height: width, width: width, marginTop: 20, marginBottom: -width / 2 }}
          source={require('../../assets/lottie_assets/Bell_new_shadow.json')}
          autoPlay
        />
      </SafeAreaView>
    )
  }
}

export default SplashScreen
