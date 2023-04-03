import path from 'node:path'
import type { NuxtSymbolIconsOptions } from './interfaces/core'
import type { Module } from '@nuxt/types'

const runModule = (
  moduleContainer: ThisParameterType<Module>,
  moduleOptions: NuxtSymbolIconsOptions
) => {
  const { nuxt } = moduleContainer

  const nuxtOptions = nuxt.options
  const { srcDir } = nuxtOptions

  // Combine options
  const finalModuleOptions = Object.assign(
    {
      enable: true,
      svgSymbolIdPrefix: 'icon-',
      globalComponentName: 'SvgIcon',
      svgSpriteLoaderIncludeDir: 'assets/icons/svg',
      requireContextSvgDir: '~/assets/icons/svg',
      extraSvgSpriteLoaderOptions: {},
      extraPreLoaders: [],
    },
    nuxtOptions.nuxtSymbolIcons as NuxtSymbolIconsOptions,
    moduleOptions
  )

  if (finalModuleOptions.enable) {
    const { svgSymbolIdPrefix } = finalModuleOptions

    // extend webpack
    moduleContainer.extendBuild((config, { isClient }) => {
      if (isClient) {
        const svgDir = path.resolve(
          process.cwd(),
          srcDir,
          finalModuleOptions.svgSpriteLoaderIncludeDir
        )

        /* extend svg-sprite-loader */
        const svgRule = config.module?.rules.find((rule) => {
          if (rule.test instanceof RegExp) {
            return rule.test.test('.svg')
          }
        })

        if (svgRule) {
          svgRule.exclude = Array.isArray(svgRule.exclude)
            ? [...svgRule.exclude, svgDir]
            : [svgDir]
        }

        const symbolId = `${svgSymbolIdPrefix}[name]`

        config.module?.rules.push({
          test: /\.svg$/,
          include: [svgDir],
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId,
                ...finalModuleOptions.extraSvgSpriteLoaderOptions,
              },
            },
            ...finalModuleOptions.extraPreLoaders,
          ],
        })
      }
    })

    // add plugin
    moduleContainer.addPlugin({
      src: path.resolve(__dirname, './runtime/plugin.js'),
      fileName: 'nuxt-symbol-icons.js',
      options: finalModuleOptions,
      mode: 'client',
    })
  }
}

export { runModule }
