import * as firebase from 'firebase-admin'

const { firebase: config } = require('../../config.json')
const serviceAccount = require('../../service-account-key.json')

firebase.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  databaseURL: config.databaseURL
})

const finished = (callback) => (reason) => callback(reason)

export default (path, data, callback) => {
  firebase
    .database()
    .ref(path)
    .set(data, finished(callback))
}
