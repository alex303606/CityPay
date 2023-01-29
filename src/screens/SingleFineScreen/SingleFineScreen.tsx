import React, {useCallback} from 'react';
import {
  Block,
  Button,
  Colors,
  Row,
  ScreenContainer,
  Typography,
  WINDOW_WIDTH,
} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import {Image, Pressable} from 'react-native';
import styled from 'styled-components';
import {useTheme} from '@hooks';

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

  const date = new Date(fine.violationDate).toLocaleString('ru', {
    minute: 'numeric',
    hour: 'numeric',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const onHandlePressPay = useCallback(() => {
    return;
  }, []);

  const handlePressImage = useCallback(() => {
    return navigation.navigate(EScreens.MODAL_IMAGE_VIEWER, {
      url: `https://citysoft.kido.kg${fine.violationImage}`,
    });
  }, [fine.violationImage, navigation]);

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
        <Row alignItems={'center'}>
          <Typography.B16 color={theme.textColor}>
            {fine.violationAmmount}
          </Typography.B16>
          <Typography.R14 color={theme.textColor}>⊆</Typography.R14>
        </Row>
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
          resizeMode={'contain'}
          source={{uri: `https://citysoft.kido.kg${fine.violationImage}`}}
        />
      </StyledPressable>
      <Button
        color={theme.buttonColor}
        title={t('fines.pay')}
        onPress={onHandlePressPay}
      />
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: WINDOW_WIDTH - 32,
  minHeight: 200,
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flex: 1,
  marginBottom: 32,
});
