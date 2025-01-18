const isProd = process.env.NODE_ENV === 'production';
const repoName = 'wed-dev';

module.exports = {
    output: 'export',
    basePath: isProd ? `/${repoName}` : '',
    assetPrefix: isProd ? `/${repoName}/` : '',
    images: {
        unoptimized: true,
    },
};