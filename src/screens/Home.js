/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Dimensions, TouchableOpacity, TouchableHighlight, Platform, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useIsFocused, useTheme } from '@react-navigation/native'
import firebaseuser from '../firebase/firebaseconfig'
import config from '../../config'
import AppLoading from 'expo-app-loading'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import * as Animatable from 'react-native-animatable'
import { EventRegister } from 'react-native-event-listeners'
// eslint-disable-next-line camelcase
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'

function renderHeader (navigation) {
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      // flex:1, height: 50
      <View style={{
        // flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        marginTop: (Platform.OS === 'ios') ? 0 : 35
      }}>
        <Ionicons
          name='settings-outline' size={24} color={colors.text} style={{ paddingTop: 10, paddingLeft: 15, width: '40%' }}
          onPress={() => {
            navigation.navigate('Settings')
          }}
        />
        <Text style={{ padding: 10, textAlign: 'left', width: '60%', fontSize: 23 }}>
          <Text style={{ fontFamily: 'Lato_700Bold', color: colors.text }}>DIP</Text>
          <Text style={{ fontWeight: '400', fontFamily: 'Lato_400Regular', color: colors.text }}>LIST</Text>
        </Text>
      </View>
    )
  }
}

function StockList (navigation, stockDetails, loading, slideUp) {
  // const { navigation, stockDetails, loading } = props
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black
  })
  // console.log(loading)
  // eslint-disable-next-line react/prop-types
  const StockSect = ({ card, index }) => {
    return (
      // flex: 2, height: 80
      slideUp
        ? <Animatable.View animation='slideInUp' style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80 }}>
          <TouchableOpacity
            style={styles.diplistSect}
            onPress={() => {
              navigation.navigate('StockScreenBluePrint', {
                // eslint-disable-next-line react/prop-types
                otherParam: card.stockname,
                // eslint-disable-next-line react/prop-types
                price: card.stockpricewhenuseraddedit,
                // eslint-disable-next-line react/prop-types
                trigger: card.triggerPrice
              })
            }}
          >
            <View style={{ width: '80%' }}>
              <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>
                {
                  // eslint-disable-next-line react/prop-types
                  card.stockname
                }
              </Text>
              <Text style={[styles.diplistStockSect, { color: colors.primary, fontFamily: 'Lato_400Regular', fontSize: 13, letterSpacing: 1, opacity: 0.7 }]}>
                Last closed ${
                  // eslint-disable-next-line react/prop-types
                  (card.stockpricewhenuseraddedit)
                }
              </Text>
            </View>
            <TouchableHighlight style={[styles.Button, { backgroundColor: card.triggerPrice > card.stockpricewhenuseraddedit ? '#5AC53A' : '#ec5d29' }]} onPress={() => {
              navigation.navigate('StockScreenBluePrint', {
                // eslint-disable-next-line react/prop-types
                otherParam: card.stockname,
                // eslint-disable-next-line react/prop-types
                price: card.stockpricewhenuseraddedit,
                // eslint-disable-next-line react/prop-types
                trigger: card.triggerPrice
              })
            }} underlayColor='#fff'>
              <Text style={[styles.ButtonText, { fontFamily: 'Lato_400Regular', fontSize: 14, letterSpacing: 1 }]}>$
                {
                  // eslint-disable-next-line react/prop-types
                  card.triggerPrice
                }
              </Text>
            </TouchableHighlight>
          </TouchableOpacity>
        </Animatable.View>
        : <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80 }}>
          <TouchableOpacity
            style={styles.diplistSect}
            onPress={() => {
              navigation.navigate('StockScreenBluePrint', {
                // eslint-disable-next-line react/prop-types
                otherParam: card.stockname,
                // eslint-disable-next-line react/prop-types
                price: card.stockpricewhenuseraddedit,
                // eslint-disable-next-line react/prop-types
                trigger: card.triggerPrice
              })
            }}
          >
            <View style={{ width: '80%' }}>
              <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>
                {
                  // eslint-disable-next-line react/prop-types
                  card.stockname
                }
              </Text>
              <Text style={[styles.diplistStockSect, { color: colors.primary, fontFamily: 'Lato_400Regular', fontSize: 13, letterSpacing: 1, opacity: 0.7 }]}>
                Last closed ${
                  // eslint-disable-next-line react/prop-types
                  (card.stockpricewhenuseraddedit)
                }
              </Text>
            </View>
            <TouchableHighlight style={[styles.Button, { backgroundColor: card.triggerPrice > card.stockpricewhenuseraddedit ? '#5AC53A' : '#ec5d29' }]} onPress={() => {
              navigation.navigate('StockScreenBluePrint', {
                // eslint-disable-next-line react/prop-types
                otherParam: card.stockname,
                // eslint-disable-next-line react/prop-types
                price: card.stockpricewhenuseraddedit,
                // eslint-disable-next-line react/prop-types
                trigger: card.triggerPrice
              })
            }} underlayColor='#fff'>
              <Text style={[styles.ButtonText, { fontFamily: 'Lato_400Regular', fontSize: 14, letterSpacing: 1 }]}>$
                {
                  // eslint-disable-next-line react/prop-types
                  card.triggerPrice
                }
              </Text>
            </TouchableHighlight>
          </TouchableOpacity>
        </View>
    )
  }
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      // flex:10, flex: 4, height: 300
      <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 'auto' }}>
        <View style={{ width: '100%', height: 50, marginTop: 30, marginLeft: '5%', alignItems: 'left' }}>
          <Text style={{ fontSize: 24 }}>
            <Text style={{ fontFamily: 'Lato_900Black', letterSpacing: 0.5, color: colors.text }}>DIP</Text>
            <Text style={{ fontFamily: 'Lato_700Bold', letterSpacing: 0.5, color: colors.text }}>LIST</Text>
          </Text>
        </View>
        <View style={{ flex: 1, width: '100%', marginLeft: '5%', height: 'auto' }}>
          {/* <ScrollView style={{ flex: 1, width: '100%', marginLeft: '5%' }}> */}
          {loading
            ? <SkeletonPlaceholder backgroundColor='#E1E9EE' highlightColor='#F2F8FC' speed={800} >
              <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                  <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                  <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                </View>
                <View style={{ width: 75, height: 35, borderRadius: 8 }} />
              </View>
              <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                  <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                  <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                </View>
                <View style={{ width: 75, height: 35, borderRadius: 8 }} />
              </View>
              <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                  <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                  <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                </View>
                <View style={{ width: 75, height: 35, borderRadius: 8 }} />
              </View>
              <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                  <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                  <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                </View>
                <View style={{ width: 75, height: 35, borderRadius: 8 }} />
              </View>
            </SkeletonPlaceholder>
            : (stockDetails.length > 0
                ? stockDetails.map((item, index) => (
                <StockSect card={item} index={index} key={index} />
                ))
                : <View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 60,
                    marginLeft: '0%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e2e3e4',
                    alignItems: 'left'
                  }}
                >
                  <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: 15, color: colors.text, fontFamily: 'Lato_700Bold' }}>
                      Loookup a Stock
                    </Text>
                    <Text style={{ marginTop: 4, fontSize: 13, fontFamily: 'Lato_400Regular', color: colors.text, opacity: 0.7 }}>
                      Prices updated at market close
                    </Text>
                  </View>
                  <TouchableHighlight style={[styles.Button2, { color: colors.background }]} onPress={() => navigation.navigate('AddStock')} underlayColor='#fff'>
                    <Text style={styles.ButtonText2}>
                      Add
                    </Text>
                  </TouchableHighlight>
                </TouchableOpacity>
              </View>
              )
          }
        </View>
      </View>
    )
  }
}

