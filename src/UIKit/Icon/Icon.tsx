import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {IconProps} from 'react-native-vector-icons/Icon';
const config = require('./config.json');

export enum IconNames {
  profile = 'profile',
  fines = 'fines',
  help = 'help',
  check = 'check',
  myAuto = 'myAuto',
  clipboard = 'clipboard',
  code = 'code',
  tablet = 'tablet',
  shield = 'shield',
  close = 'close',
}

export const IconSet = createIconSetFromIcoMoon(config);

export const Icon: React.FC<IconProps> = ({size = 24, ...rest}) => {
  return <IconSet size={size} {...rest} style={{lineHeight: size}} />;
};
