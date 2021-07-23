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
  ],
  stories: ['../src/**/*.stories.@(tsx|ts)'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (property) =>
        property.parent ? !/node_modules/.test(property.parent.fileName) : true,
    },
  },
}
