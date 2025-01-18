const isProd = process.env.NODE_ENV === 'production';
const repoName = 'wed-dev';
const path = require('path');

module.exports = {
    output: 'export',
    basePath: isProd ? `/${repoName}` : '',
    assetPrefix: isProd ? `/${repoName}/` : '',
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