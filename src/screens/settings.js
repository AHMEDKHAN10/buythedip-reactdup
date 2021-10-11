import React, { useEffect, useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { EventRegister } from 'react-native-event-listeners'
import {
  StyleSheet,
  SafeAreaView,
  View, Text,
  // Dimensions,
  TouchableHighlight,
  Platform,
  Image
} from 'react-native'
import { Camera } from 'expo-camera'
import { AntDesign } from '@expo/vector-icons'
// import Switch from 'react-native-switch-pro'
import FaceId from '../services/faceid'
import AppLoading from 'expo-app-loading'
import ToggleSwitch from 'toggle-switch-react-native'
// eslint-disable-next-line camelcase
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato'
import davidPic from '../../assets/david.png'
import Constants from 'expo-constants'

function renderHeader (navigation) {
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 10,
        marginTop: (Platform.OS === 'ios') ? 0 : 35
      }}>
        <AntDesign name="close" size={24} color="black"
          onPress={() => {
            navigation.navigate('Home')
          }}
          style={{ paddingTop: 10, paddingLeft: 24, width: '40%', color: colors.text }} />
        <Text style={{ padding: 10, textAlign: 'left', width: '60%', fontSize: 20 }}>
          <Text style={{ fontWeight: '400', fontFamily: 'Lato_700Bold', color: colors.text }}>Settings</Text>
        </Text>
      </View>
    )
  }
}

function Content2 () {
  const [isEnabled, setIsEnabled] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [hasPermission, setHasPermission] = useState(null)
  const { colors } = useTheme()
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
    // const today = new Date()
    // const time = today.getHours() + ':' + today.getMinutes()
    // console.log('time: ' + time)
    // if (time >= '18:25' && time <= '6:55') {
    //   setDarkMode(true)
    //   EventRegister.emit('themeListener', true)
    // } else {
    //   setDarkMode(false)
    //   EventRegister.emit('themeListener', false)
    // }
  }, [])

  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState)
    console.log('toggle switch')
    console.log('isenabled: ' + isEnabled)
    if (!isEnabled) {
      console.log('enabled')
      FaceId()
    } else {
      console.log('not enabled')
    }
  }
  const [darkMode, setDarkMode] = useState(false)
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      // (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width)))
      <View style={{ flex: 8, width: '100%', paddingLeft: 24, paddingRight: 24, height: 50 }}>
        <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', height: 50, marginLeft: '0%', borderBottomWidth: 0.4, borderBottomColor: '#b2b2b2', paddingBottom: 15 }}>
          <View style={{ width: '80%', marginTop: 10 }}>
            <Text style={{ fontSize: 15, fontFamily: 'Lato_400Regular', color: colors.text }}>Face ID</Text>
          </View>
          {/* <Switch
            width= {57}
            height={30}
            circleColorInactive='#f1f1f1'
            backgroundInactive={colors.background}
            value = {isEnabled}
            style={{
              borderColor: colors.text,
              borderWidth: 0.5,
              padding: 2
            }}
            circleStyle={{
              width: 25,
              height: 25,
              borderWidth: 0.5,
              borderColor: '#000'
            }}
            onSyncPress = {async () => {
              await toggleSwitch()
            }}
          /> */}
          <ToggleSwitch
            isOn={isEnabled}
            onColor="#04D700"
            offColor = {darkMode ? 'rgb(78,78,78)' : '#C4C4C4'}
            size='large'
            onToggle={async () => await toggleSwitch()}
          />
        </View>
        <View style={styles.settingsOptions}>
          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 15, fontFamily: 'Lato_400Regular', color: colors.text }}>Manage Notifications</Text>
          </View>
          <AntDesign name="right" size={16} color="black" style={{ width: '20%', justifyContent: 'center', marginTop: 3, textAlign: 'right', color: colors.text }} />
        </View>
        <View style={styles.settingsOptions}>
          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 15, fontFamily: 'Lato_400Regular', color: colors.text }}>Feature Request & Report Bugs</Text>
          </View>
          <AntDesign name="right" size={16} color="black" style={{ width: '20%', justifyContent: 'center', marginTop: 3, textAlign: 'right', color: colors.text }} />
        </View>
        <View style={styles.settingsOptions}>
          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 15, fontFamily: 'Lato_400Regular', color: colors.text }}>Restore subscription</Text>
          </View>
          <AntDesign name="right" size={16} color="black" style={{ width: '20%', justifyContent: 'center', marginTop: 3, textAlign: 'right', color: colors.text }} />
        </View>
        <View style={{ marginTop: 25, flexDirection: 'row', width: '100%', height: 30, marginLeft: '0%' }}>
          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 15, fontFamily: 'Lato_400Regular', color: colors.text }}>Theme</Text>
          </View>
          {/* <Switch
            width={57}
            height={30}
            circleColorInactive='#f1f1f1'
            backgroundInactive={colors.background}
            value={darkMode}
            style={{
              borderColor: colors.text,
              borderWidth: 0.5,
              padding: 2
            }}
            circleStyle={{
              width: 25,
              height: 25,
              borderWidth: 0.5,
              borderColor: '#000'
            }}
            onSyncPress={(val) => {
              setDarkMode(val)
              EventRegister.emit('themeListener', val)
            }}
          /> */}
        </View>
        <View style={[styles.settingsOptions3, { marginRight: -24 }]}>
          <View style={styles.settingsOptions2}>
            <Text style={{ fontSize: 24, fontFamily: 'Lato_700Bold', color: colors.text }}>A little favor</Text>
            <Text style={{ marginTop: 10, fontSize: 15, fontFamily: 'Lato_400Regular', color: colors.text, lineHeight: 24 }}>
              If you’ve gotten value out of this app, i’d appricate your support by sharing the app.
            </Text>
          </View>
          <Image source={davidPic} style={{ width: '50%' }}>

          </Image>
        </View>
        <View style={{ marginTop: 40, flexDirection: 'row', width: '100%', height: 60, marginLeft: '0%', justifyContent: 'center' }}>
          <TouchableHighlight style={styles.ButtonAddStock} onPress={() => console.log('button tapped')} underlayColor='#fff'>
            <Text style={styles.ButtonAddStockText}>Share with friends</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

function settings () {
  const navigation = useNavigation()
  const { colors } = useTheme()
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      {renderHeader(navigation)}
      {Content2()}
      <Text style={{ color: colors.text, opacity: 0.7, fontFamily: 'Lato_400Regular', fontSize: 10 }}>{'Build v' + Constants.nativeBuildVersion}</Text>
    </SafeAreaView>
  )
}

export default settings

const styles = StyleSheet.create({
  settingsOptions: {
    marginTop: 25,
    flexDirection: 'row',
    width: '100%',
    height: 45,
    marginLeft: '0%',
    borderBottomWidth: 0.4,
    borderBottomColor: '#b2b2b2',
    alignItems: 'flex-start'
  },
  settingsOptions2: {
    marginTop: 10,
    // flexDirection: 'row',
    width: '60%',
    height: 'auto',
    marginLeft: '0%',
    alignItems: 'flex-start'
  },
  settingsOptions3: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    marginLeft: '0%',
    alignItems: 'flex-start'
  },
  ButtonAddStock: {
    width: '100%',
    backgroundColor: '#FFB801',
    height: 58,
    borderRadius: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFB801'
  },
  ButtonAddStockText: {
    color: '#2B3033',
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'Lato_400Regular'
  }
})
