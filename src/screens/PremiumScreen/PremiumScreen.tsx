import {
  Block,
  Button,
  Colors,
  FocusAwareStatusBar,
  Row,
  Typography,
} from '@UIKit';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import styled from 'styled-components';
import {Alert, ImageBackground, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {PremiumItem} from './components/PremiumItem';
import {useAppSelector} from '@hooks';
import {getUserState, ILanguages} from '@store';
import {TextButton} from './components/TextButton';
import {adapty} from 'react-native-adapty';
import * as Model from 'react-native-adapty/lib/dist/types';

const image = require('@assets/images/car.webp');

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.PREMIUM_SCREEN
>;

export const PremiumScreen: React.FC<Props> = ({route, navigation}) => {
  const {
    params: {title},
  } = route;
  const {t} = useTranslation();
  const {selectedLanguage} = useAppSelector(getUserState);

  const [subscriptions, setSubscriptions] = useState<Model.AdaptyProduct[]>([]);

  const getPremium = useCallback(async () => {
    try {
      const paywall = await adapty.getPaywall('premium');
      const products = await adapty.getPaywallProducts(paywall);
      setSubscriptions(products);
      console.log(products);
      if (!products.length) {
        Alert.alert('Сервис вренно не доступен', undefined, [
          {text: 'OK', onPress: navigation.goBack},
        ]);
      }
    } catch (e) {
      Alert.alert('Сервис вренно не доступен', undefined, [
        {text: 'OK', onPress: navigation.goBack},
      ]);
    }
  }, []);

  useEffect(() => {
    getPremium();
  }, []);

  const [selectedSubscription, setSelectedSubscription] =
    useState<Model.AdaptyProduct | null>(null);

  const onPressSubscribe = useCallback(async () => {
    if (selectedSubscription) {
      const adaptyProfile = await adapty.makePurchase(selectedSubscription);
    }
  }, [selectedSubscription]);

  const onSelectSubscribeItem = useCallback(
    (subscription: Model.AdaptyProduct) => {
      setSelectedSubscription(subscription);
    },
    [setSelectedSubscription],
  );

  const onPressEula = useCallback(() => {
    const uri = `https://citysoft.kido.kg/docs/subscriptions${
      selectedLanguage === ILanguages.ru ? '' : `_${selectedLanguage}`
    }.php`;

    navigation.navigate(EScreens.WEBVIEW_SCREEN, {
      uri,
      title: t('settings.eula'),
    });
  }, [navigation]);

  const onPressAgreement = useCallback(() => {
    const uri = `https://citysoft.kido.kg/docs/license${
      selectedLanguage === ILanguages.ru ? '' : `_${selectedLanguage}`
    }.php`;

    navigation.navigate(EScreens.WEBVIEW_SCREEN, {
      uri,
      title: t('settings.userAgreement'),
    });
  }, [navigation]);

  const restorePurchase = useCallback(() => {
    Alert.alert('Restore Purchase');
  }, []);

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
              key={subscription.vendorProductId}
              active={
                selectedSubscription?.vendorProductId ===
                subscription.vendorProductId
              }
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
        <Row
          alignItems={'center'}
          justifyContent={'center'}
          paddingHorizontal={8}
          paddingVertical={16}>
          <TextButton
            title={t('premium.agreement')}
            onPress={onPressAgreement}
          />
          <Row flex={1} justifyContent={'center'}>
            <TextButton
              title={t('premium.restorePurchase')}
              onPress={restorePurchase}
            />
          </Row>
          <TextButton title={t('premium.eula')} onPress={onPressEula} />
        </Row>
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
