'use strict';

var path = require('node:path');

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
    }, nuxtOptions.nuxtSymbolIcons, moduleOptions);
    if (finalModuleOptions.enable) {
        const { svgSymbolIdPrefix } = finalModuleOptions;
        moduleContainer.extendBuild((config, { isClient }) => {
            if (isClient) {
                const svgDir = path.resolve(process.cwd(), srcDir, finalModuleOptions.svgSpriteLoaderIncludeDir);
                const svgRule = config.module?.rules.find((rule) => {
                    if (rule.test instanceof RegExp) {
                        return rule.test.test('.svg');
                    }
                });
                if (svgRule) {
                    svgRule.exclude = [svgDir];
                }
                const symbolId = `${svgSymbolIdPrefix}[name]`;
                config.module?.rules.push({
                    test: /\.svg$/,
                    include: [svgDir],
                    loader: 'svg-sprite-loader',
                    options: {
                        symbolId,
                    },
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

exports.runModule = runModule;