//  flex: 6, height: 50
function StockMarketsSect (loading, slideUp) {
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 'auto' }}>
        <View style={{ width: '100%', height: 50, marginTop: 50, marginLeft: '5%', alignItems: 'left' }}>
          <Text style={{ fontSize: 24 }}>
            <Text style={{ fontFamily: 'Lato_700Bold', color: colors.text, fontSize: 24 }}>MARKETS</Text>
          </Text>
          <Text style={{ fontSize: 13, marginTop: 5 }}>
            <Text style={{ fontFamily: 'Lato_400Regular', color: colors.text, lineHeight: 20, letterSpacing: 1 }}>Market indices constist of companies that represent a particular segment of the economy.</Text>
          </Text>
        </View>
        <View style={{ flex: 1, width: '100%', marginLeft: '0%', height: 'auto', marginTop: 30 }}>
          {loading
            ? <View style={{ marginLeft: '5%' }}>
              <SkeletonPlaceholder backgroundColor='#E1E9EE' highlightColor='#F2F8FC' speed={800}>
                <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                  <View style={{ width: '80%' }}>
                    <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                    <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                  </View>
                  <View style={{ width: 75, height: 35, borderRadius: 8 }} />
                </View>
                <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                  <View style={{ width: '80%' }}>
                    <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                    <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                  </View>
                  <View style={{ width: 75, height: 35, borderRadius: 8 }} />
                </View>
                <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                  <View style={{ width: '80%' }}>
                    <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                    <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                  </View>
                  <View style={{ width: 75, height: 35, borderRadius: 8 }} />
                </View>
              </SkeletonPlaceholder>
            </View>
            : slideUp
              ? <Animatable.View animation='slideInUp'>
                <View style={{ marginTop: 10 }} >
                  <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', height: 60, marginLeft: '5%', borderBottomWidth: 0.4, borderBottomColor: '#b2b2b2', alignItems: 'left' }}>
                    <View style={{ width: '50%' }}>
                      <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>DJIA</Text>
                      <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 29,891</Text>
                    </View>
                    <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                      <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Set</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.indicesSect}>
                    <View style={{ width: '50%' }}>
                      <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>NASDAQ</Text>
                      <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 30,000</Text>
                    </View>
                    <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                      <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Set</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.indicesSect}>
                    <View style={{ width: '50%' }}>
                      <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>S&P 500</Text>
                      <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 15,029</Text>
                    </View>
                    <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                      <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Set</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animatable.View>
              : <View style={{ marginTop: 10 }} >
                <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', height: 60, marginLeft: '5%', borderBottomWidth: 0.4, borderBottomColor: '#b2b2b2', alignItems: 'left' }}>
                  <View style={{ width: '50%' }}>
                    <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>DJIA</Text>
                    <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 29,891</Text>
                  </View>
                  <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                    <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Set</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.indicesSect}>
                  <View style={{ width: '50%' }}>
                    <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>NASDAQ</Text>
                    <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 30,000</Text>
                  </View>
                  <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                    <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Set</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.indicesSect}>
                  <View style={{ width: '50%' }}>
                    <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>S&P 500</Text>
                    <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 15,029</Text>
                  </View>
                  <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                    <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Set</Text>
                  </TouchableOpacity>
                </View>
              </View>
          }
        </View>
      </View>
    )
  }
}
// flex: 1, height: 50
function AddAtockBtn (navigation) {
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    // colors.text
    return (
      <View style={{ width: (Dimensions.get('window').width), height: 'auto', alignContent: 'center', alignItems: 'center', marginTop: 40 }}>
        <TouchableHighlight style={[styles.ButtonAddStock, { backgroundColor: colors.text }]} onPress={() => navigation.navigate('AddStock')} underlayColor='#000000'>
          <Text style={[styles.ButtonAddStockText, { color: colors.border, fontFamily: 'Lato_700Bold', lineHeight: 24, letterSpacing: 1 }]}>Add Stock</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

// eslint-disable-next-line react/prop-types
function Home () {
  const [stockDetails, setStockDetails] = useState([])
  const [loading, setloading] = useState(true)
  const [slideUp, setSlideUp] = useState(false)
  const isFocused = useIsFocused()
  const { colors } = useTheme()
  async function fetchData () {
    const userid = await firebaseuser()
    const request = JSON.stringify({
      userid: userid
    })
    try {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: request
      }
      const response = await fetch(config.API_URL + 'getData', options)
      const json = await response.json()
      const stocksArray = []
      if (json.data.length !== 0) {
        for (let i = 0; i < json.data.length; i++) {
          // console.log("name: "+ json.data[i].stockname)
          stocksArray.push({
            stockname: json.data[i].stockname,
            stockpricewhenuseraddedit: json.data[i].stockpricewhenuseraddedit,
            triggerPrice: json.data[i].triggerPrice,
            userId: json.data[i].userId
          })
        }
      }
      // console.log('length: ' + stocksArray.length)
      setStockDetails(stocksArray)
      if (loading) {
        setloading(false)
        setSlideUp(true)
      } else {
        setSlideUp(false)
      }
      console.log('uid: ' + userid)
    } catch (error) {
      // const errorCode = error.code
      // const errorMessage = error.message
      // console.log(errorCode + ': ' + errorMessage)
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
    const today = new Date()
    const time = today.getHours() + ':' + today.getMinutes()
    console.log('time: ' + time)
    if (time >= '18:25' && time <= '6:55') {
      // setDarkMode(true)
      EventRegister.emit('themeListener', true)
    } else {
      // setDarkMode(false)
      EventRegister.emit('themeListener', false)
    }
  }, [isFocused])

  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {renderHeader(navigation)}
      <ScrollView>
        {StockList(navigation, stockDetails, loading, slideUp)}
        {StockMarketsSect(loading, slideUp)}
      </ScrollView>
      {/* shadowOpacity: 1, shadowRadius: 4.65, */}
      <View style={{ marginTop: 10, borderTopWidth: 0.25, borderTopColor: '#e2e3e4', backgroundColor: '#fffff', shadowOffset: { height: 0, width: 0 } }}>
        {AddAtockBtn(navigation)}
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  childView: {
    borderBottomWidth: 5,
    borderBottomColor: '#000',
    backgroundColor: '#00BCD4'
  },

  Button: {
    width: 85,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center'
  },
  ButtonText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  Button2: {
    display: 'flex',
    marginLeft: '0%',
    width: '20%',
    color: '#000',
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Button2Text: {
    color: '#000',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  ButtonSet: {
    marginLeft: '25%',
    width: 85,
    // backgroundColor: '#fff',
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 1
    // borderColor: '#2b3033'
  },
  ButtonSetText: {
    color: '#2b3033',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  ButtonAddStock: {
    width: '85%',
    backgroundColor: '#2b3033',
    height: 58,
    borderRadius: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2b3033'
  },
  ButtonAddStockText: {
    color: '#ffe6d2',
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  diplistSect: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    marginLeft: '0%',
    borderBottomWidth: 0.4,
    borderBottomColor: '#b2b2b2',
    alignItems: 'flex-start',
    paddingRight: 25
  },
  diplistStockSect: {
    marginTop: 4,
    fontSize: 13,
    color: '#b2b2b2'
  },
  indicesSect: {
    marginTop: 25,
    flexDirection: 'row',
    width: '100%',
    height: 60,
    marginLeft: '5%',
    borderBottomWidth: 0.4,
    borderBottomColor: '#b2b2b2',
    alignItems: 'flex-start'
  },
  dns: {
    fontSize: 17
  },
  lastClose: {
    marginTop: 4,
    fontSize: 13,
    color: '#b2b2b2'
  }
})

// ToDo
// when new stock added it shows up on screen with some delay so display shimmer unitl delay gets over
