import firebase from './lib/firebase'

export const handler = ({ path, data }, context, callback) => firebase(path, data, callback)
