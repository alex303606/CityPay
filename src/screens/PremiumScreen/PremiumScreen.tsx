import {
  Block,
  Button,
  Colors,
  FocusAwareStatusBar,
  Loader,
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
import {useAppDispatch, useAppSelector, useLoading} from '@hooks';
import {
  getUser,
  getUserState,
  getUserSuccess,
  ILanguages,
  setUserAccountTypeAndCarsLimit,
} from '@store';
import {adapty} from 'react-native-adapty';
import * as Model from 'react-native-adapty/lib/dist/types';
import Footer from './components/Footer';

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
  const {selectedLanguage, phone} = useAppSelector(getUserState);
  const {loading, hideLoader, showLoader} = useLoading();
  const dispatch = useAppDispatch();
  const [subscriptions, setSubscriptions] = useState<Model.AdaptyProduct[]>([]);

  const showError = useCallback(() => {
    return Alert.alert(
      t('errors.somethingWentWrong'),
      'Сервис временно не доступен',
      [{text: 'OK', onPress: navigation.goBack}],
    );
  }, []);

  const getPremium = useCallback(async () => {
    try {
      showLoader();
      const paywall = await adapty.getPaywall('premium');
      const products = await adapty.getPaywallProducts(paywall);
      setSubscriptions(products);
      hideLoader();
      if (!products.length) {
        return showError();
      }
    } catch (e) {
      hideLoader();
      return showError();
    }
  }, []);

  useEffect(() => {
    getPremium();
  }, []);

  const [selectedSubscription, setSelectedSubscription] =
    useState<Model.AdaptyProduct | null>(null);

  const makePurchaseSuccess = useCallback(
    async (profile: Model.AdaptyProfile) => {
      try {
        let isSubscribed = false;

        if (profile.accessLevels && profile.accessLevels['premium']) {
          isSubscribed = profile.accessLevels['premium'].isActive;
        }

        if (isSubscribed && profile.subscriptions) {
          let type: string | null = null;
          let date: string | null = null;

          if (!!profile.subscriptions['premium_annual_subscription']) {
            type = 'premium_annual_subscription';
            date = String(
              profile.subscriptions['premium_annual_subscription'].activatedAt,
            );
          }

          if (!!profile.subscriptions['premium_6month_subscription']) {
            type = 'premium_6month_subscription';
            date = String(
              profile.subscriptions['premium_6month_subscription'].activatedAt,
            );
          }

          if (!!profile.subscriptions['premium_monthly_subscription']) {
            type = 'premium_monthly_subscription';
            date = String(
              profile.subscriptions['premium_monthly_subscription'].activatedAt,
            );
          }

          if (!date || !type) {
            return showError();
          }

          const premium = await setUserAccountTypeAndCarsLimit({
            phone,
            isPremium: true,
            ufPurchaseStart: date,
            ufPurchaseType: type,
          });

          if (!premium || !premium.result) {
            return showError();
          }

          const response = await getUser(phone);

          if (!response?.result) {
            if (response?.message) {
              return Alert.alert(response.message, undefined, [
                {text: 'OK', onPress: navigation.goBack},
              ]);
            }
            return showError();
          }
          dispatch(
            getUserSuccess({
              ...response.data,
            }),
          );
          return navigation.navigate(EScreens.CARS_SCREEN);
        } else {
          return showError();
        }
      } catch (e) {
        return showError();
      }
    },
    [],
  );

  const onPressSubscribe = useCallback(async () => {
    if (selectedSubscription) {
      try {
        const profile = await adapty.makePurchase(selectedSubscription);
        await makePurchaseSuccess(profile);
      } catch (e) {
        return showError();
      }
    }
  }, [selectedSubscription]);

  const restorePurchase = useCallback(async () => {
    try {
      const restoreProfile = await adapty.restorePurchases();
      await makePurchaseSuccess(restoreProfile);
    } catch (e) {
      return showError();
    }
  }, []);

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
        {loading ? (
          <Loader color={Colors.white} backgroundColor={Colors.black} />
        ) : (
          <>
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
            <Row
              flex={1}
              justifyContent={'space-between'}
              paddingHorizontal={16}>
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
            <Footer
              onPressEula={onPressEula}
              restorePurchase={restorePurchase}
              onPressAgreement={onPressAgreement}
            />
          </>
        )}
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
