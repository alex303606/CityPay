import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import {Block, Button, ModalContainer} from '@UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, ProfileStackParamList} from '@navigators';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.MODAL_DELETE_ACCOUNT_SCREEN
>;

export const ModalDeleteAccount: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDeleteAccount = useCallback(() => {
    return Alert.alert('Сервис временно не доступен');
  }, []);

  return (
    <ModalContainer title={t('profile.deleteAcc')}>
      <Block paddingHorizontal={16} paddingBottom={16}>
        <Button
          marginVertical={8}
          title={t('profile.delete')}
          onPress={handleDeleteAccount}
        />
        <Button marginVertical={8} title={t('cancel')} onPress={handleCancel} />
      </Block>
    </ModalContainer>
  );
};
