import path from 'path'

import * as firebase from 'firebase'

const { firebase: config } = require(path.resolve(__dirname, '../config.json'))

const app = firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL
})

const error = (reason) => console.log('Sign in failed', reason)
const finish = () => process.exit()

firebase
  .auth()
  .signInWithEmailAndPassword(config.email, config.password)
  .then(null, error)

export default (path, data) => {
  firebase
    .database()
    .ref(path)
    .set(data)
    .then(finish, finish)
}
