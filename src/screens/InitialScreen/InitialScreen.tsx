import React from 'react';
import {Image} from 'react-native';
import {
  Block,
  Colors,
  Row,
} from '@UIKit';
import {EScreens} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigators';
import styled from 'styled-components';
const logo = require('@assets/images/logo.webp');

type Props = NativeStackScreenProps<
  AuthStackParamList,
  EScreens.INITIAL_SCREEN
>;

export const InitialScreen: React.FC<Props> = ({navigation}) => {
  return (
    <Block
      backgroundColor={Colors.blue}
      flex={1}
      paddingVertical={32}
      paddingHorizontal={16}>
      <Row flex={1} justifyContent={'center'}>
        <StyledImage resizeMode="contain" source={logo} />
      </Row>
    </Block>
  );
};

const StyledImage = styled(Image)({
  width: 250,
});
