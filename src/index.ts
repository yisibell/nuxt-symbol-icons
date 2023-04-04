import path from 'node:path'
import type { NuxtSymbolIconsOptions, SvgoConfig } from './interfaces/core'
import type { Module } from '@nuxt/types'
import { createSvgoConfig } from 'svgo-extra'
import type { RuleSetLoader } from 'webpack'
import SVGOLoader from './loaders/svgo-loader'

const isValidSvgoConfig = (
  value: boolean | SvgoConfig
): value is SvgoConfig => {
  if (value !== false) {
    return true
  }

  return false
}

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
      svgoConfig: {},
      enableSvgoPresetDefaultConfig: true,
    },
    nuxtOptions.nuxtSymbolIcons as NuxtSymbolIconsOptions,
    moduleOptions
  )

  if (finalModuleOptions.enable) {
    const {
      svgSymbolIdPrefix,
      extraPreLoaders,
      extraSvgSpriteLoaderOptions,
      svgoConfig,
      enableSvgoPresetDefaultConfig,
    } = finalModuleOptions

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

        const useLoaders: RuleSetLoader[] = [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId,
              ...extraSvgSpriteLoaderOptions,
            },
          },
        ]

        const incomingSvgoConfig = isValidSvgoConfig(svgoConfig)
          ? svgoConfig
          : svgoConfig === true
          ? {}
          : {}

        if (isValidSvgoConfig(svgoConfig)) {
          useLoaders.push({
            loader: path.resolve(__dirname, './svgo-loader.js'),
            options: createSvgoConfig(incomingSvgoConfig, {
              presetDefault: enableSvgoPresetDefaultConfig,
            }),
          })
        }

        if (extraPreLoaders && extraPreLoaders.length > 0) {
          extraPreLoaders.forEach((v) => {
            useLoaders.push(v)
          })
        }

        config.module?.rules.push({
          test: /\.svg$/,
          include: [svgDir],
          use: useLoaders,
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

export { runModule, SVGOLoader }
