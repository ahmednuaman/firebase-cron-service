import * as firebase from 'firebase-admin'

const { firebase: config } = require('../../config.json')
const serviceAccount = require('../../service-account-key.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: config.databaseURL
})

export default (path, data, callback) => {
  firebase
    .database()
    .ref(path)
    .set(data, callback)
}
