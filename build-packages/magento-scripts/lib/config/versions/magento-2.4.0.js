const path = require('path');
const { defaultMagentoConfig } = require('../magento-config');
const { varnish60 } = require('../varnish/varnish-6-0');

module.exports = ({ templateDir } = {}) => ({
    magentoVersion: '2.4.0',
    configuration: {
        php: {
            version: '7.4.27',
            configTemplate: path.join(templateDir || '', 'php.template.ini'),
            extensions: {
                gd: {},
                intl: {},
                zlib: {},
                openssl: {},
                sockets: {},
                SimpleXML: {},
                xdebug: {
                    version: '3.1.2'
                },
                apcu: {},
                opcache: {
                    extensionName: 'Zend OPcache'
                }
            }
        },
        nginx: {
            version: '1.18.0',
            configTemplate: path.join(templateDir || '', 'nginx.template.conf')
        },
        redis: {
            version: '5'
        },
        mysql: {
            version: '8.0'
        },
        mariadb: {
            version: '10.2'
        },
        elasticsearch: {
            version: '7.6.2'
        },
        composer: {
            version: '1'
        },
        varnish: varnish60({ templateDir })
    },
    magento: defaultMagentoConfig,
    host: 'localhost',
    ssl: {
        enabled: false
    }
});
