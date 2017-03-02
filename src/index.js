import firebase from './lib/firebase'
import yargs from 'yargs'

const { data, path } = yargs
                        .usage('Usage: $0 --path /foo/bar --data {"foo": "bar"}')
                        .demandOption('path')
                        .demandOption('data')
                        .coerce({
                          data: JSON.parse
                        })
                        .argv

firebase(path, data)
