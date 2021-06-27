import React from 'react'
import {
  SafeAreaView,
  Text,
  Image,
  Platform
} from 'react-native'
import logo from '../../assets/applogo.png'

const SplashScreen = () => {
  return (
    <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text
        style={style.text}
      >
        TBD
      </Text>
      <Text
        style={style.text}
      >
        SPLASH
      </Text> */}
      <Text
        style={{
          padding: 10,
          textAlign: 'center',
          width: '100%',
          fontSize: 23,
          height: 50
        }}
      >
        <Text style={{
          fontWeight: Platform.OS === 'ios' ? '800' : 'bold'
        }}>
          DIP
        </Text>
        <Text style={{ fontWeight: '400' }}>LIST</Text>
      </Text>
      <Image style={{ marginTop: 40 }} source={logo}/>
    </SafeAreaView>
  )
}

// const style = StyleSheet.create({
//   text: {
//     color: '#929192',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 30,
//     letterSpacing: 1
//   }
// })

export default SplashScreen
