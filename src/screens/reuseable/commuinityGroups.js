import React, { useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'

const backButton = require('../../../assets/backButton.png')
const backButtonDark = require('../../../assets/backButtonDark.png')

CommuinityGroups.propTypes = {
  route: PropTypes.string.isRequired
}
function CommuinityGroups ({ route }) {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const { groupName, groupDesc, stocks } = route.params
  // console.log(Object.keys(stocks.stocks), Object.values(stocks.stocks))
  // console.log(Object.keys(stocks.stocks).length)
  function RenderHeader () {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: 100,
        marginTop: 40
      }}>
        <View style={{ width: '20%', paddingLeft: 24, paddingTop: 15, height: 40 }}>
          <TouchableOpacity
          onPress = { () => {
            navigation.navigate('Home')
            console.log('OO')
          }}>
            <Image
              source={ colors.background === '#000000' ? backButtonDark : backButton }
              style={{ paddingLeft: 34, height: 16, width: 16 }}
            />
          </TouchableOpacity>
        </View>
        <View style = {{ width: '80%', alignSelf: 'flex-start', justifyContent: 'center', height: 40 }}>
          <Text style={{ color: colors.text, fontFamily: 'Lato_700Bold', padding: 10, textAlign: 'center', width: '75%', fontSize: 17 }}>
            {groupName}
          </Text>
          <Text style={{ color: colors.primary, fontFamily: 'Lato_300Light', padding: 0, textAlign: 'center', width: '75%', fontSize: 12 }}>
            {groupDesc}
          </Text>
        </View>
      </View>
    )
  }
  function GroupContent () {
    const [isEnabled, setIsEnabled] = useState(false)
    const [darkMode] = useState(false)
    const toggleSwitch = async () => {
      setIsEnabled(previousState => !previousState)
      console.log('toggle switch')
      console.log('isenabled: ' + isEnabled)
      if (!isEnabled) {
        console.log('enabled')
      } else {
        console.log('not enabled')
      }
    }
    return (
      <View style = {{ marginTop: 100 }}>
        <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', alignItems: 'left', borderBottomWidth: 0.4, borderBottomColor: '#b2b2b2', paddingBottom: '5%' }}>
          <Text style={{ fontSize: 24 }}>
            <Text style={{ fontFamily: 'Lato_700Bold', color: colors.text, fontSize: 24 }}>SUMMARY</Text>
          </Text>
          <Text style={{ fontSize: 13, marginTop: 15 }}>
            <Text style={{ fontFamily: 'Lato_400Regular', color: colors.text, lineHeight: 20, letterSpacing: 1 }}>Open and transparent about rationales for investing long term in techology, renewable energy and customer discrectionary spending stocks.</Text>
          </Text>
        </View>
        <View style={styles.indicesSect}>
          <View style={{ width: '70%' }}>
            <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>Follow “{groupName}”</Text>
            <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>Notify me of changes to this list</Text>
          </View>
          <ToggleSwitch
            isOn={isEnabled}
            onColor="#04D700"
            offColor = {darkMode ? 'rgb(78,78,78)' : '#C4C4C4'}
            size='large'
            onToggle={async () => await toggleSwitch()}
          />
        </View>
      </View>
    )
  }

  function StocksList ({ stockName, lastClose, marginTop }) {
    return (
      <View style={{ marginTop: marginTop, flexDirection: 'row', width: '90%', height: 60, marginLeft: '5%', borderBottomWidth: 0.4, borderBottomColor: '#b2b2b2', alignItems: 'left' }}>
        <View style={{ width: '50%' }}>
          <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>{stockName}</Text>
          <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>{lastClose}</Text>
        </View>
        <TouchableOpacity style={[styles.ButtonSet, { backgroundColor: colors.card }]} onPress={() => console.log('Button Tapped')} underlayColor='#fff'>
          <Text style={[styles.ButtonSetText, { color: colors.text, fontFamily: 'Lato_400Regular', fontSize: 14 }]}>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }
  StocksList.propTypes = {
    stockName: PropTypes.string.isRequired,
    lastClose: PropTypes.number.isRequired,
    marginTop: PropTypes.number.isRequired
  }

  return (
    <View >
      <View style={{ borderBottomWidth: 2, borderBottomColor: '#FFB801', paddingBottom: '2%' }}>
        <RenderHeader/>
        <GroupContent/>
      </View>
      {
        Object.keys(stocks.stocks).map((key, i) => (
          i === 0
            ? <StocksList stockName = { key } lastClose = {stocks.stocks[key]} marginTop = {50} key = {i}/>
            : <StocksList stockName = { key } lastClose = {stocks.stocks[key]} marginTop = {20} key = {i}/>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
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
  indicesSect: {
    marginTop: 25,
    flexDirection: 'row',
    width: '100%',
    height: 60,
    marginLeft: '5%',
    // borderBottomWidth: 0.4,
    // borderBottomColor: '#b2b2b2',
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

export default CommuinityGroups
