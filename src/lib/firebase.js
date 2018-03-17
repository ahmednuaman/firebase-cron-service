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

let accessToken

const auth = () =>
  new Promise((resolve, reject) => {
    if (accessToken) {
      resolve(accessToken)
    }

    credential
      .getAccessToken()
      .then((auth) => {
        accessToken = auth.access_token

        resolve(accessToken)
      }, reject)
  })

const makeRequest = (method, path, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const bearer = await auth()

      request[method](`${config.databaseURL}/${path}.json`, {
        body,
        auth: { bearer },
        json: true
      }, (error, response, body) => {
        if (error) {
          console.log(error, response, body)
          reject(error)
        } else {
          resolve(body)
        }
      })
    } catch (error) {
      reject(error)
    }
  })

const getRequest = (path) => makeRequest('get', path)
const putRequest = (body, path) => makeRequest('put', path, body)

export const set = async (path, data, done) => {
  try {
    const response = await putRequest(data, path)

    done(null, response)
  } catch (error) {
    done(error)
  }
}

export const toggle = async (path, done) => {
  try {
    const currentValue = await getRequest(path)
    const response = await putRequest(!currentValue, path)

    done(null, response)
  } catch (error) {
    done(error)
  }
}
