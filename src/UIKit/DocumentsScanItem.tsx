import React, {useCallback} from 'react';
import {Block, Row} from './helpers';
import {Colors, Typography} from './constants';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';
import styled from 'styled-components';
import {PermissionsAndroid, Pressable} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {Icon, IconNames} from './Icon';
import {DocumentPhoto} from './DocumentPhoto';

type Props = {
  title: string;
  photos: string[];
  savePhoto: (photo: string, index: number) => void;
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

  const handleCamera = useCallback(async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    const result = await launchCamera(
      {
        saveToPhotos: false,
        mediaType: 'photo',
      },
      () => null,
    );

    if (result?.assets && result.assets.length && result.assets[0].uri) {
      savePhoto(result.assets[0].uri, driverIndex);
    }
  }, [driverIndex]);

  return (
    <Block marginBottom={16}>
      <Typography.B14 marginBottom={16} color={theme.textColor}>
        {title}
      </Typography.B14>
      <Row>
        {photos.map((photo, index) => {
          return (
            <DocumentPhoto
              deletePhoto={onDeletePhoto}
              photoIndex={index}
              photo={photo}
            />
          );
        })}
        {photos.length < 2 ? (
          <Wrapper>
            <StyledPressable onPress={handleCamera}>
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
