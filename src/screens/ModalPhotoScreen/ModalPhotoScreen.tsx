import {Block, Button, ModalContainer} from '@UIKit';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '@hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, ProfileStackParamList} from '@navigators';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {saveAvatar} from '@store';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.MODAL_PHOTO_SCREEN
>;

export const ModalPhotoScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const handleGallery = useCallback(async () => {
    const result = await launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      () => null,
    );
    console.log(result);
    if (result?.assets && result.assets.length && result.assets[0].base64) {
      dispatch(saveAvatar(result.assets[0].base64));
    }
    if (!result.didCancel) {
      navigation.goBack();
    }
  }, [dispatch, navigation]);

  const handleCamera = useCallback(async () => {
    const result = await launchCamera(
      {
        saveToPhotos: false,
        mediaType: 'photo',
        includeBase64: true,
      },
      () => null,
    );
    if (result?.assets && result.assets.length && result.assets[0].base64) {
      dispatch(saveAvatar(result.assets[0].base64));
    }
    if (!result.didCancel) {
      navigation.goBack();
    }
  }, [dispatch, navigation]);

  return (
    <ModalContainer title={t('profile.selectAvatar')}>
      <Block paddingHorizontal={16} paddingBottom={16}>
        <Button
          marginVertical={8}
          title={t('profile.fromGallery')}
          onPress={handleGallery}
        />
        <Button
          marginVertical={8}
          title={t('profile.fromCamera')}
          onPress={handleCamera}
        />
      </Block>
    </ModalContainer>
  );
};
