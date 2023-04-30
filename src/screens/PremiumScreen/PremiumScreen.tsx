import {
  Block,
  Button,
  Colors,
  FocusAwareStatusBar,
  Row,
  Typography,
} from '@UIKit';
import React, {useCallback, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import styled from 'styled-components';
import {Alert, ImageBackground, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {PremiumItem} from './components/PremiumItem';
import {Footer} from './components/Footer';

const image = require('@assets/images/car.webp');

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.PREMIUM_SCREEN
>;

export type ISubscription = {
  id: number;
  validity: string;
  price: string;
};

const subscriptions: ISubscription[] = [
  {
    id: 0,
    validity: '1 месяц',
    price: '$4.99',
  },
  {
    id: 1,
    validity: '6 месяцев',
    price: '$29.99',
  },
  {
    id: 2,
    validity: '1 год',
    price: '$49.99',
  },
];

export const PremiumScreen: React.FC<Props> = ({route}) => {
  const {
    params: {title},
  } = route;
  const {t} = useTranslation();
  const [selectedSubscription, setSelectedSubscription] =
    useState<ISubscription | null>(null);

  const onPressSubscribe = useCallback(() => {
    if (selectedSubscription) {
      Alert.alert(JSON.stringify(selectedSubscription));
    }
  }, [selectedSubscription]);

  const onSelectSubscribeItem = useCallback(
    (subscription: ISubscription) => {
      setSelectedSubscription(subscription);
    },
    [setSelectedSubscription],
  );

  return (
    <StyledScrollView>
      <Block flex={1} backgroundColor={Colors.black} paddingTop={32}>
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
          marginBottom={32}
          textAlign={'center'}
          color={Colors.white}>
          {t('premium.description')}
        </Typography.R18>
        <Row flex={1} justifyContent={'space-between'} paddingHorizontal={16}>
          {subscriptions.map(subscription => (
            <PremiumItem
              active={selectedSubscription?.id === subscription.id}
              subscription={subscription}
              onPress={onSelectSubscribeItem}
            />
          ))}
        </Row>
        <Block paddingHorizontal={16} paddingTop={32} paddingBottom={16}>
          <Button
            disabled={!selectedSubscription}
            title={t('premium.subscribe')}
            onPress={onPressSubscribe}
          />
        </Block>
        <Footer />
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
