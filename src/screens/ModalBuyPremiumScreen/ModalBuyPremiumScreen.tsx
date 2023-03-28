import React, {useCallback} from 'react';
import {Block, Button, ModalContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import {Alert} from 'react-native';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.MODAL_BUY_PREMIUM_SCREEN
>;

export const ModalBuyPremiumScreen: React.FC<Props> = ({route, navigation}) => {
  const {t} = useTranslation();
  const {
    params: {title},
  } = route;

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleBuyPremium = useCallback(() => {
    return Alert.alert('Сервис временно не доступен');
  }, []);

  return (
    <ModalContainer title={title}>
      <Block paddingHorizontal={16} paddingBottom={16}>
        <Button
          marginVertical={8}
          title={'Активировать'}
          onPress={handleBuyPremium}
        />
        <Button marginVertical={8} title={t('cancel')} onPress={handleCancel} />
      </Block>
    </ModalContainer>
  );
};
