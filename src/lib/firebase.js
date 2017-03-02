import path from 'path'

import * as firebase from 'firebase'

const { firebase: config } = require(path.resolve(__dirname, '../config.json'))

firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL
})

const error = (callback) => (reason) => callback(reason)
const finish = (callback) => () => callback()

export default (path, data, callback) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(config.email, config.password)
    .then(() => {
      firebase
        .database()
        .ref(path)
        .set(data)
        .then(finish(callback), error(callback))
    }, error(callback))
}
