const { runModule } = require('./core.js')

const symbolIconsModule = (options) => {
  const moduleContainer = this
  runModule(moduleContainer, options)
}

module.exports = symbolIconsModule
module.exports.meta = require('../package.json')