// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, './')],
    },
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname);
        return config;
    },
    compiler: {
        removeConsole: !isDev,
    },
};

module.exports = nextConfig;
