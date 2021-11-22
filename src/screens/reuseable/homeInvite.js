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
    <View >
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
          <View style={{ width: '55%', alignSelf: 'center' }}>
            <Text style={[styles.dns, { color: colors.text, fontFamily: 'Lato_700Bold', fontSize: 15, letterSpacing: 1 }]} numberOfLines={1}>
              Invite a friend
            </Text>
            <Text style={[styles.diplistStockSect, { color: colors.primary, fontFamily: 'Lato_400Regular', fontSize: 13, letterSpacing: 1, opacity: 0.7 }]} numberOfLines={1}>
              Get 30 days of premium
            </Text>
          </View>
          <View style={{ alignSelf: 'center' }}>
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
      {/* <Modal
          visible={modal}
          contentContainerStyle={{ position: 'absolute' }}
          onDismiss={() => setModal(false)}
        >
          <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', height: height * 2 }}>
          <View style={{ paddingBottom: 20, backgroundColor: colors.card, borderRadius: 50, height: 370, bottom: '-30%' }}>
            <LottieView
              style={{ height: width, width: width, marginTop: -80, marginBottom: -220 }}
              source={require('../../../assets/lottie_assets/padlock.json')}
              autoPlay
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', fontFamily: 'Lato_700Bold', letterSpacing: 2, color: colors.text }} > Unlock your limits</Text>
            <Text style={{ fontSize: 14, textAlign: 'left', paddingLeft: 24, paddingRight: 24, fontFamily: 'Lato_400Regular', marginTop: 20, letterSpacing: 1, color: colors.text, lineHeight: 26 }} >Rest easy knowing you’ll never miss a buying opportunity during a dip. Like last time...</Text>

            <Button style={{ width: '80%', borderRadius: 30, padding: 10, marginTop: 30, borderWidth: 1, borderColor: '#FFB801', alignSelf: 'center', backgroundColor: '#FFB801' }}
              labelStyle={{ fontWeight: 'bold', color: '#000000', fontFamily: 'Lato_700Bold' }}
              uppercase = {false}
            >
              $9.99 Monthly
            </Button>
            <Button style={{ width: '80%', borderRadius: 30, padding: 10, marginTop: 10, alignSelf: 'center' }}
              labelStyle={{ color: colors.text }}
              uppercase = {false}
              onPress={async () => {
                setModal(false)
              }}
            >
              Maybe Later
            </Button>
            <Text style={{ fontSize: 8, textAlign: 'left', paddingLeft: 24, paddingRight: 24, marginTop: -2, letterSpacing: 0.5, color: colors.text }}>Your iTunes Account will be charged at confirmation of purchase. Subscription will be auto-renewed. Your account will be charged $2.99 US dollars for renewall within 24-hours before current period ends. You can manage subscription & turn-off in Account Settings.</Text>
          </View>
          </View>
        </Modal> */}
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
