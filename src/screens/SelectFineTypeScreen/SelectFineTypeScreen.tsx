import React, {useCallback} from 'react';
import {Colors, ScreenContainer, Typography} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {SelectButton} from './components/SelectButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, FinesStackParamList} from '@navigators';

type Props = NativeStackScreenProps<
  FinesStackParamList,
  EScreens.SELECT_FINE_TYPE_SCREEN
>;

export const SelectFineTypeScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const onPressHandler = useCallback(
    (type: string) => {
      navigation.navigate(EScreens.PAYMENTS_BY_QR_SCREEN, {type});
    },
    [navigation],
  );

  return (
    <ScreenContainer title={t('fines.title')}>
      <Typography.R16 marginBottom={16} color={Colors.grey}>
        {t('fines.selectType')}
      </Typography.R16>
      <SelectButton
        text={t('fines.cameraFine')}
        type={'camera'}
        onPress={onPressHandler}
      />
      <SelectButton
        text={t('fines.policeFine')}
        type={'police'}
        onPress={onPressHandler}
      />
    </ScreenContainer>
  );
};
