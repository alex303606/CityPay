import {
  Block,
  Button,
  Colors,
  EShadow,
  Icon,
  IconNames,
  InputField,
  Loader,
  Row,
  ScreenContainer,
  ShadowsSizes,
  Typography,
} from '@UIKit';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, FinesStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {useLoading, useSnackbarNotification, useTheme} from '@hooks';
import styled from 'styled-components';
import {getCurrentAmount, IFinesType} from '@store';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera as Camera} from 'react-native-camera';

type Props = NativeStackScreenProps<
  FinesStackParamList,
  EScreens.PAYMENTS_BY_QR_SCREEN
>;

export const PaymentByQRScreen: React.FC<Props> = ({route, navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {loading, hideLoader, showLoader} = useLoading();
  const {showNotification} = useSnackbarNotification();
  const {
    params: {type},
  } = route;
  const [code, setCode] = useState('');
  const [amount, setAmmount] = useState('');
  const [scannerOpened, setScannerOpened] = useState(false);

  const maxLength = type === 'police' ? 16 : 14;
  const icon = type === 'police' ? IconNames.police : IconNames.camera;
  const finesType = type === 'police' ? IFinesType.DPS : IFinesType.BG;

  const getCurrentAmountHandler = useCallback(async () => {
    showLoader();
    const response = await getCurrentAmount(code);
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

    setAmmount(response.data.current_amount.toString());
  }, [code, hideLoader, showLoader, showNotification, t]);

  useEffect(() => {
    if (code.length === maxLength) {
      getCurrentAmountHandler();
    }
  }, [code, getCurrentAmountHandler, maxLength]);

  const onSuccess = useCallback(
    ({data}: {data: string}) => {
      setScannerOpened(false);
      if (data) {
        setCode(data);
        getCurrentAmountHandler();
      } else {
        return showNotification(t('errors.somethingWentWrong'));
      }
    },
    [getCurrentAmountHandler, showNotification, t],
  );

  const onPressHandler = useCallback(() => {
    setScannerOpened(true);
  }, []);

  const onPressClose = useCallback(() => {
    setScannerOpened(false);
  }, []);

  const goToPayHandler = useCallback(() => {
    navigation.navigate(EScreens.PAYMENTS_INFO_SCREEN, {
      paymentNumber: code,
      amount,
      finesType,
    });
  }, [amount, code, finesType, navigation]);

  return (
    <>
      {scannerOpened ? (
        <Block flex={1} backgroundColor={theme.backgroundColor}>
          <QRCodeScanner
            fadeIn={false}
            onRead={onSuccess}
            flashMode={Camera.Constants.FlashMode.off}
            cameraProps={{ratio: '1:1'}}
            topContent={
              <StyledContent
                justifyContent={'center'}
                alignItems={'center'}
                paddingVertical={16}>
                <Typography.B20
                  textAlign={'center'}
                  numberOfLines={2}
                  color={theme.textColor}>
                  {t('fines.scanQrCode')}
                </Typography.B20>
              </StyledContent>
            }
            bottomContent={
              <StyledContent justifyContent={'center'} padding={16}>
                <Button
                  color={theme.buttonColor}
                  title={t('fines.closeScanner')}
                  onPress={onPressClose}
                />
              </StyledContent>
            }
          />
        </Block>
      ) : (
        <ScreenContainer title={t('fines.title')}>
          <>
            <Block flex={1}>
              <Row alignItems={'center'} justifyContent={'space-between'}>
                <Typography.R20 numberOfLines={2} color={theme.textColor}>
                  {t('fines.paymentByCode')}
                </Typography.R20>
                <StyledBlock backgroundColor={Colors.white} marginRight={8}>
                  <Icon name={icon} size={32} color={Colors.blue} />
                </StyledBlock>
              </Row>
              <Row marginVertical={16}>
                <InputField
                  onPress={onPressHandler}
                  maxLength={maxLength}
                  keyboardType={'numeric'}
                  value={code}
                  onChangeValue={setCode}
                  label={t('fines.paymentCode')}
                  showAdditionalButton
                />
              </Row>
              <Row marginVertical={16}>
                <InputField
                  disabled={false}
                  keyboardType={'numeric'}
                  value={amount}
                  label={t('fines.paymentAmmount')}
                />
              </Row>
              <Button
                disabled={!Boolean(amount)}
                loading={loading}
                color={theme.buttonColor}
                title={t('fines.goToPay')}
                onPress={goToPayHandler}
                marginTop={16}
              />
            </Block>
            {loading && <Loader />}
          </>
        </ScreenContainer>
      )}
    </>
  );
};

const StyledBlock = styled(Block)({
  borderRadius: 10,
  width: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: ShadowsSizes[EShadow.S],
});

const StyledContent = styled(Block)({
  width: '100%',
});
