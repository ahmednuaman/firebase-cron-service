import * as firebase from './lib/firebase'

const path = process.env.FIREBASE_PATH

export const set = ({ data }, context, done) => firebase.set(path, data, done)
export const toggle = (event, context, done) => firebase.toggle(path, done)
