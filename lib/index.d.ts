interface NuxtSymbolIconsOptions {
  enable?: boolean
  svgSymbolIdPrefix?: string
  globalComponentName?: string
  requireContextSvgDir?: string
  svgSpriteLoaderIncludeDir?: string
}

declare const NuxtSymbolIconsModule: (
  moduleOptions?: NuxtSymbolIconsOptions
) => void

export { NuxtSymbolIconsModule as default };
