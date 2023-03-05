import {
  Block,
  Button,
  Colors,
  EShadow,
  Icon,
  IconNames,
  InputField,
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
import {getCurrentAmount} from '@store';
import {ActivityIndicator, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera as Camera} from 'react-native-camera';

type Props = NativeStackScreenProps<
  FinesStackParamList,
  EScreens.PAYMENTS_BY_QR_SCREEN
>;

export const PaymentByQRScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {loading, hideLoader, showLoader} = useLoading();
  const {showNotification} = useSnackbarNotification();
  const {
    params: {type},
  } = route;
  const [code, setCode] = useState('');
  const [ammount, setAmmount] = useState('');
  const [scannerOpened, setScannerOpened] = useState(false);

  const maxLength = type === 'police' ? 16 : 14;
  const icon = type === 'police' ? IconNames.police : IconNames.camera;

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
  }, [code.length, getCurrentAmountHandler, maxLength]);

  const onSuccess = ({data}: {data: string}) => {
    setScannerOpened(false);
    if (data) {
      setCode(data);
      console.log(data);
      Alert.alert(data);
    }
  };

  const onPressHandler = useCallback(() => {
    setScannerOpened(true);
  }, []);

  return (
    <>
      {scannerOpened ? (
        <Block flex={1} backgroundColor={theme.backgroundColor}>
          <QRCodeScanner
            fadeIn={false}
            onRead={onSuccess}
            flashMode={Camera.Constants.FlashMode.off}
            cameraProps={{ratio: '2:1'}}
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
                  value={ammount}
                  label={t('fines.paymentAmmount')}
                />
              </Row>
              <Button
                title={t('fines.goToPay')}
                onPress={() => null}
                marginTop={16}
              />
            </Block>
            {loading && (
              <StyledFloatingBlock>
                <ActivityIndicator size="large" color={Colors.blue} />
              </StyledFloatingBlock>
            )}
          </>
        </ScreenContainer>
      )}
    </>
  );
};

const StyledFloatingBlock = styled(Block)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255,255,255,0.3)',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledBlock = styled(Block)({
  borderRadius: 10,
  width: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: ShadowsSizes[EShadow.S],
});
