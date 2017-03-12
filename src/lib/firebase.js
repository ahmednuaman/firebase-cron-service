import * as firebase from 'firebase-admin'
import request from 'request'

const { firebase: config } = require('../../config.json')
const serviceAccount = require('../../service-account-key.json')
const credential = firebase.credential.cert(serviceAccount)

firebase.initializeApp({
  credential: credential,
  databaseURL: config.databaseURL
})

export default (path, data, callback) => {
  credential
    .getAccessToken()
    .then(({ access_token }) => {
      request
        .put(`${config.databaseURL}/${path}.json`, {
          auth: {
            bearer: access_token
          },
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
