import * as firebase from 'firebase'
import config from '../../config'

const firebaseConfig = {
  apiKey: config.Firebase_ApiKey,
  authDomain: config.Firebase_AuthDomain,
  databaseURL: config.Firebase_DatabaseURL,
  projectId: config.Firebase_ProjectId,
  storageBucket: config.Firebase_StorageBucket,
  messagingSenderId: config.Firebase_messagingSenderId,
  appId: config.Firebase_AppId,
  measurementId: config.Firebase_MeasurementId
}

async function StoreFirebase () {
  console.log(firebaseConfig)
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app() // if already initialized, use that one
  }
  let userid
  await firebase.auth().signInAnonymously()
  try {
    await firebase.auth().onAuthStateChanged(firebaseUser => {
      if (!firebaseUser) {
        console.log('user is not signed in')
      }
      userid = firebaseUser.uid
    })
    return (userid)
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    return (errorCode + ': ' + errorMessage)
  }
}

export default StoreFirebase
