import React, {useCallback, useState} from 'react';
import {Button, InputComponent, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarCheckStackParamList, EScreens} from '@navigators';
import {useGetCarCheck} from '@hooks';

type Props = NativeStackScreenProps<
  CarCheckStackParamList,
  EScreens.CAR_CHECK_SCREEN
>;

export const CarCheckScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [carNumber, setCarNumber] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const navigateToResult = useCallback((number: string) => {
    navigation.navigate(EScreens.CAR_CHECK_RESULT_SCREEN, {
      number: number,
    });
  }, []);

  const {getCarCheckHandler, loading} = useGetCarCheck(navigateToResult);

  const onCarNumberValueChange = useCallback((value: string) => {
    setCarNumber(value.replace(/[^A-Z0-9]/g, ''));
  }, []);

  const onPressSearch = useCallback(async () => {
    if (carNumber.length < 3) {
      return setError(true);
    }
    setError(false);
    await getCarCheckHandler(carNumber);
  }, [carNumber, getCarCheckHandler]);

  return (
    <ScreenContainer title={t('carCheck.carCheckTitle')}>
      <InputComponent
        error={error}
        value={carNumber}
        onChangeValue={onCarNumberValueChange}
        title={t('carCheck.carNumber')}
        maxLength={15}
        marginBottom={32}
        autoCapitalize={'characters'}
      />
      <Button
        loading={loading}
        title={t('carCheck.search')}
        onPress={onPressSearch}
      />
    </ScreenContainer>
  );
};
