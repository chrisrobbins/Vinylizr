module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-module-resolver',
        {
          root: ['./'],
          alias: {
            '#common': './src/common',
            '#modules': './src/modules',
            '#views': './src/views',
            '#constants': './src/constants',
            '#src': './src',
            '#node_modules': './node_modules',
            '#contexts': './src/contexts',
            '#utils': './src/utils',
            '#screens': './screens',
            '#navigation': './navigation',
          },
        },
      ],
    ],
  };
};
