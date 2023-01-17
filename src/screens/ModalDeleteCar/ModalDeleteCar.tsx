import {Block, Button, ModalContainer} from '@UIKit';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.MODAL_DELETE_CAR
>;

export const ModalDeleteCar: React.FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const {number} = route.params;

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDeleteCar = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ModalContainer title={t('cars.deleteCar', {number})}>
      <Block paddingHorizontal={16} paddingBottom={16}>
        <Button
          marginVertical={8}
          title={t('cars.delete')}
          onPress={handleDeleteCar}
        />
        <Button marginVertical={8} title={t('cancel')} onPress={handleCancel} />
      </Block>
    </ModalContainer>
  );
};
