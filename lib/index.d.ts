import { RuleSetUseItem } from 'webpack';
import { Config } from 'svgo';

type SVGSpriteLoaderOptions = Record<string, any>

interface NuxtSymbolIconsOptions {
  enable?: boolean
  svgSymbolIdPrefix?: string
  globalComponentName?: string
  requireContextSvgDir?: string
  svgSpriteLoaderIncludeDir?: string
  extraSvgSpriteLoaderOptions?: SVGSpriteLoaderOptions
  extraPreLoaders?: RuleSetUseItem[]
  svgoConfig?: boolean | Config
  enableSvgoPresetDefaultConfig?: boolean
}

declare const NuxtSymbolIconsModule: (
  moduleOptions?: NuxtSymbolIconsOptions
) => void

export { NuxtSymbolIconsModule as default };
