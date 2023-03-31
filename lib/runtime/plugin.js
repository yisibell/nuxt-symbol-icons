import Vue from 'vue'
import { SvgIcon } from 'vue-symbol-icon' // svg component

const moduleOptions = <%= JSON.stringify(options) %>

Vue.component(moduleOptions.globalComponentName, SvgIcon) // register globally

const req = require.context('~/assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)