'use strict';

var path = require('node:path');
var svgoExtra = require('svgo-extra');
var svgo = require('svgo');
var loaderUtils = require('loader-utils');

async function runLoader(source) {
    const { context, resourcePath } = this;
    const { configFile, ...options } = loaderUtils.getOptions(this);
    let config;
    if (typeof configFile === 'string') {
        config = await svgo.loadConfig(configFile, context);
    }
    else if (configFile !== false) {
        config = await svgo.loadConfig('', context);
    }
    const result = svgo.optimize(source, {
        path: resourcePath,
        ...config,
        ...options,
    });
    return result.data;
}
function SVGOLoader(source) {
    const callback = this.async();
    runLoader
        .call(this, source)
        .then((result) => callback(null, result))
        .catch((error) => callback(error));
}

const isValidSvgoConfig = (value) => {
    if (value !== false) {
        return true;
    }
    return false;
};
const runModule = (moduleContainer, moduleOptions) => {
    const { nuxt } = moduleContainer;
    const nuxtOptions = nuxt.options;
    const { srcDir } = nuxtOptions;
    const finalModuleOptions = Object.assign({
        enable: true,
        svgSymbolIdPrefix: 'icon-',
        globalComponentName: 'SvgIcon',
        svgSpriteLoaderIncludeDir: 'assets/icons/svg',
        requireContextSvgDir: '~/assets/icons/svg',
        extraSvgSpriteLoaderOptions: {},
        extraPreLoaders: [],
        svgoConfig: {},
        enableSvgoPresetDefaultConfig: true,
    }, nuxtOptions.nuxtSymbolIcons, moduleOptions);
    if (finalModuleOptions.enable) {
        const { svgSymbolIdPrefix, extraPreLoaders, extraSvgSpriteLoaderOptions, svgoConfig, enableSvgoPresetDefaultConfig, } = finalModuleOptions;
        moduleContainer.extendBuild((config, { isClient }) => {
            if (isClient) {
                const svgDir = path.resolve(process.cwd(), srcDir, finalModuleOptions.svgSpriteLoaderIncludeDir);
                const svgRule = config.module?.rules.find((rule) => {
                    if (rule.test instanceof RegExp) {
                        return rule.test.test('.svg');
                    }
                });
                if (svgRule) {
                    svgRule.exclude = Array.isArray(svgRule.exclude)
                        ? [...svgRule.exclude, svgDir]
                        : [svgDir];
                }
                const symbolId = `${svgSymbolIdPrefix}[name]`;
                const useLoaders = [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            symbolId,
                            ...extraSvgSpriteLoaderOptions,
                        },
                    },
                ];
                const incomingSvgoConfig = isValidSvgoConfig(svgoConfig)
                    ? svgoConfig
                    : svgoConfig === true
                        ? {}
                        : {};
                if (isValidSvgoConfig(svgoConfig)) {
                    useLoaders.push({
                        loader: path.resolve(__dirname, './svgo-loader.js'),
                        options: svgoExtra.createSvgoConfig(incomingSvgoConfig, {
                            presetDefault: enableSvgoPresetDefaultConfig,
                        }),
                    });
                }
                if (extraPreLoaders && extraPreLoaders.length > 0) {
                    extraPreLoaders.forEach((v) => {
                        useLoaders.push(v);
                    });
                }
                config.module?.rules.push({
                    test: /\.svg$/,
                    include: [svgDir],
                    use: useLoaders,
                });
            }
        });
        moduleContainer.addPlugin({
            src: path.resolve(__dirname, './runtime/plugin.js'),
            fileName: 'nuxt-symbol-icons.js',
            options: finalModuleOptions,
            mode: 'client',
        });
    }
};

exports.SVGOLoader = SVGOLoader;
exports.runModule = runModule;
