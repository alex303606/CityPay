import React, {useCallback} from 'react';
import {Block, Button, ModalContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.MODAL_BUY_PREMIUM_SCREEN
>;

export const ModalBuyPremiumScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleBuyPremium = useCallback(() => {
    return;
  }, []);

  return (
    <ModalContainer
      title={'Для добавления более 2-х авто неоходимо активировать подписку'}>
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
