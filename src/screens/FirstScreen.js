import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Dimensions
} from 'react-native'
import stocks from '../constants'
import { Menu } from 'react-native-paper'
import Autocomplete from 'react-native-autocomplete-input'

const height = Dimensions.get('screen').height

function FirstScreen () {
  const navigation = useNavigation()
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [price, setPrice] = useState([])
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
    // console.log('uid', userid)
    // console.log("name: "+ options.body)
    const response = await fetch('http://127.0.0.1:3000/getStockName', options)
    const json = await response.json()
    console.log('json: ', json)
    setPrice(json.price)
  }

  function renderHeader (navigation) {
    return (
      // flex:1,
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
          <Text style={{ fontWeight: '800' }}>DIP</Text>
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
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      {renderHeader(navigation)}
      <View
        style={{ flex: 3, padding: 10, width: Dimensions.get('window').width }}
      >
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
                await StockName(item.symbol)
                console.log('price: ', price)
                if (price === 'Stock price not available') {
                  alert(price)
                } else {
                  navigation.navigate('SetAlert', {
                    otherParam: item.symbol,
                    price: '$' + price
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
        { price === 'Stock price not available'
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
          las closed at ${price}
          </Text>}
      </View>
    </SafeAreaView>
  )
}

export default FirstScreen
