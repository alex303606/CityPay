import React, {useCallback} from 'react';
import {EmptyOsagoScreen} from './components/EmptyOsagoScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';

type Props = NativeStackScreenProps<OsagoStackParamList, EScreens.OSAGO_SCREEN>;

export const OsagoScreen: React.FC<Props> = ({navigation}) => {
  const navigateToSelectCityScreen = useCallback(() => {
    navigation.navigate(EScreens.SELECT_CITY_SCREEN);
  }, []);
  return <EmptyOsagoScreen onPress={navigateToSelectCityScreen} />;
};
