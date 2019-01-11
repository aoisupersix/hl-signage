module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/hl-signage/'
    : '/',
  outputDir: 'docs',
};