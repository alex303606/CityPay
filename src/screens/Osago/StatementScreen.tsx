import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  BlueTitle,
  CheckBoxField,
  Colors,
  Driver,
  InputComponent,
  MaskedInput,
  PickerComponent,
  ScreenContainer,
  Typography,
} from '@UIKit';
import {useAppSelector} from '@hooks';
import {getUserState} from '@store';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {MASK, NUMBER_OF_DRIVERS, VALIDITY} from './constans';
import {IDriver, MyDataState} from './types';

export const StatementScreen = () => {
  const {t} = useTranslation();
  const {phone} = useAppSelector(getUserState);
  const [state, setMyData] = useState<MyDataState>({
    iAmTheOwner: false,
    iHaveCard: false,
    carRegisteredInKr: false,
    numberOfDrivers: '',
    validity: '1 год',
    email: '',
    phone: phone,
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
});
