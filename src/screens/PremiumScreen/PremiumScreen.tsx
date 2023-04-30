import {
  Block,
  Button,
  Colors,
  FocusAwareStatusBar,
  Row,
  Typography,
} from '@UIKit';
import React, {useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import styled from 'styled-components';
import {ImageBackground, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {PremiumItem} from './components/PremiumItem';

const image = require('@assets/images/car.webp');

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.PREMIUM_SCREEN
>;

export const PremiumScreen: React.FC<Props> = ({route}) => {
  const {
    params: {title},
  } = route;
  const {t} = useTranslation();

  const onPressSubscribe = useCallback(() => {
    return null;
  }, []);

  return (
    <StyledScrollView>
      <Block
        flex={1}
        backgroundColor={Colors.black}
        paddingTop={32}
        paddingBottom={32}>
        <FocusAwareStatusBar
          animated={true}
          backgroundColor={Colors.black}
          barStyle="light-content"
        />
        <StyledImageBackground source={image} resizeMode="cover">
          <Typography.R24 textAlign={'center'} color={Colors.white}>
            {title}
          </Typography.R24>
        </StyledImageBackground>
        <Typography.B34
          marginBottom={32}
          textAlign={'center'}
          color={Colors.white}>
          {t('premium.premium')}
        </Typography.B34>
        <Typography.R18
          marginBottom={16}
          textAlign={'center'}
          color={Colors.white}>
          {t('premium.description')}
        </Typography.R18>
        <Row flex={1} justifyContent={'space-between'} paddingHorizontal={16}>
          <PremiumItem />
          <PremiumItem />
          <PremiumItem />
        </Row>
        <Block paddingHorizontal={16}>
          <Button title={'Оформить подписку'} onPress={onPressSubscribe} />
        </Block>
      </Block>
    </StyledScrollView>
  );
};

const StyledScrollView = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.black,
  },
})({});

const StyledImageBackground = styled(ImageBackground)({
  height: 300,
  paddingHorizontal: 32,
});
