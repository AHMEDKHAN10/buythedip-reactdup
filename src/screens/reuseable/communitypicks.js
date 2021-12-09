import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { Avatar } from 'react-native-paper'
import { ModalContext } from '../../context/modalContext'
import { useNavigation, useTheme } from '@react-navigation/native'
import moneyBag from '../../../assets/money_bag.png'

function Communitypicks () {
  const { colors } = useTheme()
  const navigation = useNavigation()
  function CommunityComponent (props) {
    return (
      <TouchableOpacity onPress=
      {() => navigation.navigate('CommunityGroup', {
        groupName: props.name,
        groupDesc: props.desc
      })}>
      <View
        style={{
          marginTop: props.marginTop,
          flexDirection: 'row',
          width: '100%',
          height: 60,
          marginLeft: '5%',
          borderBottomWidth: 0.4,
          borderBottomColor: '#b2b2b2',
          alignItems: 'left'
        }}>
        <View style={{ width: '20%' }}>
          <Avatar.Image size={44} source={props.img} style={{ backgroundColor: 'white' }}/>
        </View>
        <View style={{ width: '70%' }}>
          <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]}>{props.name}</Text>
          <Text style={[styles.lastClose, { color: colors.text, fontSize: 13, fontFamily: 'Lato_400Regular', opacity: 0.7 }]}>{props.desc}</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ marginTop: 10, width: '90%' }} >
      <View style={{ width: '100%', height: 50, marginLeft: '5%', alignItems: 'left' }}>
        <Text style={{ fontSize: 24 }}>
          <Text style={{ fontFamily: 'Lato_700Bold', color: colors.text, fontSize: 24 }}>COMMUNITY PICKS</Text>
        </Text>
        <Text style={{ fontSize: 13, marginTop: 5 }}>
          <Text style={{ fontFamily: 'Lato_400Regular', color: colors.text, lineHeight: 20, letterSpacing: 1 }}>Lists are created from users, to help you discover trending stocks & investing strategies.</Text>
        </Text>
      </View>
      <CommunityComponent img={moneyBag} name='Meet Kevin’s Favs' desc='High conviction stocks' marginTop= {50}/>
      <CommunityComponent img={moneyBag} name='Invest like Ramit Sethi ' desc='Low-cost index funds' marginTop={20}/>
      <CommunityComponent img={moneyBag} name='Chamath Palihapitiya' desc='Focusing on positive social impact' marginTop={20}/>
      <CommunityComponent img={moneyBag} name='Momentum Stocks' desc='Memes, high risk and speculation' marginTop={20}/>
    </View>
  )
}

export default Communitypicks

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
  }
})
