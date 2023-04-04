import Vue from 'vue'
import SvgIcon from 'vue-symbol-icon' // svg component

const moduleOptions = <%= JSON.stringify(options) %>

// register globally
Vue.use(SvgIcon, {
  globalComponentName: '<%= moduleOptions.globalComponentName %>',
  symbolIdPrefix: '<%= moduleOptions.svgSymbolIdPrefix %>'
})

const req = require.context('<%= options.requireContextSvgDir %>', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)