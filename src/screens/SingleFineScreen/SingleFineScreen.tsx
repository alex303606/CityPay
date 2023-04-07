import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Block,
  Button,
  Colors,
  Loader,
  Row,
  ScreenContainer,
  Typography,
  WINDOW_WIDTH,
} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import {ActivityIndicator, Image, Pressable} from 'react-native';
import styled from 'styled-components';
import {useLoading, useSnackbarNotification, useTheme} from '@hooks';
import {getCurrentAmount, IFinesType} from '@store';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.SINGLE_FINE_SCREEN
>;

export const SingleFineScreen: React.FC<Props> = ({route, navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {
    params: {fine},
  } = route;

  const {loading, hideLoader, showLoader} = useLoading();
  const {
    loading: imageLoading,
    hideLoader: hideImageLoader,
    showLoader: showImageLoader,
  } = useLoading();
  const {showNotification} = useSnackbarNotification();
  const [amount, setAmount] = useState(0);

  const getCurrentAmountHandler = useCallback(async () => {
    showLoader();
    const response = await getCurrentAmount(fine.paymentNumber);
    hideLoader();
    if (!response?.result) {
      if (response?.message) {
        return showNotification(response.message);
      }
      return showNotification(t('errors.somethingWentWrong'));
    }
    if (!response?.data) {
      return showNotification(t('errors.somethingWentWrong'));
    }
    if (!response.data.current_amount) {
      return showNotification(t('fines.codeNotFound'));
    }

    setAmount(response.data.current_amount);
  }, [fine.paymentNumber, hideLoader, showLoader, showNotification, t]);

  useEffect(() => {
    getCurrentAmountHandler();
  }, [getCurrentAmountHandler]);

  const date = new Date(fine.violationDate).toLocaleString('ru', {
    minute: 'numeric',
    hour: 'numeric',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const onHandlePressPay = useCallback(() => {
    navigation.navigate(EScreens.PAYMENTS_INFO_SCREEN, {
      paymentNumber: fine.paymentNumber,
      amount: amount.toString(),
      fine,
      finesType: IFinesType.BG,
    });
  }, [amount, fine, navigation]);

  const handlePressImage = useCallback(() => {
    return navigation.navigate(EScreens.MODAL_IMAGE_VIEWER, {
      url: `https://citysoft.kido.kg${fine.violationImage}`,
    });
  }, [fine.violationImage, navigation]);

  const violationAmmount = useMemo(() => {
    return parseInt(fine.violationAmmount, 10);
  }, [fine.violationAmmount]);

  return (
    <ScreenContainer title={t('fines.singleFineTitle')}>
      <Typography.B28
        color={theme.textColor}
        textAlign={'center'}
        marginBottom={16}>
        {fine.plateNumber}
      </Typography.B28>
      <Typography.R16 numberOfLines={1} color={Colors.grey} marginBottom={8}>
        {date}
      </Typography.R16>
      <Typography.B16 color={theme.textColor} marginBottom={16}>
        {fine.violationType}
      </Typography.B16>
      <Block marginBottom={8}>
        <Typography.R16 numberOfLines={1} color={Colors.grey}>
          {t('fines.violationAmmount')}
        </Typography.R16>
        {violationAmmount !== amount ? (
          <Row>
            <Row alignItems={'center'} marginRight={8}>
              <ViolationAmmountText color={theme.textColor}>
                {violationAmmount}
              </ViolationAmmountText>
              <ViolationAmmountText color={theme.textColor}>
                ⊆
              </ViolationAmmountText>
            </Row>
            <Row alignItems={'center'}>
              <Typography.B16 color={theme.textColor}>{amount}</Typography.B16>
              <Typography.R14 color={theme.textColor}>⊆</Typography.R14>
            </Row>
          </Row>
        ) : (
          <Row alignItems={'center'}>
            <Typography.B16 color={theme.textColor}>
              {violationAmmount}
            </Typography.B16>
            <Typography.R14 color={theme.textColor}>⊆</Typography.R14>
          </Row>
        )}
      </Block>
      <Block marginBottom={8}>
        <Typography.R16 numberOfLines={1} color={Colors.grey}>
          {t('fines.violationPlace')}
        </Typography.R16>
        <Typography.B16 color={theme.textColor}>
          {fine.violationPlace}
        </Typography.B16>
      </Block>
      <Block marginBottom={8}>
        <Typography.R16 numberOfLines={1} color={Colors.grey}>
          {t('fines.paymentStatusName')}
        </Typography.R16>
        <Typography.B16 color={Colors.red}>
          {fine.paymentStatusName}
        </Typography.B16>
      </Block>
      <Block marginBottom={32}>
        <Typography.R16 numberOfLines={1} color={Colors.grey}>
          {t('fines.paymentNumber')}
        </Typography.R16>
        <Typography.B16 color={theme.textColor}>
          {fine.paymentNumber}
        </Typography.B16>
      </Block>
      <StyledPressable onPress={handlePressImage}>
        <StyledImage
          onLoadStart={showImageLoader}
          onLoadEnd={hideImageLoader}
          resizeMode={'contain'}
          source={{uri: `https://citysoft.kido.kg${fine.violationImage}`}}
        />
        <ActivityIndicator
          size="large"
          color={Colors.blue}
          animating={imageLoading}
        />
      </StyledPressable>
      {fine.paymentStatus === '0' && (
        <Button
          loading={loading}
          color={theme.buttonColor}
          title={t('fines.pay')}
          onPress={onHandlePressPay}
        />
      )}
      {loading && <Loader />}
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: WINDOW_WIDTH - 32,
  minHeight: 200,
});

const ViolationAmmountText = styled(Typography.B16)({
  textDecoration: 'line-through',
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flex: 1,
  marginBottom: 32,
  width: WINDOW_WIDTH - 32,
  minHeight: 200,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.black,
});
