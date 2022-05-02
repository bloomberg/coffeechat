module.exports = {
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    'storybook-addon-outline',
    '@storybook/addon-measure',
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          // When you have splitted your css over multiple files
          // and use @import('./other-styles.css')
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          // When using postCSS 8
          implementation: require('postcss'),
        },
      },
    },
  ],
  stories: ['../src/**/*.stories.@(tsx|ts)'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (property) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        property.parent ? !/node_modules/.test(property.parent.fileName) : true,
    },
  },
  core: {
    builder: 'webpack5',
  },
}
