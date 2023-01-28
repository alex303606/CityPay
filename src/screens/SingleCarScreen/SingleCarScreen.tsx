import React, {useCallback} from 'react';
import {
  Block,
  CarComponent,
  IconNames,
  Row,
  ScreenContainer,
  Typography,
} from '@UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CarsStackParamList, EScreens} from '@navigators';
import {useTheme} from '@hooks';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<
  CarsStackParamList,
  EScreens.SINGLE_CAR_SCREEN
>;

export const SingleCarScreen: React.FC<Props> = ({route, navigation}) => {
  const {t} = useTranslation();
  const {car, isNewNumber} = route.params;
  const {theme} = useTheme();

  const handlePressHeaderButton = useCallback(() => {
    navigation.navigate(EScreens.MODAL_DELETE_CAR, {number: car.number});
  }, [navigation, car]);

  return (
    <ScreenContainer
      title={t('cars.car', {number: car.number})}
      showButton
      iconName={IconNames.delete}
      onPressButton={handlePressHeaderButton}>
      <Block flex={1}>
        <CarComponent isNewNumber={isNewNumber} car={car} />
        <Row justifyContent={'flex-end'} marginTop={8}>
          <Typography.B16 textAlign={'center'} color={theme.textColor}>
            {t('cars.inn', {inn: car.inn})}
          </Typography.B16>
        </Row>
      </Block>
    </ScreenContainer>
  );
};