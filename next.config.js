const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL || 'https://admin.asrstock.com/api/',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://asrstock.com/'
  },
})
