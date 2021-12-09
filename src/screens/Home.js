/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react'
import {
  Animated,
  StyleSheet,
  SafeAreaView,
  View, Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  ScrollView,
  Image,
  RefreshControl,
  Share
  // Button
} from 'react-native'
// import Share from 'react-native-share'
// import * as Sharing from 'expo-sharing'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Button, Modal } from 'react-native-paper'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import { useNavigation, useIsFocused, useTheme } from '@react-navigation/native'
import firebaseuser from '../firebase/firebaseconfig'
import config from '../../config'
import AppLoading from 'expo-app-loading'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import * as Animatable from 'react-native-animatable'
import { EventRegister } from 'react-native-event-listeners'
import LottieView from 'lottie-react-native'
import registerForPushNotificationsAsync from '../services/pushNotification'
import Communitypicks from './reuseable/communitypicks'
// eslint-disable-next-line camelcase
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato'
import { Context } from '../context/context'
import { ModalContext } from '../context/modalContext'
import HomeInvite from './reuseable/homeInvite'
import LottieInvite from './reuseable/lottieInvite'
const { width, height } = Dimensions.get('window')
const premium = require('../../assets/premium.png')
const lock = require('../../assets/lock.png')
const lockForDark = require('../../assets/lockforDark.png')

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
          name='settings-outline' size={24} color={colors.text} style={{ paddingTop: 10, paddingLeft: 15, width: '20%' }}
          onPress={() => {
            navigation.navigate('Settings')
          }}
        />
        <Text style={{ padding: 10, textAlign: 'center', width: '60%', fontSize: 23 }}>
          <Text style={{ fontFamily: 'Lato_700Bold', color: colors.text }}>DIP</Text>
          <Text style={{ fontWeight: '400', fontFamily: 'Lato_400Regular', color: colors.text }}>LIST</Text>
        </Text>
        <Text style={{ marginTop: 13, padding: 5, textAlign: 'left', width: '20%', fontSize: 14, fontFamily: 'Lato_700Bold', color: colors.text }}>
          Share
        </Text>
      </View>
    )
  }
}

