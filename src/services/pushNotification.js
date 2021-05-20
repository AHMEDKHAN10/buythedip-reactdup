import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import {
  Platform
} from 'react-native'

async function registerForPushNotificationsAsync () {
  if (!Constants.isDevice) {
    // ideally we should throw an Error then give alerts when they are caught
    alert('Must use physical device for push notifications')
    return
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!')
    return
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }
  return token
}

export default registerForPushNotificationsAsync
