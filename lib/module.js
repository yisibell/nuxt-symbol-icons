const path = require('path')

const extendSvgSpriteLoader = (config, { svgSymbolIdPrefix }, srcDir) => {
  const svgDir = path.join(process.cwd(), srcDir, 'assets/icons/svg')

  /* extend svg-sprite-loader */
  const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
  svgRule.exclude = [svgDir]

  const symbolId = `${svgSymbolIdPrefix}[name]`

  config.module.rules.push({
    test: /\.svg$/,
    include: [svgDir],
    loader: 'svg-sprite-loader',
    options: {
      symbolId,
    },
  })

  return config
}

function symbolIconsModule(_moduleOptions) {
  const { nuxt } = this
  const nuxtOptions = nuxt.options
  const { srcDir } = nuxtOptions

  // Combine options
  const moduleOptions = Object.assign({ enable: true, svgSymbolIdPrefix: 'icon-' }, nuxtOptions.nuxtSymbolIcons, _moduleOptions)
  
  if (!moduleOptions.enable) return

  // extend webpack
  this.extendBuild((config, { isClient }) => {
    if (isClient) {
      extendSvgSpriteLoader(config, moduleOptions, srcDir)
    }
  })
  
  // add plugin
  this.addPlugin({
    src: path.join(__dirname, './runtime/plugin.js'),
    fileName: 'nuxt-symbol-icons.js',
    options: moduleOptions,
  })  
}

module.exports = symbolIconsModule
module.exports.meta = require('../package.json')