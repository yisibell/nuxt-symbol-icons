import Vue from 'vue'
import SvgIcon from 'vue-symbol-icon' // svg component

Vue.use(SvgIcon) // register globally

const req = require.context('~/assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)