import { optimize, loadConfig } from 'svgo'

type LoaderContext = any

async function runLoader(this: LoaderContext, source: string) {
  const { getOptions, context, resourcePath } = this

  const { configFile, ...options } = getOptions()

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
