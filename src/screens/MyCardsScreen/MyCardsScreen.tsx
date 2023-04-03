import React, {useEffect} from 'react';
import {Block, ScreenContainer} from '@UIKit';
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

export const MyCardsScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const {userId} = useAppSelector(getUserState);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    eventEmitter.addListener('EventReminder', (event: Object) => {
      const message = Object.keys(event)[0] + Object.values(event)[0];
      console.log(message);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      payBoxModuleGetCards(userId);
    }
  }, [userId]);

  return (
    <ScreenContainer title={t('profile.myCards')}>
      <Block flex={1} backgroundColor={'blue'}></Block>
    </ScreenContainer>
  );
};
