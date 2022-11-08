import React, {useCallback} from 'react';
import {Image} from 'react-native';
import {Block, Button, Colors, Row} from '@UIKit';
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
  const navToSMS = useCallback(() => {
    navigation.navigate(EScreens.SMS_CONFIRM_SCREEN);
  }, [navigation]);

  return (
    <Block
      backgroundColor={Colors.blue}
      flex={1}
      paddingVertical={32}
      paddingHorizontal={32}>
      <Row flex={1} justifyContent={'center'}>
        <StyledImage resizeMode="contain" source={logo} />
      </Row>
      <Block flex={1} justifyContent={'flex-end'}>
        <Button
          textColor={Colors.black}
          color={Colors.white}
          title={'Русский'}
          onPress={navToSMS}
        />
        <Button title={'Кыргыз тили'} onPress={navToSMS} />
      </Block>
    </Block>
  );
};

const StyledImage = styled(Image)({
  width: 250,
});
