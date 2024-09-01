// next.config.js

const isProd = process.env.NODE_ENV === 'production';

const repoName = 'wed-dev'; // GitHub 리포지토리 이름으로 변경하세요

module.exports = {
    output: 'export',
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}`,
    // basePath: isProd ? `/${repoName}` : '',
    // assetPrefix: isProd ? `/${repoName}/` : '',
};