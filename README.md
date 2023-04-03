
<p align="center">
  <a href="https://www.npmjs.org/package/nuxt-symbol-icons">
    <img src="https://img.shields.io/npm/v/nuxt-symbol-icons.svg">
  </a>
  <a href="https://npmcharts.com/compare/nuxt-symbol-icons?minimal=true">
    <img src="https://img.shields.io/npm/dm/nuxt-symbol-icons.svg">
  </a>
  <br>
</p>


# nuxt-symbol-icons

A nuxt(2) module for using svg sprite icon.

# Installation

```bash
# yarn
$ yarn add --dev nuxt-symbol-icons

# npm 
$ npm i nuxt-symbol-icons -D

# pnpm
$ pnpm add --dev nuxt-symbol-icons
```

# Usage

1. Configure your **nuxt.config.js**

```js
// nuxt.config.js

module.exports = {
  // ...
  buildModules: ['nuxt-symbol-icons'],
  nuxtSymbolIcons: {
    // ...
  }
}
```

2. Put your **SVG icon** into `~/assets/icons/svg/` folder.

3. then, you can use `<svg-icon name="icon-name" />` in projects. The `<svg-icon />` component powered by [vue-symbol-icon](https://github.com/yisibell/vue-symbol-icon)


# Options

| Key | Type | Default value | Description |
| :---: | :---: | :---: | :---: |
| `enable` | `boolean` | `true` | Whether to enable **nuxt-symbol-icons** |
| `svgSymbolIdPrefix` | `string` | `icon-` | Define the SVG symbol id prefix. |
| `globalComponentName` | `string` | `SvgIcon` | Define the global component name of `vue-symbol-icon`. |
| `svgSpriteLoaderIncludeDir` | `string` | `assets/icons/svg` | Define the include folder for **svg-sprite-loader**. |
| `requireContextSvgDir` | `string` | `~/assets/icons/svg` | Define the SVG icons folder for **Batch imports** via `require.context`. |
| `extraSvgSpriteLoaderOptions` | `Record<string, any>` | `{}` | Configure extra options for [svg-sprite-loader](https://github.com/JetBrains/svg-sprite-loader). |
| `extraPreLoaders` | `RuleSetUseItem[]` | `[]` |  Use some other loaders before **svg-sprite-loader** processes **SVG**. |

# CHANGE LOG

see [CHANGE LOG](./CHANGELOG.md)