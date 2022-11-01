module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@screens': './src/screens/index.ts',
          '@UIKit': './src/UIKit/index.ts',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
