import { optimize, loadConfig } from 'svgo'
import loaderUtils from 'loader-utils'

type LoaderContext = any

async function runLoader(this: LoaderContext, source: string) {
  const { context, resourcePath } = this

  const { configFile, ...options } = loaderUtils.getOptions(this)

  let config

  if (typeof configFile === 'string') {
    config = await loadConfig(configFile, context)
  } else if (configFile !== false) {
    config = await loadConfig('', context)
  }

  const result = optimize(source, {
    path: resourcePath,
    ...config,
    ...options,
  })

  return result.data
}

function SVGOLoader(this: LoaderContext, source: string) {
  const callback = this.async()
  runLoader
    .call(this, source)
    .then((result) => callback(null, result))
    .catch((error) => callback(error))
}

export default SVGOLoader
