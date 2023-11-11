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
import {
  DRIVER,
  initialDriversState,
  MASK,
  NUMBER_OF_DRIVERS,
  VALIDITY,
} from './constans';
import {IDriver, MyDataState} from './types';

export const StatementScreen = () => {
  const {t} = useTranslation();
  const {phone} = useAppSelector(getUserState);

  const initialState: MyDataState = {
    iAmTheOwner: false,
    iHaveCard: false,
    carRegisteredInKr: false,
    numberOfDrivers: '',
    validity: '1 год',
    email: '',
    phone: phone,
  };

  const [state, setMyData] = useState<MyDataState>(initialState);
  const [driversState, setDrivers] = useState<IDriver[]>(initialDriversState);

  const onChangeValueIAmTheOwner = useCallback(
    (value: boolean) => {
      setMyData({
        ...state,
        iAmTheOwner: value,
      });
    },
    [setMyData, state],
  );

  const onChangeValueIHaveCard = useCallback(
    (value: boolean) => {
      setMyData({...state, iHaveCard: value});
    },
    [setMyData, state],
  );

  const onChangeValueCarRegisteredInKr = useCallback(
    (value: boolean) => setMyData({...state, carRegisteredInKr: value}),
    [setMyData, state],
  );

  const onNumberOfDriversChangeHandler = useCallback(
    (value: string) => setMyData({...state, numberOfDrivers: value}),
    [state, setMyData],
  );

  const onValidityChangeHandler = useCallback(
    (value: string) => setMyData({...state, validity: value}),
    [state, setMyData],
  );

  const onEmailChangeHandler = useCallback(
    (value: string) => setMyData({...state, email: value}),
    [state, setMyData],
  );

  const changePhoneHandler = useCallback(
    (value: string) => setMyData({...state, phone: value}),
    [state, setMyData],
  );

  const onSurnameChangeHandler = useCallback(
    (value: string, index: number) => {
      const newDriversState = driversState.map(
        (driver: IDriver, stateIndex) => {
          if (stateIndex === index) {
            return {
              ...driversState[stateIndex],
              surname: value,
            };
          }
          return driver;
        },
      );

      setDrivers(newDriversState);
    },
    [driversState, setDrivers],
  );

  const onNameChangeHandler = useCallback(
    (value: string, index: number) => {
      const newDriversState = driversState.map(
        (driver: IDriver, stateIndex) => {
          if (stateIndex === index) {
            return {
              ...driversState[stateIndex],
              name: value,
            };
          }
          return driver;
        },
      );
      setDrivers(newDriversState);
    },
    [driversState, setDrivers],
  );

  const onSecondNameChangeHandler = useCallback(
    (value: string, index: number) => {
      const newDriversState = driversState.map(
        (driver: IDriver, stateIndex) => {
          if (stateIndex === index) {
            return {
              ...driversState[stateIndex],
              secondName: value,
            };
          }
          return driver;
        },
      );
      setDrivers(newDriversState);
    },
    [driversState, setDrivers],
  );

  const onPinChangeHandler = useCallback(
    (value: string, index: number) => {
      const newDriversState = driversState.map(
        (driver: IDriver, stateIndex) => {
          if (stateIndex === index) {
            return {
              ...driversState[stateIndex],
              pin: value,
            };
          }
          return driver;
        },
      );
      setDrivers(newDriversState);
    },
    [driversState, setDrivers],
  );

  const onClassChangeHandler = useCallback(
    (value: string, index: number) => {
      const newDriversState = driversState.map(
        (driver: IDriver, stateIndex) => {
          if (stateIndex === index) {
            return {
              ...driversState[stateIndex],
              class: value,
            };
          }
          return driver;
        },
      );
      setDrivers(newDriversState);
    },
    [driversState, setDrivers],
  );

  const onChangeDate = (index: number, date?: Date) => {
    if (date) {
      const newDriversState = driversState.map(
        (driver: IDriver, stateIndex) => {
          if (stateIndex === index) {
            return {
              ...driversState[stateIndex],
              date,
            };
          }
          return driver;
        },
      );
      setDrivers(newDriversState);
    }
  };

  const onChangeDriverLicenseDate = (index: number, date?: Date) => {
    if (date) {
      const newDriversState = driversState.map(
        (driver: IDriver, stateIndex) => {
          if (stateIndex === index) {
            return {
              ...driversState[stateIndex],
              driverLicenseDate: date,
            };
          }
          return driver;
        },
      );
      setDrivers(newDriversState);
    }
  };

  const onAddNewDriverPress = useCallback(() => {
    setDrivers(driversState => [...driversState, DRIVER]);
  }, []);

  const renderDriver = useCallback(
    (item: IDriver, index: number) => {
      console.log(index + 1, driversState.length);
      return (
        <Driver
          key={index}
          index={index}
          name={item.name}
          date={item.date}
          driverClass={item.class}
          driverLicenseDate={item.driverLicenseDate}
          pin={item.pin}
          secondName={item.secondName}
          surname={item.surname}
          onChangeDate={onChangeDate}
          onChangeDriverLicenseDate={onChangeDriverLicenseDate}
          onClassChangeHandler={onClassChangeHandler}
          onNameChangeHandler={onNameChangeHandler}
          onPinChangeHandler={onPinChangeHandler}
          onSecondNameChangeHandler={onSecondNameChangeHandler}
          onSurnameChangeHandler={onSurnameChangeHandler}
        />
      );
    },
    [
      driversState,
      onClassChangeHandler,
      onNameChangeHandler,
      onPinChangeHandler,
      onSecondNameChangeHandler,
      onSurnameChangeHandler,
    ],
  );

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
      {driversState.map(renderDriver)}
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
