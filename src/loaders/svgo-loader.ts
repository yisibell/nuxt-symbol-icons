import { optimize } from 'svgo'
import loaderUtils from 'loader-utils'

type LoaderContext = any

async function runLoader(this: LoaderContext, source: string) {
  const { resourcePath } = this

  const options = Object.assign({}, loaderUtils.getOptions(this))

  const result = optimize(source, {
    ...options,
    path: resourcePath,
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
