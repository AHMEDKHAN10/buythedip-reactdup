import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Platform
} from 'react-native'
import stocks from '../constants'
import { Menu } from 'react-native-paper'
import Autocomplete from 'react-native-autocomplete-input'
import configg from '../../config'
const height = Dimensions.get('screen').height
// * localhost api http://127.0.0.1:3000/
// * backend api https://buythedipapi.herokuapp.com/
function FirstScreen () {
  const navigation = useNavigation()
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [price, setPrice] = useState('')

  const StockName = async (name) => {
    const request = JSON.stringify({
      stock: name
    })
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: request
    }
    console.log(configg.API_URL)
    const response = await fetch(configg.API_URL + 'getStockName', options)
    const json = await response.json()
    console.log('price in stockname func in Firstscreen: ' + json.price)
    return (json.price)
  }

  function renderHeader (navigation) {
    return (
      <View
        style={{
          flex: 1,
          paddingRight: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          height: 10
        }}
      >
        <Text
          style={{
            padding: 10,
            textAlign: 'right',
            width: '67%',
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
        <Text
          style={{
            padding: 10,
            paddingTop: 15,
            textAlign: 'right',
            width: '33%',
            fontSize: 18,
            height: 50,
            color: '#6fcc51'
          }}
          onPress={() => {
            navigation.navigate('Home', {
              StockName: 'No specific stock selected'
            })
          }}
        >
          Skip
        </Text>
      </View>
    )
  }

  useEffect(() => {
    const stuff = []
    if (query === '') {
      setData([])
    } else if (query.length === 1) {
      // eslint-disable-next-line array-callback-return
      stocks[query].map((element) => {
        stuff.push(element)
      })
    } else if (query.length > 1) {
      stocks[query[0]].forEach((element) => {
        if (element.symbol.search(query) === 0) {
          stuff.push(element)
        }
      })
    }
    if (stuff === [] || stuff.length === 1) {
      setData([])
    } else {
      setData(stuff)
    }
  }, [query])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (Platform.OS === 'ios') ? 0 : 35
      }}>
      {renderHeader(navigation)}
      <View style={{ flex: 3, padding: 10, width: Dimensions.get('window').width }}>
       <Autocomplete
         data={data}
          defaultValue={query}
          placeholder="GME"
          onChangeText={(value) => setQuery(value)}
          renderItem={({ item, index }) => (
            <Menu.Item
              key={index}
              onPress={async () => {
                setQuery(item.symbol)
                setData([])
                //* to send company name to next screen
                const pricee = await StockName(item.symbol)
                setPrice(pricee)
                console.log('price: ', pricee)
                if (pricee === 'Stock price not available') {
                  alert(pricee)
                } else {
                  navigation.navigate('SetAlert', {
                    stockName: item.symbol,
                    price: '$ ' + pricee
                  })
                }
              }}
              title={
                <Text style={{ fontWeight: 'bold' }}>
                  {item.symbol}{' '}
                  <Text style={{ fontSize: 10 }}>{item.name}</Text>
                </Text>
              }
            />
          )}
          style={{
            fontWeight: '400',
            letterSpacing: 4,
            textAlign: 'center',
            fontSize: 80,
            height: 90
          }}
          listStyle={{ maxHeight: 0.4 * height, borderColor: 'transparent' }}
          flatListProps={{ showsVerticalScrollIndicator: false }}
          inputContainerStyle={{ borderColor: 'transparent' }}
          keyExtractor={(item, index) => {
            return item.symbol
          }}

          autoCapitalize="characters"
        />
        { price === 'Stock price not available' || null
          ? <Text
            placeholder='abc'
            style={{
              fontWeight: '400',
              marginTop: 4,
              color: '#c6c8c9',
              textAlign: 'center'
            }}
          >
            last closed at $567.99
          </Text>
          : <Text
            placeholder='abc'
            style={{
              fontWeight: '400',
              marginTop: 4,
              color: '#000',
              textAlign: 'center'
            }}
          >
            last closed at ${price}
          </Text>
        }
      </View>
    </SafeAreaView>
  )
}

export default FirstScreen
