const path = require('path');
const setConfigFile = require('../../util/set-config');

/**
 * @type {() => import('listr2').ListrTask<import('../../../typings/context').ListrContext>}
 */
const createVarnishConfig = () => ({
    title: 'Setting Varnish config',
    skip: (ctx) => !ctx.config.overridenConfiguration.configuration.varnish.enabled,
    task: async (ctx) => {
        const {
            ports,
            config: {
                overridenConfiguration,
                baseConfig: {
                    cacheDir
                }
            },
            isWsl,
            platform
        } = ctx;

        const {
            configuration: {
                varnish
            }
        } = overridenConfiguration;

        const isLinux = platform === 'linux';
        const isNativeLinux = isLinux && !isWsl;

        try {
            await setConfigFile({
                configPathname: path.join(
                    cacheDir,
                    'varnish',
                    'default.vcl'
                ),
                template: varnish.configTemplate,
                overwrite: true,
                templateArgs: {
                    hostMachine: isNativeLinux ? '127.0.0.1' : 'host.docker.internal',
                    nginxPort: ports.app
                }
            });
        } catch (e) {
            throw new Error(`Unexpected error accrued during varnish config creation\n\n${e}`);
        }
    }
});

module.exports = createVarnishConfig;
