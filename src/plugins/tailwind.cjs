module.exports = function tailwindPlugin() {
  return {
    name: 'docusaurus-tailwindcss',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(require('@tailwindcss/postcss'));
      return postcssOptions;
    },
  };
};
