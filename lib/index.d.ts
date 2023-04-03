import { RuleSetUseItem } from 'webpack';

type SVGSpriteLoaderOptions = Record<string, any>

interface NuxtSymbolIconsOptions {
  enable?: boolean
  svgSymbolIdPrefix?: string
  globalComponentName?: string
  requireContextSvgDir?: string
  svgSpriteLoaderIncludeDir?: string
  extraSvgSpriteLoaderOptions?: SVGSpriteLoaderOptions
  extraPreLoaders?: RuleSetUseItem[]
}

declare const NuxtSymbolIconsModule: (
  moduleOptions?: NuxtSymbolIconsOptions
) => void

export { NuxtSymbolIconsModule as default };
