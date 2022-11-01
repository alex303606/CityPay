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
          '@store': './src/store/index.ts',
          '@hooks': './src/hooks/index.ts',
          '@navigators': './src/navigators/index.ts',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
