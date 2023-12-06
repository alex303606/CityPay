import React, {useCallback, useEffect} from 'react';
import {EmptyOsagoScreen} from './components/EmptyOsagoScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import {ApplicationItem, Block, Button, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {FlatList, ListRenderItem, RefreshControl, View} from 'react-native';
import {useAppSelector, useGetApplicationsList} from '@hooks';
import {getApplications, IApplication} from '@store';

type Props = NativeStackScreenProps<OsagoStackParamList, EScreens.OSAGO_SCREEN>;

const keyExtractor = (item: IApplication) => item.id;

export const OsagoScreen: React.FC<Props> = ({navigation}) => {
  const navigateToSelectCityScreen = useCallback(() => {
    navigation.navigate(EScreens.SELECT_CITY_SCREEN);
  }, []);

  const {getApplicationsListHandler, loading} = useGetApplicationsList();

  useEffect(() => {
    getApplicationsListHandler();
  }, [getApplicationsListHandler]);

  const applicationsList = useAppSelector(getApplications);

  const {t} = useTranslation();

  const onPressApplicationItem = useCallback(
    (id: string) => {
      navigation.navigate(EScreens.APPLICATION_SCREEN, {id});
    },
    [navigation],
  );

  const renderItem: ListRenderItem<IApplication> = useCallback(({item}) => {
    return <ApplicationItem onPress={onPressApplicationItem} item={item} />;
  }, []);

  return (
    <ScreenContainer scroll={false} title={t('osago.title')}>
      <Block flex={1} marginBottom={16}>
        <List
          data={applicationsList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={EmptyOsagoScreen}
          ItemSeparatorComponent={Separator}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getApplicationsListHandler}
            />
          }
        />
      </Block>
      <Button
        title={t('osago.applyOsago')}
        onPress={navigateToSelectCityScreen}
      />
    </ScreenContainer>
  );
};

const List: FlatListType = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))({});

const Separator = styled(View)({height: 8});
