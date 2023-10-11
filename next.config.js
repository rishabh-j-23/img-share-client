/** @type {import('next').NextConfig} */
var ENVIROMENT = 'PROD';
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: ENVIROMENT == 'DEV' ? 'http://localhost:8080' : process.env.NEXT_PUBLIC_API_URL
    }
}

module.exports = nextConfig
