import React, {useCallback, useState} from 'react';
import {Button, InputComponent, ScreenContainer} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarCheckStackParamList, EScreens} from '@navigators';

type Props = NativeStackScreenProps<
  CarCheckStackParamList,
  EScreens.CAR_CHECK_SCREEN
>;

export const CarCheckScreen: React.FC<Props> = () => {
  const {t} = useTranslation();
  const [carNumber, setCarNumber] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const onCarNumberValueChange = useCallback((value: string) => {
    setCarNumber(value.replace(/[^A-Z0-9]/g, ''));
  }, []);

  const onPressSearch = useCallback(() => {
    if (carNumber.length < 3) {
      return setError(true);
    }
    setError(false);
  }, [carNumber]);

  return (
    <ScreenContainer title={t('carCheck.title')}>
      <InputComponent
        error={error}
        value={carNumber}
        onChangeValue={onCarNumberValueChange}
        title={t('carCheck.carNumber')}
        maxLength={15}
        marginBottom={32}
        autoCapitalize={'characters'}
      />
      <Button title={t('carCheck.search')} onPress={onPressSearch} />
    </ScreenContainer>
  );
};
