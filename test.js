const index = require('./build/index')

const cb = (...args) => {
  console.log(...args)
  process.exit()
}

index.handler({
  path: '/gardenLights',
  data: true
}, null, cb)
