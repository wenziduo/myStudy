const presets = [
  [
    '@babel/preset-env',
    {
      modules: false,
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
    },
  ],
  '@babel/preset-react',
  '@babel/preset-typescript',
];
const plugins = [
  ['@babel/plugin-syntax-dynamic-import', { loose: true }],
  ['@babel/plugin-transform-runtime', { loose: true }],
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
];
module.exports = { presets, plugins };
