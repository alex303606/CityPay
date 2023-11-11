import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Block,
  BlueTitle,
  Button,
  CheckBoxField,
  Colors,
  Driver,
  InputComponent,
  MaskedInput,
  PickerComponent,
  Row,
  ScreenContainer,
  Typography,
} from '@UIKit';
import {useAppSelector, useTheme} from '@hooks';
import {getUserState} from '@store';
import styled from 'styled-components';
import {Alert, Pressable} from 'react-native';
import {MASK, NUMBER_OF_DRIVERS, VALIDITY} from './constans';
import {IDriver, MyDataState} from './types';
import CheckBox from '@react-native-community/checkbox';

export const StatementScreen = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {phone} = useAppSelector(getUserState);
  const [state, setMyData] = useState<MyDataState>({
    iAmTheOwner: false,
    iHaveCard: false,
    carRegisteredInKr: false,
    IAmAgree: false,
    needDelivery: false,
    numberOfDrivers: '',
    validity: '1 год',
    email: '',
    phone: phone,
    carModel: '',
    model: '',
    yearOfIssue: '',
    carType: '',
    numberOfSeats: '',
    engineCapacity: '',
    motorPower: '',
    loadCapacity: '',
    engineNumber: '',
    whereToDeliver: '',
    whereToPick: '',
  });

  const [driversState, setDrivers] = useState<IDriver[]>([
    {
      date: new Date(631144800000),
      driverLicenseDate: new Date(631144800000),
      pin: '',
      surname: '',
      name: '',
      secondName: '',
      class: '',
    },
  ]);

  const onChangeValueIAmTheOwner = useCallback(
    (value: boolean) =>
      setMyData({
        ...state,
        iAmTheOwner: value,
      }),
    [state],
  );

  const onChangeNeedDelivery = useCallback(
    (value: boolean) =>
      setMyData({
        ...state,
        needDelivery: value,
      }),
    [state],
  );

  const onChangeIAmAgree = useCallback(
    (value: boolean) =>
      setMyData({
        ...state,
        IAmAgree: value,
      }),
    [state],
  );

  const onChangeValueIHaveCard = useCallback(
    (value: boolean) => {
      setMyData({...state, iHaveCard: value});
    },
    [state],
  );

  const onChangeValueCarRegisteredInKr = useCallback(
    (value: boolean) => setMyData({...state, carRegisteredInKr: value}),
    [state],
  );

  const onNumberOfDriversChangeHandler = useCallback(
    (value: string) => setMyData({...state, numberOfDrivers: value}),
    [state],
  );

  const onCarModelChangeHandler = useCallback(
    (value: string) => setMyData({...state, carModel: value}),
    [state],
  );

  const onModelChangeHandler = useCallback(
    (value: string) => setMyData({...state, model: value}),
    [state],
  );

  const onYearOfIssueChangeHandler = useCallback(
    (value: string) => setMyData({...state, yearOfIssue: value}),
    [state],
  );

  const onCarTypeChangeHandler = useCallback(
    (value: string) => setMyData({...state, carType: value}),
    [state],
  );

  const onNumberOfSeatsChangeHandler = useCallback(
    (value: string) => setMyData({...state, numberOfSeats: value}),
    [state],
  );

  const onEngineCapacityChangeHandler = useCallback(
    (value: string) => setMyData({...state, engineCapacity: value}),
    [state],
  );

  const onLoadCapacityChangeHandler = useCallback(
    (value: string) => setMyData({...state, loadCapacity: value}),
    [state],
  );
  const onWhereToPickChangeHandler = useCallback(
    (value: string) => setMyData({...state, whereToPick: value}),
    [state],
  );

  const onEngineNumberHandler = useCallback(
    (value: string) => setMyData({...state, engineNumber: value}),
    [state],
  );

  const onWhereToDeliverHandler = useCallback(
    (value: string) => setMyData({...state, whereToDeliver: value}),
    [state],
  );

  const onMotorPowerChangeHandler = useCallback(
    (value: string) => setMyData({...state, motorPower: value}),
    [state],
  );

  const onValidityChangeHandler = useCallback(
    (value: string) => setMyData({...state, validity: value}),
    [state],
  );

  const onEmailChangeHandler = useCallback(
    (value: string) => setMyData({...state, email: value}),
    [state],
  );

  const changePhoneHandler = useCallback(
    (value: string) => setMyData({...state, phone: value}),
    [state],
  );

  const onSurnameChangeHandler = useCallback(
    (value: string, index: number) => {
      const newDriversState = [...driversState];
      newDriversState[index].surname = value;
      setDrivers(newDriversState);
    },
    [driversState],
  );

  const onNameChangeHandler = useCallback(
    (value: string, index: number) => {
      const newDriversState = [...driversState];
      newDriversState[index].name = value;
      setDrivers(newDriversState);
    },
    [driversState],
  );

  const onSecondNameChangeHandler = useCallback(
    (value: string, index: number) => {
      const newDriversState = [...driversState];
      newDriversState[index].secondName = value;
      setDrivers(newDriversState);
    },
    [driversState],
  );

  const onPinChangeHandler = useCallback(
    (value: string, index: number) => {
      const newDriversState = [...driversState];
      newDriversState[index].pin = value;
      setDrivers(newDriversState);
    },
    [driversState],
  );

  const onClassChangeHandler = useCallback(
    (value: string, index: number) => {
      const newDriversState = [...driversState];
      newDriversState[index].class = value;
      setDrivers(newDriversState);
    },
    [driversState],
  );

  const onChangeDate = (index: number, date?: Date) => {
    if (date) {
      const newDriversState = [...driversState];
      newDriversState[index].date = date;
      setDrivers(newDriversState);
    }
  };

  const onChangeDriverLicenseDate = (index: number, date?: Date) => {
    if (date) {
      const newDriversState = [...driversState];
      newDriversState[index].driverLicenseDate = date;
      setDrivers(newDriversState);
    }
  };

  const onAddNewDriverPress = useCallback(() => {
    const newDriversState = [
      ...driversState,
      {
        date: new Date(631144800000),
        driverLicenseDate: new Date(631144800000),
        pin: '',
        surname: '',
        name: '',
        secondName: '',
        class: '',
      },
    ];

    setDrivers(newDriversState);
  }, [driversState]);

  const onPressRules = useCallback(() => Alert.alert('Rules'), []);
  const onPressConditions = useCallback(() => Alert.alert('Conditions'), []);
  const onPressLoadDoc = useCallback(() => Alert.alert('Documents'), []);

  return (
    <ScreenContainer title={t('osago.statementScreen.title')}>
      <BlueTitle
        marginBottom={16}
        title={t('osago.statementScreen.totalInformation')}
      />
      <CheckBoxField
        marginBottom={16}
        onChangeValue={onChangeValueIAmTheOwner}
        value={Boolean(state?.iAmTheOwner)}
        title={t('osago.statementScreen.iAmTheOwner')}
        subTitle={t('osago.statementScreen.iAmTheOwnerSubtitle')}
      />
      <CheckBoxField
        marginBottom={16}
        onChangeValue={onChangeValueIHaveCard}
        value={Boolean(state?.iHaveCard)}
        title={t('osago.statementScreen.iHaveCard')}
      />
      <CheckBoxField
        marginBottom={16}
        onChangeValue={onChangeValueCarRegisteredInKr}
        value={Boolean(state?.carRegisteredInKr)}
        title={t('osago.statementScreen.carRegisteredInKr')}
      />
      <PickerComponent
        marginBottom={16}
        items={NUMBER_OF_DRIVERS}
        onValueChange={onNumberOfDriversChangeHandler}
        selectedValue={state.numberOfDrivers}
        title={t('osago.statementScreen.product')}
      />
      <PickerComponent
        marginBottom={16}
        items={VALIDITY}
        onValueChange={onValidityChangeHandler}
        selectedValue={state.validity}
        title={t('osago.statementScreen.validity')}
      />
      <InputComponent
        value={state.email}
        onChangeValue={onEmailChangeHandler}
        title={t('osago.statementScreen.email')}
        autoComplete={'email'}
        placeholder={'mail@mail.com'}
        marginBottom={16}
      />
      <MaskedInput
        marginBottom={16}
        title={t('osago.statementScreen.phone')}
        placeholder={MASK}
        keyboardType="phone-pad"
        mask={MASK}
        changeValueHandler={changePhoneHandler}
        value={state.phone}
      />
      {driversState.map((driver, index) => (
        <Driver
          key={index}
          index={index}
          driver={driver}
          onChangeDate={onChangeDate}
          onChangeDriverLicenseDate={onChangeDriverLicenseDate}
          onClassChangeHandler={onClassChangeHandler}
          onNameChangeHandler={onNameChangeHandler}
          onPinChangeHandler={onPinChangeHandler}
          onSecondNameChangeHandler={onSecondNameChangeHandler}
          onSurnameChangeHandler={onSurnameChangeHandler}
        />
      ))}
      <StyledPressable onPress={onAddNewDriverPress}>
        <Typography.B18 color={'rgba(39, 77, 137, 1)'}>
          {t('osago.statementScreen.addDriver')}
        </Typography.B18>
      </StyledPressable>
      <BlueTitle
        marginBottom={16}
        title={t('osago.statementScreen.infoAboutCar')}
      />
      <PickerComponent
        marginBottom={16}
        items={NUMBER_OF_DRIVERS}
        onValueChange={onCarModelChangeHandler}
        selectedValue={state.carModel}
        title={t('osago.statementScreen.carModel')}
      />
      <PickerComponent
        marginBottom={16}
        items={NUMBER_OF_DRIVERS}
        onValueChange={onModelChangeHandler}
        selectedValue={state.model}
        title={t('osago.statementScreen.model')}
      />
      <PickerComponent
        marginBottom={16}
        items={NUMBER_OF_DRIVERS}
        onValueChange={onYearOfIssueChangeHandler}
        selectedValue={state.yearOfIssue}
        title={t('osago.statementScreen.yearOfIssue')}
      />
      <PickerComponent
        marginBottom={16}
        items={NUMBER_OF_DRIVERS}
        onValueChange={onCarTypeChangeHandler}
        selectedValue={state.carType}
        title={t('osago.statementScreen.carType')}
      />
      <PickerComponent
        marginBottom={16}
        items={NUMBER_OF_DRIVERS}
        onValueChange={onNumberOfSeatsChangeHandler}
        selectedValue={state.numberOfSeats}
        title={t('osago.statementScreen.numberOfSeats')}
      />
      <PickerComponent
        marginBottom={16}
        items={NUMBER_OF_DRIVERS}
        onValueChange={onEngineCapacityChangeHandler}
        selectedValue={state.engineCapacity}
        title={t('osago.statementScreen.engineCapacity')}
      />
      <PickerComponent
        marginBottom={16}
        items={NUMBER_OF_DRIVERS}
        onValueChange={onMotorPowerChangeHandler}
        selectedValue={state.motorPower}
        title={t('osago.statementScreen.motorPower')}
      />
      <PickerComponent
        marginBottom={16}
        items={NUMBER_OF_DRIVERS}
        onValueChange={onLoadCapacityChangeHandler}
        selectedValue={state.loadCapacity}
        title={t('osago.statementScreen.loadCapacity')}
      />
      <InputComponent
        value={state.engineNumber}
        onChangeValue={onEngineNumberHandler}
        title={t('osago.statementScreen.engineNumber')}
        marginBottom={16}
      />
      <BlueTitle
        marginBottom={16}
        title={t('osago.statementScreen.policeInformation')}
      />
      <CheckBoxField
        marginBottom={16}
        onChangeValue={onChangeNeedDelivery}
        value={Boolean(state?.needDelivery)}
        title={t('osago.statementScreen.doYouNeedDelivery')}
        subTitle={t('osago.statementScreen.doYouNeedDeliverySubtitle')}
      />
      <Typography.B16 color={theme.textColor}>
        {t('osago.statementScreen.deliveryPaid')}
      </Typography.B16>
      <InputComponent
        value={state.whereToDeliver}
        onChangeValue={onWhereToDeliverHandler}
        title={t('osago.statementScreen.whereToDeliver')}
        marginBottom={16}
      />
      <PickerComponent
        marginBottom={16}
        items={NUMBER_OF_DRIVERS}
        onValueChange={onWhereToPickChangeHandler}
        selectedValue={state.whereToPick}
        title={t('osago.statementScreen.whereToPick')}
      />
      <Row alignItems={'center'} marginBottom={16}>
        <Block flex={1} marginRight={24}>
          <Typography.R16 color={theme.textColor}>
            {t('osago.statementScreen.IRead')}
          </Typography.R16>

          <Typography.R16 color={theme.textColor}>
            <Typography.B16
              color={theme.textColor}
              style={{
                textDecorationLine: 'underline',
              }}
              onPress={onPressRules}>
              {t('osago.statementScreen.rules')}
            </Typography.B16>

            <Typography.R16 color={theme.textColor}>
              {t('osago.statementScreen.and')}
            </Typography.R16>

            <Typography.B16
              color={theme.textColor}
              style={{
                textDecorationLine: 'underline',
              }}
              onPress={onPressConditions}>
              {t('osago.statementScreen.conditions')}
            </Typography.B16>
          </Typography.R16>

          <Typography.R16 color={theme.textColor}>
            {t('osago.statementScreen.registration')}
          </Typography.R16>
        </Block>
        <CheckBox
          value={state.IAmAgree}
          onValueChange={onChangeIAmAgree}
          tintColors={{
            true: 'rgba(25, 135, 84, 1)',
            false: 'rgba(25, 135, 84, 1)',
          }}
        />
      </Row>
      <Button
        marginVertical={8}
        title={t('osago.statementScreen.loadDoc')}
        onPress={onPressLoadDoc}
      />
    </ScreenContainer>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: 'rgba(39, 77, 137, 1)',
  borderRadius: 10,
  paddingVertical: 16,
  marginBottom: 16,
});
