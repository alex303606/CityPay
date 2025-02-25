import React, {useCallback} from 'react';
import {Block, Row} from './helpers';
import {BlueTitle} from './BlueTitle';
import {useTranslation} from 'react-i18next';
import {Colors, Typography} from './constants';
import {useTheme} from '@hooks';
import {Icon, IconNames} from './Icon';
import styled from 'styled-components';
import {Alert, PermissionsAndroid, Pressable} from 'react-native';
import {ICarDocuments, IPhoto} from '../screens/Osago/types';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CarDocumentPhoto} from './CarDocumentPhoto';

type Props = {
  carPhotos: ICarDocuments;
  onSavePhotoRegistration: (photo: IPhoto) => void;
  onSavePhotoRegistrationCard: (photo: IPhoto) => void;
  onDeletePhotoRegistration: (photoIndex: number) => void;
  onDeletePhotoRegistrationCard: (photoIndex: number) => void;
  onSavePhotoPowerAttorney: (photo: IPhoto) => void;
  onDeletePowerAttorney: (photoIndex: number) => void;
  isOwner: boolean;
  isHasToCard: boolean;
};

export const CarDocuments: React.FC<Props> = ({
  carPhotos,
  onSavePhotoRegistration,
  onSavePhotoRegistrationCard,
  onDeletePhotoRegistration,
  onDeletePhotoRegistrationCard,
  onSavePhotoPowerAttorney,
  onDeletePowerAttorney,
  isOwner,
  isHasToCard,
}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  const handleGalleryRegistrationCard = useCallback(async () => {
    const result = await launchImageLibrary(
      {
        mediaType: 'photo',
      },
      () => null,
    );

    if (
      result?.assets &&
      result.assets.length &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileName
    ) {
      return onSavePhotoRegistrationCard({
        fileName: result.assets[0].fileName,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
      });
    }
  }, []);

  const handleCameraRegistrationCard = useCallback(async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    const result = await launchCamera(
      {
        saveToPhotos: false,
        mediaType: 'photo',
      },
      () => null,
    );

    if (
      result?.assets &&
      result.assets.length &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileName
    ) {
      return onSavePhotoRegistrationCard({
        fileName: result.assets[0].fileName,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
      });
    }
  }, []);

  const handleCameraPowerAttorney = useCallback(async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    const result = await launchCamera(
      {
        saveToPhotos: false,
        mediaType: 'photo',
      },
      () => null,
    );

    if (
      result?.assets &&
      result.assets.length &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileName
    ) {
      return onSavePhotoPowerAttorney({
        fileName: result.assets[0].fileName,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
      });
    }
  }, []);

  const handleGalleryPowerAttorney = useCallback(async () => {
    const result = await launchImageLibrary(
      {
        mediaType: 'photo',
      },
      () => null,
    );

    if (
      result?.assets &&
      result.assets.length &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileName
    ) {
      return onSavePhotoPowerAttorney({
        fileName: result.assets[0].fileName,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
      });
    }
  }, []);

  const handleGalleryRegistration = useCallback(async () => {
    const result = await launchImageLibrary(
      {
        mediaType: 'photo',
      },
      () => null,
    );

    if (
      result?.assets &&
      result.assets.length &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileName
    ) {
      return onSavePhotoRegistration({
        fileName: result.assets[0].fileName,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
      });
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

    if (
      result?.assets &&
      result.assets.length &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].fileName
    ) {
      return onSavePhotoRegistration({
        fileName: result.assets[0].fileName,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
      });
    }
  }, []);

  const handleRegistration = useCallback(() => {
    return Alert.alert(t('profile.selectAvatar'), undefined, [
      {text: t('profile.fromCamera'), onPress: handleCameraRegistration},
      {
        text: t('profile.fromGallery'),
        onPress: handleGalleryRegistration,
      },
    ]);
  }, []);

  const handlePowerAttorney = useCallback(() => {
    return Alert.alert(t('profile.selectAvatar'), undefined, [
      {text: t('profile.fromCamera'), onPress: handleCameraPowerAttorney},
      {
        text: t('profile.fromGallery'),
        onPress: handleGalleryPowerAttorney,
      },
    ]);
  }, []);

  const handleRegistrationCard = useCallback(() => {
    return Alert.alert(t('profile.selectAvatar'), undefined, [
      {text: t('profile.fromCamera'), onPress: handleCameraRegistrationCard},
      {
        text: t('profile.fromGallery'),
        onPress: handleGalleryRegistrationCard,
      },
    ]);
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
              <CarDocumentPhoto
                deletePhoto={onDeletePhotoRegistration}
                key={index}
                photo={photo.uri}
                photoIndex={index}
              />
            );
          })}
          {carPhotos.registration.length < 2 ? (
            <Wrapper>
              <StyledPressable onPress={handleRegistration}>
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
      {isHasToCard ? (
        <Block marginBottom={16}>
          <Typography.B14 marginBottom={16} color={theme.textColor}>
            {t('osago.documentsScreen.registrationCard')}
          </Typography.B14>
          <Row>
            {carPhotos.registrationCard.map((photo, index) => {
              return (
                <CarDocumentPhoto
                  deletePhoto={onDeletePhotoRegistrationCard}
                  key={index}
                  photo={photo.uri}
                  photoIndex={index}
                />
              );
            })}
            {carPhotos.registrationCard.length < 2 ? (
              <Wrapper>
                <StyledPressable onPress={handleRegistrationCard}>
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
      ) : null}
      {isOwner ? null : (
        <Block marginBottom={16}>
          <Typography.B14 marginBottom={16} color={theme.textColor}>
            {t('osago.documentsScreen.powerAttorney')}
          </Typography.B14>
          <Row>
            {carPhotos.powerOfAttorney.map((photo, index) => {
              return (
                <CarDocumentPhoto
                  deletePhoto={onDeletePowerAttorney}
                  key={index}
                  photo={photo.uri}
                  photoIndex={index}
                />
              );
            })}
            {carPhotos.powerOfAttorney.length < 2 ? (
              <Wrapper>
                <StyledPressable onPress={handlePowerAttorney}>
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
      )}
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
