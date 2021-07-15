import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Dimensions, TouchableOpacity, TouchableHighlight, Platform, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useIsFocused, useTheme } from '@react-navigation/native'
import {Modal,Button} from 'react-native-paper'
import firebaseuser from '../firebase/firebaseconfig'
import config from '../../config'
import AppLoading from 'expo-app-loading'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import * as Animatable from 'react-native-animatable'
import LottieView from 'lottie-react-native'
// eslint-disable-next-line camelcase
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato'

const { height, width } = Dimensions.get('window')

function renderHeader (navigation) {
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  if (!fontsLoaded) {
    return <AppLoading/>
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
          onPress={
            () => {
            navigation.navigate('Settings')
          }
        }
        />
        <Text style={{ padding: 10, textAlign: 'left', width: '60%', fontSize: 23 }}>
          <Text style={{ fontWeight: '800', fontFamily: 'Lato_700Bold', color: colors.text }}>DIP</Text>
          <Text style={{ fontWeight: '400', fontFamily: 'Lato_400Regular', color: colors.text }}>LIST</Text>
        </Text>
      </View>
    )
  }
}

function StockList (navigation, stockDetails, loading) {
  // const { navigation, stockDetails, loading } = props
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  // console.log(loading)
  // eslint-disable-next-line react/prop-types
  const StockSect = ({ card, index }) => {
    return (
      // flex: 2, height: 80
      <Animatable.View animation='slideInUp' style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80 }}>
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
            <Text style={{ ...styles.dns,color: colors.text, fontFamily: 'Lato_700Bold' }}>
              {
                // eslint-disable-next-line react/prop-types
                card.stockname
              }
            </Text>
            <Text style={{...styles.diplistStockSect, color: colors.primary, fontFamily: 'Lato_400Regular'}}>
              Last closed ${
                // eslint-disable-next-line react/prop-types
                (card.stockpricewhenuseraddedit).toFixed(2)
              }
            </Text>
          </View>
          <TouchableHighlight style={styles.Button} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
            <Text style={{ ...styles.ButtonText,fontFamily: 'Lato_400Regular' }}>$
              {
                // eslint-disable-next-line react/prop-types
                card.triggerPrice
              }
            </Text>
          </TouchableHighlight>
        </TouchableOpacity>
      </Animatable.View>
    )
  }
  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      // flex:10, flex: 4, height: 300
      <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 'auto' }}>
        <View style={{ width: '100%', height: 50, marginTop: 30, marginLeft: '5%' }}>
          <Text style={{ fontSize: 25 }}>
            <Text style={{ fontWeight: '800', fontFamily: 'Lato_700Bold', color: colors.text }}>DIP</Text>
            <Text style={{ fontWeight: '400', fontFamily: 'Lato_400Regular', color: colors.text }}>LIST</Text>
          </Text>
        </View>
        <View style={{ flex: 1, width: '100%', marginLeft: '5%', height: 'auto' }}>
        {/* <ScrollView style={{ flex: 1, width: '100%', marginLeft: '5%' }}> */}
        {loading
          ? <SkeletonPlaceholder backgroundColor= '#E1E9EE' highlightColor= '#F2F8FC' speed= {800} >
              <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                  <View style={{ width: '80%' }}>
                    <View style={{ width: 50, height: 20, borderRadius: 5 }}/>
                    <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }}/>
                  </View>
                  <View style={{ width: 75, height: 35, borderRadius: 8 }} />
              </View>
              <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                  <View style={{ width: '80%' }}>
                    <View style={{ width: 50, height: 20, borderRadius: 5 }}/>
                    <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }}/>
                  </View>
                  <View style={{ width: 75, height: 35, borderRadius: 8 }} />
              </View>
              <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                  <View style={{ width: '80%' }}>
                    <View style={{ width: 50, height: 20, borderRadius: 5 }}/>
                    <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }}/>
                  </View>
                  <View style={{ width: 75, height: 35, borderRadius: 8 }} />
              </View>
              <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                  <View style={{ width: '80%' }}>
                    <View style={{ width: 50, height: 20, borderRadius: 5 }}/>
                    <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }}/>
                  </View>
                  <View style={{ width: 75, height: 35, borderRadius: 8 }} />
              </View>
            </SkeletonPlaceholder>
          : (Object.keys(stockDetails)
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
                    }}
                  >
                    <View style={{ width: '80%' }}>
                      <Text style={{ fontSize: 17, color: colors.text }}>
                        Loookup a Stock
                      </Text>
                      <Text style={{ marginTop: 4, fontSize: 14, fontWeight: '500', color: colors.text }}>
                        Prices updated at market close
                      </Text>
                    </View>
                    <TouchableHighlight style={{...styles.Button2, color: colors.background }} onPress={() => navigation.navigate('FirstScreen')} underlayColor='#fff'>
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
function StockMarketsSect (loading) {
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 'auto' }}>
        <View style={{ width: '100%', height: 50, marginTop: 50, marginLeft: '5%', }}>
          <Text style={{ fontSize: 25 }}>
            <Text style={{ fontWeight: '400', fontFamily: 'Lato_700Bold', color: colors.text }}>INDICES</Text>
          </Text>
        </View>
        <View style={{ flex: 1, width: '100%', marginLeft: '0%', height: 'auto' }}>
        {loading
          ? <View style={{ marginLeft: '5%' }}>
              
                <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                    <View style={{ width: '80%' }}>
                      <View style={{ width: 50, height: 20, borderRadius: 5 }}/>
                      <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }}/>
                    </View>
                    <View style={{ width: 75, height: 35, borderRadius: 8 }} />
                </View>
                <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                    <View style={{ width: '80%' }}>
                      <View style={{ width: 50, height: 20, borderRadius: 5 }}/>
                      <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }}/>
                    </View>
                    <View style={{ width: 75, height: 35, borderRadius: 8 }} />
                </View>
                <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                    <View style={{ width: '80%' }}>
                      <View style={{ width: 50, height: 20, borderRadius: 5 }}/>
                      <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }}/>
                    </View>
                    <View style={{ width: 75, height: 35, borderRadius: 8 }} />
                </View>
            </View>
          : <View >
              <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', height: 60, marginLeft: '5%', borderBottomWidth: 0.4, borderBottomColor: '#b2b2b2', }}>
                <View style={{ width: '50%' }}>
                  <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold' }]}>DJIA</Text>
                  <Text style={[styles.lastClose, { color: colors.primary }]}>Last closed 29,891</Text>
                </View>
                <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                  <Text style={{...styles.ButtonSetText, color: colors.text, fontFamily: 'Lato_400Regular' }}>Set</Text>
                </TouchableOpacity>
              </View>
              <View style={ styles.indicesSect }>
                <View style={{ width: '50%' }}>
                  <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold' }]}>NASDAQ</Text>
                  <Text style={[styles.lastClose, { color: colors.primary }]}>Last closed 30,000</Text>
                </View>
                <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                  <Text style={{...styles.ButtonSetText, color: colors.text, fontFamily: 'Lato_400Regular' }}>Set</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.indicesSect}>
                <View style={{ width: '50%' }}>
                  <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold' }]}>S&P 500</Text>
                  <Text style={[styles.lastClose, { color: colors.primary, fontFamily: 'Lato_400Regular' }]}>Last closed 15,029</Text>
                </View>
                <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                  <Text style={{...styles.ButtonSetText, color: colors.text, fontFamily: 'Lato_400Regular' }}>Set</Text>
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
    return <AppLoading/>
  } else {
    return (
      <View style={{ width: (Dimensions.get('window').width), height: 'auto', alignContent: 'center', alignItems: 'center', marginTop: 40 }}>
        <TouchableHighlight style={[styles.ButtonAddStock, { backgroundColor: colors.text }]} onPress={() => navigation.navigate('FirstScreen')} underlayColor='#000000'>
          <Text style={{...styles.ButtonAddStockText, color: colors.border, fontFamily: 'Lato_700Bold' }}>Add Stock</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

// eslint-disable-next-line react/prop-types
function Home () {
  const [stockDetails, setStockDetails] = useState([])
  const [modal,setModal]= useState(true);
  const [loading, setloading] = useState(false)
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
      console.log('length: ' + stocksArray.length)
      setStockDetails(stocksArray)
      if (stocksArray.length === 1 ) {
        setModal(true);
      }
      if (loading) {
        setloading(false)
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
  }, [isFocused])

  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {renderHeader(navigation)}
      <ScrollView>
      {StockList(navigation, stockDetails, loading)}
      {StockMarketsSect(loading)}
      </ScrollView>
      {/* shadowOpacity: 1, shadowRadius: 4.65, */}
      <View style={{ marginTop: 10, borderTopWidth: 0.25, borderTopColor: '#e2e3e4', backgroundColor: '#fffff', shadowOffset: { height: 0, width: 0 } }}>
        {AddAtockBtn(navigation)}
      </View>
      
      <Modal
            // style={{ position: 'absolute', width: width, height: (width / 1.2), backgroundColor: '#fff', bottom: 0, borderRadius: 50, alignItems: 'center' }}
            // style={{height: 400, bottom: 0 }}
            visible={modal}
            contentContainerStyle={{ position: 'absolute', bottom: -30 }}
            onDismiss={ () => setModal(false)}
          >
            <View style={{ paddingBottom: 20, backgroundColor: '#fff', borderRadius: 50, height: 400 }}>
              <LottieView
                style={{ height: width, width: width, marginTop: -80, marginBottom: -width / 2 }}
                source={require('../../assets/lottie_assets/padlock.json')}
                autoPlay
              />
              <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', fontFamily: 'Lato_700Bold', letterSpacing: 2 }} > Unlock your limits</Text>
              <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10, letterSpacing: 0.5 }} >Feel calmer knowing you'll never miss a buying oppertunity during a dip. Like last time...</Text>

              <Button style={{ width: '80%', borderRadius: 30, padding: 10, marginTop: 30, borderWidth: 1, borderColor: '#000', alignSelf: 'center' }}
                labelStyle={{ fontWeight: 'bold', color: '#000', fontFamily: 'Lato_700Bold' }}
                onPress={() => {
                  console.log("Unlocked!")
                  //Implementation of payment API
                }}
              >
                $9.99 Monthly
              </Button>
              <Button style={{ backgroundColor: '#eeefef', width: '80%', borderRadius: 30, padding: 10, marginTop: 10, alignSelf: 'center' }}
                labelStyle={{ color: 'gray' }}
                onPress={() => {
                  console.log("nothing");
                  setModal(false);
                }}
              >
                Maybe Later
              </Button>

            </View>
         </Modal>
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
    marginLeft: '0%',
    width: '20%',
    backgroundColor: '#ec5d29',
    height: 35,
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
    width: '25%',
    // backgroundColor: '#fff',
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2b3033'
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
    fontSize: 20,
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
    alignItems: 'flex-start'
  },
  diplistStockSect: {
    marginTop: 4,
    fontSize: 13,
    color: '#b2b2b2'
  },
  indicesSect: {
    marginTop: 40,
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
