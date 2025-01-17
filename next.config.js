const isProd = process.env.NODE_ENV === 'production';
const repoName = 'wed-dev'; // GitHub 리포지토리 이름

module.exports = {
    output: 'export',
    basePath: isProd ? `/${repoName}` : '',
    assetPrefix: isProd ? `/${repoName}/` : '',
    images: {
        unoptimized: true, // 이미지 최적화 비활성화
    },
};