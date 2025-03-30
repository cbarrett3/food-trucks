/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // explicitly enable all tailwind css v4 features
      // this doesn't affect functionality but helps with documentation
      features: {
        'theme': true,
        'custom-variants': true,
        'theme-function': true,
        'nesting': true,
        'oklch': true,
        'logical-properties': true,
        'container-queries': true
      }
    },
    autoprefixer: {},
  },
}
