
interface NuxtSymbolIconsOptions {
  enable?: boolean
  svgSymbolIdPrefix?: string
  globalComponentName?: string
}

declare const NuxtSymbolIconsModule: (moduleOptions?: NuxtSymbolIconsOptions) => void

export default NuxtSymbolIconsModule