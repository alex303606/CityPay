import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, ScreenContainer, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, ProfileStackParamList} from '@navigators';
import {
  NativeModules,
  NativeEventEmitter,
  FlatList,
  View,
  ListRenderItem,
} from 'react-native';
import {useAppSelector, useSnackbarNotification, useTheme} from '@hooks';
import {getUserState} from '@store';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {EmptyList} from './components/EmptyList';

const {PayBoxModule} = NativeModules;

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.MY_CARDS_SCREEN
>;

type ICard = {
  id: number;
  number: string;
};

const keyExtractor = (item: ICard) => String(item.id);

const payBoxModuleGetCards = (userId: string) => PayBoxModule.getCards(userId);
const payBoxModuleAddCard = (userId: string) => {
  const postUrl = 'https://citysoft.kido.kg/';
  return PayBoxModule.addCard(userId, postUrl);
};

export const MyCardsScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const {userId} = useAppSelector(getUserState);
  const {theme} = useTheme();
  const {showNotification} = useSnackbarNotification();

  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    PayBoxModule.registerPbListener();
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    const subscription = eventEmitter.addListener(
      'EventReminder',
      (event: Object) => {
        try {
          const eventName = Object.keys(event)[0];
          if (eventName === 'cardsList') {
            console.log(eventName, JSON.parse(Object.values(event)[0]));
            const cardsList = JSON.parse(Object.values(event)[0]);
            setCards(cardsList);
          }
        } catch (e) {
          console.log(e);
          return showNotification(t('errors.somethingWentWrong'));
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

  const renderItem: ListRenderItem<ICard> = useCallback(({item}) => {
    return (
      <Typography.S16 color={theme.textColor}>{item.number}</Typography.S16>
    );
  }, []);

  return (
    <ScreenContainer scroll={false} title={t('profile.myCards')}>
      <Block flex={1}>
        <List
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          data={cards}
          renderItem={renderItem}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={<EmptyList />}
        />
      </Block>
      <Button title={t('profile.addCard')} onPress={addCardHandler} />
    </ScreenContainer>
  );
};

const List: FlatListType = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))({});

const Separator = styled(View)({height: 16});
