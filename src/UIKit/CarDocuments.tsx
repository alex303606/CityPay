import React, {useCallback} from 'react';
import {Block, Row} from './helpers';
import {BlueTitle} from './BlueTitle';
import {useTranslation} from 'react-i18next';
import {Colors, Typography} from './constants';
import {useTheme} from '@hooks';
import {Icon, IconNames} from './Icon';
import styled from 'styled-components';
import {Image, PermissionsAndroid, Pressable} from 'react-native';
import {ICarDocuments} from '../screens/Osago/types';
import {launchCamera} from 'react-native-image-picker';

type Props = {
  carPhotos: ICarDocuments;
  onSavePhotoRegistration: (photo: string) => void;
  onSavePhotoRegistrationCard: (photo: string) => void;
};

export const CarDocuments: React.FC<Props> = ({
  carPhotos,
  onSavePhotoRegistration,
  onSavePhotoRegistrationCard,
}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  console.log('carPhotos', carPhotos);
  const handleCameraRegistrationCard = useCallback(async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    const result = await launchCamera(
      {
        saveToPhotos: false,
        mediaType: 'photo',
      },
      () => null,
    );

    if (result?.assets && result.assets.length && result.assets[0].uri) {
      return onSavePhotoRegistrationCard(result.assets[0].uri);
    }
  }, []);

  const handleCameraRegistration = useCallback(async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    const result = await launchCamera(
      {
        saveToPhotos: false,
        mediaType: 'photo',
      },
      () => null,
    );

    if (result?.assets && result.assets.length && result.assets[0].uri) {
      return onSavePhotoRegistration(result.assets[0].uri);
    }
  }, []);

  return (
    <Block>
      <BlueTitle marginBottom={16} title={t('osago.documentsScreen.car')} />
      <Block marginBottom={16}>
        <Typography.B14 marginBottom={16} color={theme.textColor}>
          {t('osago.documentsScreen.registration')}
        </Typography.B14>
        <Row>
          {carPhotos.registration.map((photo, index) => {
            return (
              <WrapperImage marginRight={8} key={index}>
                <StyledImage
                  key={index}
                  resizeMode="cover"
                  source={{uri: photo}}
                />
              </WrapperImage>
            );
          })}
          {carPhotos.registration.length < 2 ? (
            <Wrapper>
              <StyledPressable onPress={handleCameraRegistration}>
                <Block alignItems={'center'} justifyContent={'center'}>
                  <Icon name={IconNames.plus} />
                  <Typography.B16 color={theme.textColor} marginTop={8}>
                    {t('osago.documentsScreen.addPhoto')}
                  </Typography.B16>
                </Block>
              </StyledPressable>
            </Wrapper>
          ) : null}
        </Row>
      </Block>
      <Block marginBottom={16}>
        <Typography.B14 marginBottom={16} color={theme.textColor}>
          {t('osago.documentsScreen.registrationCard')}
        </Typography.B14>
        <Row>
          {carPhotos.registrationCard.map((photo, index) => {
            return (
              <WrapperImage marginRight={8} key={index}>
                <StyledImage
                  key={index}
                  resizeMode="cover"
                  source={{uri: photo}}
                />
              </WrapperImage>
            );
          })}
          {carPhotos.registrationCard.length < 2 ? (
            <Wrapper>
              <StyledPressable onPress={handleCameraRegistrationCard}>
                <Block alignItems={'center'} justifyContent={'center'}>
                  <Icon name={IconNames.plus} />
                  <Typography.B16 color={theme.textColor} marginTop={8}>
                    {t('osago.documentsScreen.addPhoto')}
                  </Typography.B16>
                </Block>
              </StyledPressable>
            </Wrapper>
          ) : null}
        </Row>
      </Block>
    </Block>
  );
};

const Wrapper = styled(Block)({
  width: 110,
  height: 110,
  borderWidth: 1,
  borderStyle: 'dashed',
  borderRadius: 2,
  overflow: 'hidden',
});

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgb(225,229,232)',
});

const StyledImage = styled(Image)({
  width: '100%',
  height: '100%',
  borderRadius: 2,
});

const WrapperImage = styled(Block)({
  borderRadius: 2,
  overflow: 'hidden',
  padding: 8,
  width: 110,
  height: 110,
  borderWidth: 1,
  borderColor: Colors.grey,
});
