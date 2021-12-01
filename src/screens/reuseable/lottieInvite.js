import React, { useContext } from 'react'
import {
  View,
  Text,
  Dimensions
} from 'react-native'
import { Button, Modal } from 'react-native-paper'
import LottieView from 'lottie-react-native'
import { Context } from '../../context/context'
import { ModalContext } from '../../context/modalContext'
import registerForPushNotificationsAsync from '../../services/pushNotification'
import firebaseuser from '../../firebase/firebaseconfig'
import config from '../../../config'
import { useTheme } from '@react-navigation/native'

function LottieInvite () {
  const { isSubscribed, setisSubscribed } = useContext(Context)
  const { inviteModal, setInviteModal, setTrialStatus, trialStatus } = useContext(ModalContext)
  const { width, height } = Dimensions.get('window')
  const { colors } = useTheme()
  const onPressTrial = async () => {
    const userid = await firebaseuser()
    const token = registerForPushNotificationsAsync()
    setisSubscribed(true)
    setTrialStatus(true)
    const request = JSON.stringify({
      pushToken: token,
      userid: userid,
      isSubscribed: true,
      trialStatus: true,
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
    setInviteModal(false)
  }
  return (
    <View style={{ width: (Dimensions.get('window').width), height: 'auto', alignContent: 'center', alignItems: 'center', marginTop: 40 }}>
      <Modal
        visible={inviteModal}
        contentContainerStyle={{ position: 'absolute' }}
        onDismiss={() => setInviteModal(false)}
      >
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', height: height * 2 }}>
        <View style={{ paddingBottom: 20, backgroundColor: colors.card, borderRadius: 50, height: 370, bottom: '-28%' }}>
          <LottieView
            style={{ height: width, width: width, marginTop: -80, marginBottom: -220 }}
            source={require('../../../assets/lottie_assets/padlock.json')}
            autoPlay
          />
          <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', fontFamily: 'Lato_700Bold', letterSpacing: 2, color: colors.text }} > Enjoy Premium</Text>
          <Text style={{ fontSize: 12, textAlign: 'left', paddingLeft: 24, paddingRight: 24, fontFamily: 'Lato_400Regular', marginTop: 20, letterSpacing: 1, color: colors.text, lineHeight: 26 }} >Thanks so much for sharing and supporting this app. You now can add unlimited stocks!</Text>

          <Button style={{ width: '80%', borderRadius: 30, padding: 10, marginTop: 30, borderWidth: 1, borderColor: '#FFB801', alignSelf: 'center', backgroundColor: '#FFB801' }}
            labelStyle={{ fontWeight: 'bold', color: '#000000', fontFamily: 'Lato_700Bold' }}
            uppercase = {false}
            onPress = {onPressTrial}
          >
            Start 30 day trial
          </Button>
          <Button style={{ width: '80%', borderRadius: 30, padding: 10, marginTop: 10, alignSelf: 'center' }}
            labelStyle={{ color: colors.text }}
            uppercase = {false}
            onPress={async () => {
              setInviteModal(false)
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

export default LottieInvite
