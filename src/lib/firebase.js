import * as firebase from 'firebase-admin'
import request from 'request'

const {
  firebase: config
} = JSON.parse(process.env.CONFIG)

const credential = firebase.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT_KEY))

firebase.initializeApp({
  credential: credential,
  databaseURL: config.databaseURL
})

export default (path, data, callback) => {
  credential
    .getAccessToken()
    .then(({ access_token: bearer }) => {
      request
        .put(`${config.databaseURL}/${path}.json`, {
          auth: { bearer },
          json: true,
          body: data
        }, (error, response, body) => {
          if (error) {
            callback(error, response, body)
          } else {
            callback(null, body)
          }
        })
    }, callback)
}
