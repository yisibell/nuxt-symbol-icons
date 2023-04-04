import type { RuleSetUseItem } from 'webpack'
import type { Config as SvgoConfig } from 'svgo'

type SVGSpriteLoaderOptions = Record<string, any>

interface NuxtSymbolIconsOptions {
  enable?: boolean
  svgSymbolIdPrefix?: string
  globalComponentName?: string
  requireContextSvgDir?: string
  svgSpriteLoaderIncludeDir?: string
  extraSvgSpriteLoaderOptions?: SVGSpriteLoaderOptions
  extraPreLoaders?: RuleSetUseItem[]
  svgoConfig?: boolean | SvgoConfig
  enableSvgoPresetDefaultConfig?: boolean
}

export { SVGSpriteLoaderOptions, NuxtSymbolIconsOptions, SvgoConfig }
