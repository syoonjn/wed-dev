const path = require('path');

module.exports = {
    output: 'export',
    basePath: '',
    assetPrefix: '',
    images: {
        unoptimized: true,
    },
    reactStrictMode: true,
    webpack: (config) => {
        // @를 프로젝트 루트로 매핑
        config.resolve.alias['@'] = path.resolve(__dirname, '.');

        // @/components를 app/components/index로 매핑
        config.resolve.alias['@/components'] = path.resolve(__dirname, 'app/components');

        return config;
    },
};