import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, ScreenContainer} from '@UIKit';
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
import {useAppSelector, useSnackbarNotification} from '@hooks';
import {getUserState} from '@store';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {EmptyList} from './components/EmptyList';
import {Card} from './components/Card';

const {PayBoxModule} = NativeModules;

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  EScreens.MY_CARDS_SCREEN
>;

export type ICard = {
  id: number;
  number: string;
};
const postUrl = 'https://citysoft.kido.kg/';

const keyExtractor = (item: ICard) => String(item.id);

const payBoxModuleGetCards = (userId: string) => PayBoxModule.getCards(userId);
const payBoxModuleAddCard = (userId: string) => {
  return PayBoxModule.addCard(userId, postUrl);
};

export const MyCardsScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {userId} = useAppSelector(getUserState);
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

  const deleteCardHandler = useCallback(
    (card: ICard) => {
      navigation.navigate(EScreens.MODAL_DELETE_CARD_SCREEN, {card});
    },
    [userId],
  );

  const renderItem: ListRenderItem<ICard> = useCallback(({item}) => {
    return <Card onPressDelete={deleteCardHandler} card={item} />;
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
