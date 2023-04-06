import React, {useCallback, useEffect} from 'react';
import {Block, Button, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, ProfileStackParamList} from '@navigators';
import {NativeModules, NativeEventEmitter} from 'react-native';
import {useAppSelector} from '@hooks';
import {getUserState} from '@store';

const {PayBoxModule} = NativeModules;

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.MY_CARDS_SCREEN
>;
const payBoxModuleGetCards = (userId: string) => PayBoxModule.getCards(userId);
const payBoxModuleAddCard = (userId: string) => {
  const postUrl = 'https://citysoft.kido.kg/';
  return PayBoxModule.addCard(userId, postUrl);
};

export const MyCardsScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const {userId} = useAppSelector(getUserState);

  useEffect(() => {
    PayBoxModule.registerPbListener();
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    const subscription = eventEmitter.addListener(
      'EventReminder',
      (event: Object) => {
        const eventName = Object.keys(event)[0];
        console.log(Object.values(event)[0]);
        if (eventName === 'cardsList') {
          console.log(eventName, JSON.parse(Object.values(event)[0]));
        }
      },
    );
    return () => {
      PayBoxModule.removePbListener();
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      payBoxModuleGetCards(userId);
    }
  }, [userId]);

  const addCardHandler = useCallback(() => {
    if (userId) {
      payBoxModuleAddCard(userId);
    }
  }, [userId]);

  return (
    <ScreenContainer title={t('profile.myCards')}>
      <Block flex={1}>
        <Button title={t('profile.addCard')} onPress={addCardHandler} />
      </Block>
    </ScreenContainer>
  );
};
