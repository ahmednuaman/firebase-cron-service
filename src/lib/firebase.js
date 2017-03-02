import * as firebase from 'firebase'

const { firebase: config } = require('../../config.json')

firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL
})

const finished = (callback) => (reason) => callback(reason)

export default (path, data, callback) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(config.email, config.password)
    .then(() => {
      console.log('Signed in')

      firebase
        .database()
        .ref(path)
        .set(data, finished(callback))
    }, finished(callback))
}
