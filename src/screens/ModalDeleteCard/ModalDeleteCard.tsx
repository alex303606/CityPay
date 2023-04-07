import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, NativeModules} from 'react-native';
import {Block, Button, ModalContainer} from '@UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, ProfileStackParamList} from '@navigators';
import {useAppSelector} from '@hooks';
import {getUserState} from '@store';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.MODAL_DELETE_CARD_SCREEN
>;

const {PayBoxModule} = NativeModules;

const payBoxModuleDeleteCard = (userId: string, cardId: number) => {
  return PayBoxModule.deleteCard(userId, cardId);
};

export const ModalDeleteCard: React.FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const {
    params: {card},
  } = route;

  const {userId} = useAppSelector(getUserState);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDeleteCard = useCallback(() => {
    debugger;
    if (userId) {
      payBoxModuleDeleteCard(userId, card.id);
    }
  }, [userId, card.id]);

  return (
    <ModalContainer title={t('profile.deleteCard', {number: card.number})}>
      <Block paddingHorizontal={16} paddingBottom={16}>
        <Button
          marginVertical={8}
          title={t('profile.delete')}
          onPress={handleDeleteCard}
        />
        <Button marginVertical={8} title={t('cancel')} onPress={handleCancel} />
      </Block>
    </ModalContainer>
  );
};