function StockList (navigation, stockDetails, loading, slideUp, isSubscribed, onRefresh) {
  // const { navigation, stockDetails, loading } = props
  const { isNewlyAdded, setIsNewlyAdded } = useContext(Context)
  const { trialStatus } = useContext(ModalContext)
  const [isSwiped, setIsSwiped] = useState(false)
  const [rowDelete, setIsRowDelete] = useState(false)
  const [rowKeySwipe, setRowKeySwipe] = useState()
  const { colors } = useTheme()
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black
  })
  const [refreshing, setRefreshing] = useState(false)
  useEffect(() => {
    setIsNewlyAdded(false)
  }, [refreshing, setRefreshing])
  // eslint-disable-next-line react/prop-types
  // const StockSect = ({ card, index }) => {
  //   return (
  //     // flex: 2, height: 80
  //     slideUp
  //       ? <Animatable.View animation='slideInUp' style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80 }}>
  //         <TouchableOpacity
  //           style={styles.diplistSect}
  //           onPress={() => {
  //             navigation.navigate('StockScreenBluePrint', {
  //               // eslint-disable-next-line react/prop-types
  //               otherParam: card.stockname,
  //               // eslint-disable-next-line react/prop-types
  //               price: card.stockpricewhenuseraddedit,
  //               // eslint-disable-next-line react/prop-types
  //               trigger: card.triggerPrice
  //             })
  //           }}
  //         >
  //           <View style={{ width: '80%' }}>
  //             <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>
  //               {
  //                 // eslint-disable-next-line react/prop-types
  //                 card.stockname
  //               }
  //             </Text>
  //             <Text style={[styles.diplistStockSect, { color: colors.primary, fontFamily: 'Lato_400Regular', fontSize: 13, letterSpacing: 1, opacity: 0.7 }]}>
  //               Last closed ${
  //                 // eslint-disable-next-line react/prop-types
  //                 (card.stockpricewhenuseraddedit)
  //               }
  //             </Text>
  //           </View>
  //           <TouchableHighlight style={[styles.Button, { backgroundColor: card.triggerPrice > card.stockpricewhenuseraddedit ? '#5AC53A' : '#ec5d29' }]} onPress={() => {
  //             navigation.navigate('StockScreenBluePrint', {
  //               // eslint-disable-next-line react/prop-types
  //               otherParam: card.stockname,
  //               // eslint-disable-next-line react/prop-types
  //               price: card.stockpricewhenuseraddedit,
  //               // eslint-disable-next-line react/prop-types
  //               trigger: card.triggerPrice
  //             })
  //           }} underlayColor='#fff'>
  //             <Text style={[styles.ButtonText, { fontFamily: 'Lato_400Regular', fontSize: 14, letterSpacing: 1 }]}>$
  //               {
  //                 // eslint-disable-next-line react/prop-types
  //                 card.triggerPrice
  //               }
  //             </Text>
  //           </TouchableHighlight>
  //         </TouchableOpacity>
  //       </Animatable.View>
  //       : <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80 }}>
  //         <TouchableOpacity
  //           style={styles.diplistSect}
  //           onPress={() => {
  //             navigation.navigate('StockScreenBluePrint', {
  //               // eslint-disable-next-line react/prop-types
  //               otherParam: card.stockname,
  //               // eslint-disable-next-line react/prop-types
  //               price: card.stockpricewhenuseraddedit,
  //               // eslint-disable-next-line react/prop-types
  //               trigger: card.triggerPrice
  //             })
  //           }}
  //         >
  //           <View style={{ width: '80%' }}>
  //             <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>
  //               {
  //                 // eslint-disable-next-line react/prop-types
  //                 card.stockname
  //               }
  //             </Text>
  //             <Text style={[styles.diplistStockSect, { color: colors.primary, fontFamily: 'Lato_400Regular', fontSize: 13, letterSpacing: 1, opacity: 0.7 }]}>
  //               Last closed ${
  //                 // eslint-disable-next-line react/prop-types
  //                 (card.stockpricewhenuseraddedit)
  //               }
  //             </Text>
  //           </View>
  //           <TouchableHighlight style={[styles.Button, { backgroundColor: card.triggerPrice > card.stockpricewhenuseraddedit ? '#5AC53A' : '#ec5d29' }]} onPress={() => {
  //             navigation.navigate('StockScreenBluePrint', {
  //               // eslint-disable-next-line react/prop-types
  //               otherParam: card.stockname,
  //               // eslint-disable-next-line react/prop-types
  //               price: card.stockpricewhenuseraddedit,
  //               // eslint-disable-next-line react/prop-types
  //               trigger: card.triggerPrice
  //             })
  //           }} underlayColor='#fff'>
  //             <Text style={[styles.ButtonText, { fontFamily: 'Lato_400Regular', fontSize: 14, letterSpacing: 1 }]}>$
  //               {
  //                 // eslint-disable-next-line react/prop-types
  //                 card.triggerPrice
  //               }
  //             </Text>
  //           </TouchableHighlight>
  //         </TouchableOpacity>
  //       </View>
  //   )
  // }

  const StockSectlocked = ({ card, index }) => {
    return (
      // flex: 2, height: 80 (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width)))
      slideUp
        ? <Animatable.View animation='slideInUp' style={{ width: '100%', paddingLeft: '5%', paddingRight: '5%', height: 80 }}>
          <TouchableOpacity
            style={[styles.diplistSect, { borderBottomWidth: 0.4, borderBottomColor: '#b2b2b2' }]}
          >
            <View style={{ width: '80%' }}>
              <Image
                source={ premium }
                style={{ paddingLeft: 34, height: 20, width: '30%', borderRadius: 4 }}
              />
              <Text style={[styles.diplistStockSect, { color: colors.primary, fontFamily: 'Lato_400Regular', fontSize: 13, letterSpacing: 1, opacity: 0.7 }]}>
                Restore with paid plan
              </Text>
            </View>
            <View style={{ width: '20%' }}>
              <Image
                source = { colors.background === '#000000' ? lockForDark : lock }
                style={{ marginLeft: 29, height: '50%', width: 24 }}
              />
            </View>
          </TouchableOpacity>
        </Animatable.View>
        : <View style={{ width: '100%', paddingLeft: '5%', paddingRight: '5%', height: 80 }}>
          <TouchableOpacity
            style={[styles.diplistSect, { borderBottomWidth: 0.4, borderBottomColor: '#b2b2b2' }]}
          >
            <View style={{ width: '80%' }}>
              <Image
                source={ premium }
                style={{ paddingLeft: 34, height: 20, width: '30%', borderRadius: 4 }}
              />
              <Text style={[styles.diplistStockSect, { color: colors.primary, fontFamily: 'Lato_400Regular', fontSize: 13, letterSpacing: 0.5, opacity: 0.7 }]}>
                Restore with paid plan
              </Text>
            </View>
            <View style={{ width: '20%' }}>
              <Image
                source = { colors.background === '#000000' ? lockForDark : lock }
                style={{ marginLeft: 29, height: '50%', width: 24 }}
              />
            </View>
          </TouchableOpacity>
        </View>
    )
  }
  // const shareOptions = {
  //   message: 'share text'
  // }

  const onShare = async (title, msg, url) => {
    const msgAndURL = msg.concat('\n\n').concat(url)
    try {
      const result = await Share.share(
        {
          title,
          message: msgAndURL
        },
        {
          subject: title
        }
      )
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }
  const shareRow = async (rowMap, rowName, rowKey) => {
    if (rowMap[rowKey]) {
      onShare('My App', 'Hey Checkout this app', 'https://google.com/')

      closeRow(rowMap, rowKey)
    }
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }
  const deleteRow = async (rowMap, rowName, rowKey) => {
    setIsRowDelete(true)
    const userid = await firebaseuser()
    const request = JSON.stringify({
      userid: userid,
      stockName: rowName
    })
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: request
    }
    try {
      const response = await fetch(config.API_URL + 'delData', options)
      await response.json()
      onRefresh()
      closeRow(rowMap, rowKey)
      navigation.navigate('Home')
      setIsRowDelete(false)
    } catch (e) {
      console.error(e)
    }
  }

  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey)
  }

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey)
  }

  const onRightAction = (rowKey, rowMap) => {
    // console.log('onRightAction', stockDetails[rowKey])
    deleteRow(rowMap, stockDetails[rowKey].stockname, rowKey)
  }

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey)
  }

  const VisibleItem = props => {
    const { data } = props
    // useEffect(() => {
    //   setIsSwiped(false)
    //   console.log('isSwipedd: ' + isSwiped)
    // }, [])
    return (
      <View style={[styles.rowFront,
        {
          width: isSwiped === true && rowKeySwipe === data.item.key ? '100%' : '90%',
          backgroundColor: colors.background,
          paddingLeft: isSwiped === true && rowKeySwipe === data.item.key ? 0 : '0%',
          paddingRight: isSwiped === true && rowKeySwipe === data.item.key ? 0 : '0%'
        }
      ]}>
        <TouchableHighlight style={styles.diplistSect}>
          <View style = {{ flexDirection: 'row' }}>
            <View style={{ width: '76%', alignSelf: 'center' }}>
              <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]} numberOfLines={1}>
                {data.item.stockname}
              </Text>
              <Text style={[styles.diplistStockSect, { color: colors.primary, fontFamily: 'Lato_400Regular', fontSize: 13, letterSpacing: 1, opacity: 0.7 }]} numberOfLines={1}>
                Last closed ${
                  (data.item.stockpricewhenuseraddedit)
                }
              </Text>
            </View>
            <View style={{ alignSelf: 'center' }}>
              <TouchableHighlight
                style={[styles.Button, { backgroundColor: data.item.triggerPrice > data.item.stockpricewhenuseraddedit ? '#5AC53A' : '#ec5d29' }]}
                underlayColor='#ffb38a'
                onPress={() => {
                  navigation.navigate('StockScreenBluePrint', {
                    // eslint-disable-next-line react/prop-types
                    otherParam: data.item.stockname,
                    // eslint-disable-next-line react/prop-types
                    price: data.item.stockpricewhenuseraddedit,
                    // eslint-disable-next-line react/prop-types
                    trigger: data.item.triggerPrice
                  })
                }}
              >
                <Text style={[styles.ButtonText, { fontFamily: 'Lato_400Regular', fontSize: 14, letterSpacing: 1 }]}>$
                  {
                    data.item.triggerPrice
                  }
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
  function renderItem (data, rowMap, rowKey) {
    return (
      <VisibleItem data= { data } rowMap = { rowMap } rowKey = { rowKey }/>
    )
  }

  const HiddenItemWithActions = props => {
    const {
      data,
      swipeAnimatedValue,
      // leftActivationActivated,
      // rightActivationActivated,
      rowActionAnimatedValue,
      // rowHeightAnimatedValue,
      onShare,
      onDelete
    } = props
    return (
      <View style = {[styles.rowBack, { backgroundColor: '#B81200', display: isSwiped === true && rowKeySwipe === data.item.key ? 'flex' : 'none' }]} >
        <TouchableOpacity style = {[styles.backRightBtn, styles.backRightBtnLeft, { display: rowDelete ? 'none' : 'flex' }]} onPress = {onShare}>
          <Feather
            name='share' size={20} color = "#FFE6D1" style = {{ textAlign: 'center', width: '70%', marginBottom: 5 }}
          />
          <Text style = {{ color: '#FFE6D1', fontFamily: 'Lato_400Regular', fontSize: 14 }}>Share</Text>
        </TouchableOpacity>
        <Animated.View style = {[styles.backRightBtn, styles.backRightBtnRight, {
          flex: 1,
          width: rowActionAnimatedValue,
          display: rowDelete ? 'none' : 'flex'
        }]}>
          <TouchableOpacity style = {[styles.backRightBtn, styles.backRightBtnRight]} onPress = {onDelete}>
            <Animated.View style = {[styles.backRightBtn, styles.backRightBtn, {
              transform: [
                {
                  scale: swipeAnimatedValue.interpolate({
                    inputRange: [-90, -45],
                    outputRange: [1, 0],
                    extrapolate: 'clamp'
                  })
                }
              ]
            }]}>
              <AntDesign
                name='delete' size={24} color = "#FFE6D1" style = {{ paddingLeft: '38%', width: '100%', marginBottom: 5 }}
              />
            <Text style = {{ color: '#FFFFFF', fontFamily: 'Lato_400Regular', fontSize: 14 }} >Delete</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75)
    const rowHeightAnimatedValue = new Animated.Value(60)
    return (
      <HiddenItemWithActions
        data = {data}
        rowMap = {rowMap}
        onShare = {() => shareRow(rowMap, data.item.stockname, data.item.key)}
        onDelete = {() => deleteRow(rowMap, data.item.stockname, data.item.key)}
        // OnRightAction = {() => onRightAction(rowMap, data.item.stockname, data.item.key)}
        rowActionAnimatedValue = {rowActionAnimatedValue}
        rowHeightAnimatedValue = {rowHeightAnimatedValue}
      ></HiddenItemWithActions>
    )
  }
  function onRowOpen (rowKey) {
    setIsSwiped(true)
    setRowKeySwipe(rowKey)
  }
  function onRowClose (rowKey) {
    setIsSwiped(false)
  }

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      // flex:10, flex: 4, height: 300 (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width)))
      <View style={{ width: '100%', height: 'auto' }}>
        <View style={{ flex: 1, width: '100%', marginLeft: '0%', height: 'auto' }}>
          {/* <ScrollView style={{ flex: 1, width: '100%', marginLeft: '5%' }}> */}
          {loading
            ? <SkeletonPlaceholder backgroundColor='#E1E9EE' highlightColor='#F2F8FC' speed={800} >
              <View style={{ width: '90%', height: 80, marginLeft: '5%' }}>
                <View style={{ width: '100%' }}>
                  <View style={{ width: '40%', height: 40, borderRadius: 5 }} />
                </View>
              </View>
              <View style={{ width: '90%', height: 80, flexDirection: 'row', marginLeft: '5%' }}>
                <View style={{ width: '80%' }}>
                  <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                  <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                </View>
                <View style={{ width: 75, height: 35, borderRadius: 8 }} />
              </View>
              <View style={{ width: '90%', height: 80, flexDirection: 'row', marginLeft: '5%' }}>
                <View style={{ width: '80%' }}>
                  <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                  <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                </View>
                <View style={{ width: 75, height: 35, borderRadius: 8 }} />
              </View>
            </SkeletonPlaceholder>
            : <View>
                <View style={{ width: '100%', height: 50, marginTop: -10, alignItems: 'left' }}>
                  {/* <Text style={{ fontSize: 24, paddingLeft: '5%', paddingRight: '5%' }}>
                    <Text style={{ fontFamily: 'Lato_900Black', letterSpacing: 0.5, color: colors.text }}>DIP</Text>
                    <Text style={{ fontFamily: 'Lato_700Bold', letterSpacing: 0.5, color: colors.text }}>LIST</Text>
                  </Text> */}
                {isNewlyAdded
                  ? <LottieView
                      autoPlay
                      loop = {false}
                      style={{
                        width: width,
                        height: width * 1.8
                      }}
                      source={require('../../assets/lottie_assets/mobile_final_v2.json')}
                    />
                  : null
                }
                </View>
                { stockDetails.length > 0
                  ? isSubscribed === false
                    ? stockDetails.map((item, index) => (
                      index <= 0
                        ? <View key = {index}>
                            <SwipeListView
                              data = {[stockDetails[0]]}
                              renderItem = {renderItem}
                              renderHiddenItem = {renderHiddenItem}
                              rightOpenValue = {-126}
                              onRowOpen = {onRowOpen}
                              onRowClose = {onRowClose}
                              disableRightSwipe
                              leftActivationValue={100}
                              rightActivationValue={-200}
                              leftActionValue={0}
                              rightActionValue={-500}
                              onLeftAction={onLeftAction}
                              onRightAction={onRightAction}
                              onLeftActionStatusChange={onLeftActionStatusChange}
                              onRightActionStatusChange={onRightActionStatusChange}
                              // style = {{ paddingLeft: isSwiped ? 0 : '5%', paddingRight: isSwiped ? 0 : '5%' }}
                            />
                            {!trialStatus && stockDetails.length < 2
                              ? <HomeInvite/>
                              : null
                            }
                          </View>
                        : !trialStatus
                            ? <View>
                                <StockSectlocked card={item} index={index} key={index} />
                                {/* <HomeInvite/> */}
                              </View>
                            : <View>
                                <StockSectlocked card={item} index={index} key={index} />
                              </View>
                    ))
                    : <View >
                      <SwipeListView
                        data = {stockDetails}
                        renderItem = {renderItem}
                        renderHiddenItem = {renderHiddenItem}
                        rightOpenValue = {-126}
                        onRowOpen = {onRowOpen}
                        onRowClose = {onRowClose}
                        disableRightSwipe
                        leftActivationValue={100}
                        rightActivationValue={-200}
                        leftActionValue={0}
                        rightActionValue={-500}
                        onLeftAction={onLeftAction}
                        onRightAction={onRightAction}
                        onLeftActionStatusChange={onLeftActionStatusChange}
                        onRightActionStatusChange={onRightActionStatusChange}
                      />
                        {/* <HomeInvite/> */}
                      </View>
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
                }
              {/* {(stockDetails.length > 0
                ? stockDetails.map((item, index) => (
                  isSubscribed === false
                    ? index === 0
                      ? <StockSect card={item} index={index} key={index} />
                      : <StockSectlocked card={item} index={index} key={index} />
                    : <SwipeListView
                        data = {stockDetails}
                        renderItem = {renderItem}
                        renderHiddenItem = {renderHiddenItem}
                        // leftOpenValue = {75}
                        rightOpenValue = {-150}
                        disableRightSwipe
                      />
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
              )} */}
              </View>
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
        <View style={{ flex: 1, width: '100%', marginLeft: '0%', height: 'auto', marginTop: 30 }}>
          {loading
            ? <View style={{ marginLeft: '5%' }}>
              <SkeletonPlaceholder backgroundColor='#E1E9EE' highlightColor='#F2F8FC' speed={800}>
                <View style={{ width: '90%', height: 80 }}>
                  <View style={{ width: '100%' }}>
                    <View style={{ width: '40%', height: 40, borderRadius: 5 }} />
                    <View style={{ width: '100%', height: 25, marginTop: 10, borderRadius: 5 }} />
                    <View style={{ width: '100%', height: 25, marginTop: 5, borderRadius: 5 }} />
                  </View>
                </View>
                <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, marginTop: 50, flexDirection: 'row' }}>
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
                  <View style={{ width: '100%', height: 50, marginLeft: '5%', alignItems: 'left' }}>
                    <Text style={{ fontSize: 24 }}>
                      <Text style={{ fontFamily: 'Lato_700Bold', color: colors.text, fontSize: 24 }}>MARKETS</Text>
                    </Text>
                    <Text style={{ fontSize: 13, marginTop: 5 }}>
                      <Text style={{ fontFamily: 'Lato_400Regular', color: colors.text, lineHeight: 20, letterSpacing: 1 }}>Market indices constist of companies that represent a particular segment of the economy.</Text>
                    </Text>
                  </View>
                  <View style={{ marginTop: 50, flexDirection: 'row', width: '100%', height: 60, marginLeft: '5%', borderBottomWidth: 0.4, borderBottomColor: '#b2b2b2', alignItems: 'left' }}>
                    <View style={{ width: '50%' }}>
                      <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>DJIA</Text>
                      <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 29,891</Text>
                    </View>
                    <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                      <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Add</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.indicesSect}>
                    <View style={{ width: '50%' }}>
                      <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>NASDAQ</Text>
                      <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 30,000</Text>
                    </View>
                    <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                      <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Add</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.indicesSect}>
                    <View style={{ width: '50%' }}>
                      <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>S&P 500</Text>
                      <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 15,029</Text>
                    </View>
                    <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                      <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animatable.View>
              : <View style={{ marginTop: 10 }} >
                <View style={{ width: '100%', height: 50, marginLeft: '5%', alignItems: 'left' }}>
                  <Text style={{ fontSize: 24 }}>
                    <Text style={{ fontFamily: 'Lato_700Bold', color: colors.text, fontSize: 24 }}>MARKETS</Text>
                  </Text>
                  <Text style={{ fontSize: 13, marginTop: 5 }}>
                    <Text style={{ fontFamily: 'Lato_400Regular', color: colors.text, lineHeight: 20, letterSpacing: 1 }}>Market indices constist of companies that represent a particular segment of the economy.</Text>
                  </Text>
                </View>
                <View style={{ marginTop: 50, flexDirection: 'row', width: '100%', height: 60, marginLeft: '5%', borderBottomWidth: 0.4, borderBottomColor: '#b2b2b2', alignItems: 'left' }}>
                  <View style={{ width: '50%' }}>
                    <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>DJIA</Text>
                    <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 29,891</Text>
                  </View>
                  <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                    <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Add</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.indicesSect}>
                  <View style={{ width: '50%' }}>
                    <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>NASDAQ</Text>
                    <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 30,000</Text>
                  </View>
                  <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                    <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Add</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.indicesSect}>
                  <View style={{ width: '50%' }}>
                    <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>S&P 500</Text>
                    <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Last closed 15,029</Text>
                  </View>
                  <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
                    <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Add</Text>
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
function AddAtockBtn (navigation, isSubscribed, setisSubscribed, stockDetails) {
  const { colors } = useTheme()
  const [modal, setModal] = useState(false)
  const [fontsLoaded] = useFonts({
    Lato_300Light, Lato_400Regular, Lato_700Bold
  })
  const onAddStockBtnClick = () => {
    if (isSubscribed) {
      navigation.navigate('AddStock')
      setModal(false)
    } else {
      if (stockDetails.length > 0) {
        setModal(true)
      } else {
        navigation.navigate('AddStock')
        setModal(false)
      }
    }
  }
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    // colors.text
    return (
      <View style={{ width: (Dimensions.get('window').width), height: 30, alignContent: 'center', alignItems: 'center', marginTop: 40 }}>
        <TouchableHighlight style={[styles.ButtonAddStock, { backgroundColor: colors.text }]} onPress={onAddStockBtnClick} underlayColor='#000000'>
          <Text style={[styles.ButtonAddStockText, { color: colors.border, fontFamily: 'Lato_700Bold', lineHeight: 24, letterSpacing: 1 }]}>Add Stock</Text>
        </TouchableHighlight>
        <Modal
          visible={modal}
          contentContainerStyle={{ position: 'absolute' }}
          onDismiss={() => setModal(false)}
        >
          <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', height: height * 2 }}>
          <View style={{ paddingBottom: 20, backgroundColor: colors.card, borderRadius: 50, height: 370, bottom: '-30%' }}>
            <LottieView
              style={{ height: width, width: width, marginTop: -80, marginBottom: -220 }}
              source={require('../../assets/lottie_assets/padlock.json')}
              autoPlay
            />
            <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center', fontFamily: 'Lato_700Bold', letterSpacing: 2, color: colors.text }} > Unlock your limits</Text>
            <Text style={{ fontSize: 14, textAlign: 'left', paddingLeft: 24, paddingRight: 24, fontFamily: 'Lato_400Regular', marginTop: 20, letterSpacing: 1, color: colors.text, lineHeight: 26 }} >Rest easy knowing you’ll never miss a buying opportunity during a dip. Like last time...</Text>

            <Button style={{ width: '80%', borderRadius: 30, padding: 10, marginTop: 30, borderWidth: 1, borderColor: '#FFB801', alignSelf: 'center', backgroundColor: '#FFB801' }}
              labelStyle={{ fontWeight: 'bold', color: '#000000', fontFamily: 'Lato_700Bold' }}
              uppercase = {false}
              onPress={async () => {
                const userid = await firebaseuser()
                const token = registerForPushNotificationsAsync()
                setisSubscribed(true)
                const request = JSON.stringify({
                  pushToken: token,
                  userid: userid,
                  isSubscribed: true,
                  trialStatus: false,
                  trialEndRemainingDays: 30
                })
                const options = {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: request
                }
                await fetch(config.API_URL + 'StorePushToken', options)
                navigation.navigate('AddStock')
                setModal(false)
              }}
            >
              $9.99 Monthly
            </Button>
            <Button style={{ width: '80%', borderRadius: 30, padding: 10, marginTop: 10, alignSelf: 'center' }}
              labelStyle={{ color: colors.text }}
              uppercase = {false}
              onPress={async () => {
                setisSubscribed(false)
                setModal(false)
              }}
            >
              Maybe Later
            </Button>
            <Text style={{ fontSize: 8, textAlign: 'left', paddingLeft: 24, paddingRight: 24, marginTop: -2, letterSpacing: 0.5, color: colors.text }}>Your iTunes Account will be charged at confirmation of purchase. Subscription will be auto-renewed. Your account will be charged $2.99 US dollars for renewall within 24-hours before current period ends. You can manage subscription & turn-off in Account Settings.</Text>
          </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

function Home () {
  const [stockDetails, setStockDetails] = useState([])
  const [loading, setloading] = useState(true)
  const [slideUp, setSlideUp] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  // const [modal, setModal] = useState(true)
  // const { width } = Dimensions.get('window')

  const { isSubscribed, setisSubscribed } = useContext(Context)
  const { setTrialStatus } = useContext(ModalContext)

  const isFocused = useIsFocused()
  const { colors } = useTheme()

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    fetchData()
    getSubscribed()
    wait(2000).then(() => setRefreshing(false))
  }, [])
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
            key: i.toString(),
            stockname: json.data[i].stockname,
            stockpricewhenuseraddedit: json.data[i].stockpricewhenuseraddedit,
            triggerPrice: json.data[i].triggerPrice,
            userId: json.data[i].userId
          })
        }
      }
      setStockDetails(stocksArray)
      if (loading) {
        setloading(false)
        setSlideUp(true)
      } else {
        setSlideUp(false)
      }
      console.log('uid: ' + userid)
    } catch (error) {
      console.error(error)
    }
  }
  const getSubscribed = async () => {
    const userid = await firebaseuser()
    const request = JSON.stringify({
      userid: userid
    })
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: request
    }
    const response = await fetch(config.API_URL + 'GetPushToken', options)
    const json = await response.json()
    setisSubscribed(json.isSubscribed)
    setTrialStatus(json.trialStatus)
  }
  useEffect(() => {
    fetchData()
    getSubscribed()
    // const today = new Date()
    // const time = today.getHours() + ':' + today.getMinutes()
    // // console.log('isSubscribed: ' + isSubscribed)
    // if (time >= '18:25' && time <= '6:55') {
    //   // setDarkMode(true)
    //   EventRegister.emit('themeListener', true)
    // } else {
    //   // setDarkMode(false)
    //   EventRegister.emit('themeListener', false)
    // }
  }, [isFocused, isSubscribed])

  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {renderHeader(navigation)}
      <ScrollView
        refreshControl={<RefreshControl tintColor = {colors.text} refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {StockList(navigation, stockDetails, loading, slideUp, isSubscribed, onRefresh)}
        {loading
          ? <View style={{ marginLeft: '5%' }}>
            <SkeletonPlaceholder backgroundColor='#E1E9EE' highlightColor='#F2F8FC' speed={800}>
              <View style={{ width: '90%', height: 80 }}>
                <View style={{ width: '100%' }}>
                  <View style={{ width: '40%', height: 40, borderRadius: 5 }} />
                  <View style={{ width: '100%', height: 25, marginTop: 10, borderRadius: 5 }} />
                  <View style={{ width: '100%', height: 25, marginTop: 5, borderRadius: 5 }} />
                </View>
              </View>
              <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, marginTop: 50, flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                  <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                  <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                </View>
                {/* <View style={{ width: 75, height: 35, borderRadius: 8 }} /> */}
              </View>
              <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                  <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                  <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                </View>
                {/* <View style={{ width: 75, height: 35, borderRadius: 8 }} /> */}
              </View>
              <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80, flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                  <View style={{ width: 50, height: 20, borderRadius: 5 }} />
                  <View style={{ width: 100, height: 20, marginTop: 5, borderRadius: 5 }} />
                </View>
                {/* <View style={{ width: 75, height: 35, borderRadius: 8 }} /> */}
              </View>
            </SkeletonPlaceholder>
          </View>
          : <Communitypicks/>
        }
        {StockMarketsSect(loading, slideUp)}
      </ScrollView>
      {/* shadowOpacity: 1, shadowRadius: 4.65, */}
      <View style={{ marginTop: 10, borderTopWidth: 0.25, borderTopColor: '#e2e3e4', backgroundColor: '#fffff', shadowOffset: { height: 0, width: 0 } }}>
        {AddAtockBtn(navigation, isSubscribed, setisSubscribed, stockDetails)}
      </View>
      <LottieInvite/>
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
    // borderBottomWidth: 0.4,
    // borderBottomColor: '#b2b2b2',
    // alignItems: 'flex-start',
    paddingRight: 5
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
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    // borderRadius: 5,
    height: 60,
    margin: 5,
    width: '100%',
    paddingRight: 12,
    paddingBottom: 70,
    marginBottom: 15,
    borderBottomWidth: 0.4,
    borderBottomColor: '#b2b2b2',
    alignSelf: 'center',
    // shadowColor: '#999',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    elevation: 5
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '105%',
    margin: 5,
    marginBottom: 15,
    borderRadius: 5
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 64,
    paddingRight: 12
  },
  backRightBtnLeft: {
    backgroundColor: '#2B3033',
    right: 86
  },
  backRightBtnRight: {
    backgroundColor: '#EB5545',
    right: 11,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666'
  },
  details: {
    fontSize: 12,
    color: '#999'
  }
})
