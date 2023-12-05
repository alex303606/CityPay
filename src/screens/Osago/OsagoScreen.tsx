import React, {useCallback, useEffect} from 'react';
import {EmptyOsagoScreen} from './components/EmptyOsagoScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import {Button, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {FlatListType} from '../types';
import styled from 'styled-components';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {useAppSelector, useGetApplicationsList} from '@hooks';
import {getApplications, IApplication} from '@store';

type Props = NativeStackScreenProps<OsagoStackParamList, EScreens.OSAGO_SCREEN>;

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

  const renderItem: ListRenderItem<IApplication> = useCallback(() => {
    return null;
  }, []);

  return (
    <ScreenContainer scroll={false} title={t('osago.title')}>
      <List
        data={applicationsList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyOsagoScreen}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getApplicationsListHandler}
          />
        }
      />
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
