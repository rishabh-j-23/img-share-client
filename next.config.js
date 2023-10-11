/** @type {import('next').NextConfig} */
var ENVIROMENT = 'PROD';
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
    }
}

module.exports = nextConfig
