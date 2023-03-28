import {Block, Button, ModalContainer} from '@UIKit';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '@hooks';
import {
  clearCars,
  clearFines,
  clearPayments,
  clearSettings,
  signOut,
} from '@store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, ProfileStackParamList} from '@navigators';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.MODAL_EXIT_SCREEN
>;

export const ModalExitScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const handleExit = useCallback(() => {
    dispatch(signOut());
    dispatch(clearFines());
    dispatch(clearCars());
    dispatch(clearPayments());
    dispatch(clearSettings());
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ModalContainer title={t('profile.exit')}>
      <Block paddingHorizontal={16} paddingBottom={16}>
        <Button
          marginVertical={8}
          title={t('profile.exit')}
          onPress={handleExit}
        />
        <Button marginVertical={8} title={t('cancel')} onPress={handleCancel} />
      </Block>
    </ModalContainer>
  );
};
