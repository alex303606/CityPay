import React, {useCallback} from 'react';
import {Block, Row} from './helpers';
import {Colors, Typography} from './constants';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';
import styled from 'styled-components';
import {Alert, PermissionsAndroid, Pressable} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Icon, IconNames} from './Icon';
import {DocumentPhoto} from './DocumentPhoto';
import {IPhoto} from '../screens/Osago/types';

type Props = {
  title: string;
  photos: IPhoto[];
  savePhoto: (photo: IPhoto, index: number) => void;
  driverIndex: number;
  deletePhoto: (photoIndex: number) => void;
};

export const DocumentsScanItem: React.FC<Props> = ({
  title,
  photos,
  savePhoto,
  driverIndex,
  deletePhoto,
}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  const onDeletePhoto = useCallback((photoIndex: number) => {
    deletePhoto(photoIndex);
  }, []);

  const handleGallery = useCallback(async () => {
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
      savePhoto(
        {
          fileName: result.assets[0].fileName,
          type: result.assets[0].type,
          uri: result.assets[0].uri,
        },
        driverIndex,
      );
    }
  }, []);

  const handleCamera = useCallback(async () => {
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
      savePhoto(
        {
          fileName: result.assets[0].fileName,
          type: result.assets[0].type,
          uri: result.assets[0].uri,
        },
        driverIndex,
      );
    }
  }, [driverIndex]);

  const showModal = useCallback(() => {
    return Alert.alert(t('profile.selectAvatar'), undefined, [
      {text: t('profile.fromCamera'), onPress: handleCamera},
      {
        text: t('profile.fromGallery'),
        onPress: handleGallery,
      },
    ]);
  }, []);

  return (
    <Block marginBottom={16}>
      <Typography.B14 marginBottom={16} color={theme.textColor}>
        {title}
      </Typography.B14>
      <Row>
        {photos.map((photo, index) => {
          return (
            <DocumentPhoto
              key={index.toString()}
              deletePhoto={onDeletePhoto}
              photoIndex={index}
              photo={photo.uri}
            />
          );
        })}
        {photos.length < 2 ? (
          <Wrapper>
            <StyledPressable onPress={showModal}>
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
