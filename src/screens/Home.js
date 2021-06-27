import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Dimensions, TouchableOpacity, TouchableHighlight, Platform, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import firebaseuser from '../firebase/firebaseconfig'
import config from '../../config'
// import { ScrollView } from 'react-native-gesture-handler'

function renderHeader (navigation) {
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
        name='settings-outline' size={24} color='black' style={{ paddingTop: 10, paddingLeft: 35, width: '40%' }}
        onPress={() => {
          navigation.navigate('Settings')
        }}
      />
      <Text style={{ padding: 10, textAlign: 'left', width: '60%', fontSize: 23 }}>
        <Text style={{ fontWeight: '800' }}>DIP</Text>
        <Text style={{ fontWeight: '400' }}>LIST</Text>
      </Text>
    </View>
  )
}
function StockList (navigation, stockDetails) {
  // console.log('in stock list: ' + stockDetails[2].stockname)
  // eslint-disable-next-line react/prop-types
  const StockSect = ({ card, index }) => {
    return (
      // flex: 2, height: 80
      <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 80 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', width: '100%', height: 60, marginLeft: '0%', borderBottomWidth: 1, borderBottomColor: '#e2e3e4' }}
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
            <Text style={{ fontSize: 17 }}>
              {
                // eslint-disable-next-line react/prop-types
                card.stockname
              }
            </Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: '#6a6e70', fontWeight: '500' }}>
              {
                // eslint-disable-next-line react/prop-types
                card.stockpricewhenuseraddedit
              }
            </Text>
          </View>
          <TouchableHighlight style={styles.Button} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
            <Text style={styles.ButtonText}>$
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
  return (
    // flex:10, flex: 4, height: 300
    <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 'auto' }}>
      <View style={{ width: '100%', height: 50, marginTop: 30, marginLeft: '5%',  }}>
        <Text style={{ fontSize: 25 }}>
          <Text style={{ fontWeight: '800' }}>DIP</Text>
          <Text style={{ fontWeight: '400' }}>LIST</Text>
        </Text>
      </View>
      <View style={{ flex: 1, width: '100%', marginLeft: '5%', height: 'auto' }}>
      {/* <ScrollView style={{ flex: 1, width: '100%', marginLeft: '5%' }}> */}
        { Object.keys(stockDetails).length
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
              <Text style={{ fontSize: 17 }}>
                Loookup a Stock
              </Text>
              <Text style={{ marginTop: 4, fontSize: 14, color: '#6a6e70', fontWeight: '500' }}>
                Prices updated at market close
              </Text>
            </View>
            <TouchableHighlight style={styles.Button2} onPress={() => navigation.navigate('FirstScreen')} underlayColor='#fff'>
              <Text style={styles.ButtonText2}>
                Add
              </Text>
            </TouchableHighlight>
          </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  )
}
//  flex: 6, height: 50
function StockMarketsSect () {
  return (
    <View style={{ width: (Dimensions.get('window').width - (0.1 * (Dimensions.get('window').width))), height: 'auto' }}>
      <View style={{ width: '100%', height: 50, marginTop: 50, marginLeft: '5%',  }}>
        <Text style={{ fontSize: 25 }}>
          <Text style={{ fontWeight: '400' }}>INDICES</Text>
        </Text>
      </View>
      <View style={{ marginTop: 10, flexDirection: 'row', width: '100%', height: 60, marginLeft: '5%', borderBottomWidth: 1, borderBottomColor: '#e2e3e4',  }}>
        <View style={{ width: '50%' }}>
          <Text style={{ fontSize: 17 }}>DJIA</Text>
          <Text style={{ marginTop: 4, fontSize: 14, color: '#6a6e70', fontWeight: '500' }}>Last closed $29,891</Text>
        </View>
        <TouchableOpacity style={styles.ButtonSet} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
          <Text style={styles.ButtonSetText}>Set</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 40, flexDirection: 'row', width: '100%', height: 60, marginLeft: '5%', borderBottomWidth: 1, borderBottomColor: '#e2e3e4',  }}>
        <View style={{ width: '50%' }}>
          <Text style={{ fontSize: 17 }}>NASDAQ</Text>
          <Text style={{ marginTop: 4, fontSize: 14, color: '#6a6e70', fontWeight: '500' }}>Last closed $30,000</Text>
        </View>
        <TouchableOpacity style={styles.ButtonSet} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
          <Text style={styles.ButtonSetText}>Set</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 40, flexDirection: 'row', width: '100%', height: 60, marginLeft: '5%', borderBottomWidth: 1, borderBottomColor: '#e2e3e4',  }}>
        <View style={{ width: '50%' }}>
          <Text style={{ fontSize: 17 }}>S&P 500</Text>
          <Text style={{ marginTop: 4, fontSize: 14, color: '#6a6e70', fontWeight: '500' }}>Last closed $15,029</Text>
        </View>
        <TouchableOpacity style={styles.ButtonSet} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
          <Text style={styles.ButtonSetText}>Set</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
// flex: 1, height: 50
function AddAtockBtn (navigation) {
  return (
    <View style={{ width: (Dimensions.get('window').width), height: 'auto', alignContent: 'center', alignItems: 'center', marginTop: 40 }}>
      <TouchableHighlight style={styles.ButtonAddStock} onPress={() => navigation.navigate('FirstScreen')} underlayColor='#fff'>
        <Text style={styles.ButtonAddStockText}>Add Stock</Text>
      </TouchableHighlight>
    </View>
  )
}
// const sleep = (milliseconds) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

// eslint-disable-next-line react/prop-types
function Home () {
  const [stockDetails, setStockDetails] = useState([])
  const isFocused = useIsFocused()

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
      setStockDetails(stocksArray)
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
    <SafeAreaView style={styles.container}>
      {renderHeader(navigation)}
      <ScrollView>
      {StockList(navigation, stockDetails)}
      {StockMarketsSect()}
      </ScrollView>
      <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: '#e2e3e4', shadowOpacity: 1, shadowRadius: 4.65, backgroundColor: '#fffff', shadowOffset: { height: 0, width: 0 } }}>
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
    backgroundColor: '#fff',
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
  }
})
