import React, { useContext } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'
import { ModalContext } from '../../context/modalContext'
import { useTheme } from '@react-navigation/native'
import moneyBag from '../../../assets/money_bag.png'

function homeInvite () {
  const { colors } = useTheme()
  const { inviteModal, setInviteModal } = useContext(ModalContext)
  const onInviteClick = () => {
    console.log('inviteModal: ' + inviteModal)
    setInviteModal(!inviteModal)
  }
  return (
    <View style={{ paddingLeft: '5%', paddingRight: '5%' }}>
      <TouchableHighlight style={[styles.diplistSect, {
        shadowColor: '#ffff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
      }]}>
        <View style = {{ flexDirection: 'row' }}>
          <View style={{ width: '20%', alignSelf: 'center' }}>
            <Image source={moneyBag} style={{ width: '60%', height: 50 }}/>
          </View>
          <View style={{ width: '55%', alignSelf: 'center', marginLeft: -10 }}>
            <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]} numberOfLines={1}>
              Invite a friend
            </Text>
            <Text style={[styles.diplistStockSect, { color: colors.primary, fontFamily: 'Lato_400Regular', fontSize: 13, letterSpacing: 1, opacity: 0.7 }]} numberOfLines={1}>
              Get 30 days of premium
            </Text>
          </View>
          <View style={{ alignSelf: 'center', marginLeft: 13 }}>
            <TouchableHighlight
              style={[styles.Button]}
              underlayColor='#ffb38a'
              onPress = {onInviteClick}
            >
              <Text style={[styles.ButtonText, { fontFamily: 'Lato_400Regular', fontSize: 14, letterSpacing: 1 }]}>
                Invite
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default homeInvite

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
    justifyContent: 'center',
    backgroundColor: '#FFB801'
  },
  ButtonText: {
    color: '#2b3033',
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
    width: 65,
    paddingRight: 14
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
