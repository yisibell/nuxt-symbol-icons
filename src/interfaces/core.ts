import type { RuleSetUseItem } from 'webpack'

export type SVGSpriteLoaderOptions = Record<string, any>

export interface NuxtSymbolIconsOptions {
  enable?: boolean
  svgSymbolIdPrefix?: string
  globalComponentName?: string
  requireContextSvgDir?: string
  svgSpriteLoaderIncludeDir?: string
  extraSvgSpriteLoaderOptions?: SVGSpriteLoaderOptions
  extraPreLoaders?: RuleSetUseItem[]
}
