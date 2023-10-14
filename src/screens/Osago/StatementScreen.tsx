import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  BlueTitle,
  CheckBoxField,
  DatePickerComponent,
  InputComponent,
  MaskedInput,
  PickerComponent,
  ScreenContainer,
} from '@UIKit';
import {useAppSelector} from '@hooks';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {getUserState} from '@store';

const MASK = '+996 999 99-99-99';

type MyDataState = {
  iAmTheOwner: boolean;
  iHaveCard: boolean;
  carRegisteredInKr: boolean;
  numberOfDrivers: string;
  validity: string;
  email: string;
  phone: string;
  date: Date;
  driverLicenseDate: Date;
  pin: string;
  surname: string;
  name: string;
  secondName: string;
};

const NUMBER_OF_DRIVERS = [
  {
    label: 'Авто водит несколько водителей',
    value: 'Авто водит несколько водителей',
  },
  {
    label: 'Авто водит 1 водитель',
    value: 'Авто водит 1 водитель',
  },
];

const VALIDITY = [
  {label: '1 год', value: '1'},
  {label: '2 года', value: '2'},
  {label: '3 года', value: '3'},
];

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
    date: new Date(631144800000),
    driverLicenseDate: new Date(631144800000),
    pin: '',
    surname: '',
    name: '',
    secondName: '',
  };

  const [state, setMyData] = useState<MyDataState>(initialState);

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
    (value: boolean) => {
      setMyData({...state, carRegisteredInKr: value});
    },
    [setMyData, state],
  );

  const onNumberOfDriversChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, numberOfDrivers: value});
    },
    [state, setMyData],
  );

  const onValidityChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, validity: value});
    },
    [state, setMyData],
  );

  const onEmailChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, email: value});
    },
    [state, setMyData],
  );

  const onSurnameChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, surname: value});
    },
    [state, setMyData],
  );

  const onNameChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, name: value});
    },
    [state, setMyData],
  );

  const onSecondNameChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, secondName: value});
    },
    [state, setMyData],
  );

  const changePhoneHandler = useCallback(
    (value: string) => {
      setMyData({...state, phone: value});
    },
    [state, setMyData],
  );

  const onPinChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, pin: value});
    },
    [state, setMyData],
  );

  const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setMyData({...state, date: date});
    }
  };

  const onChangeDriverLicenseDate = (
    event: DateTimePickerEvent,
    date?: Date,
  ) => {
    if (date) {
      setMyData({...state, driverLicenseDate: date});
    }
  };

  const showDatePicker = useCallback(() => {
    return DateTimePickerAndroid.open({
      value: state.date,
      onChange: onChangeDate,
      mode: 'date',
    });
  }, [onChangeDate]);

  const showDriverLicenseDatepicker = useCallback(() => {
    return DateTimePickerAndroid.open({
      value: state.driverLicenseDate,
      onChange: onChangeDriverLicenseDate,
      mode: 'date',
    });
  }, [onChangeDriverLicenseDate]);

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
      <BlueTitle marginBottom={16} title={t('osago.statementScreen.driver')} />
      <InputComponent
        autoComplete={'name-family'}
        value={state.surname}
        onChangeValue={onSurnameChangeHandler}
        title={t('osago.statementScreen.surname')}
        marginBottom={16}
      />
      <InputComponent
        autoComplete={'name'}
        value={state.name}
        onChangeValue={onNameChangeHandler}
        title={t('osago.statementScreen.name')}
        marginBottom={16}
      />
      <InputComponent
        value={state.secondName}
        onChangeValue={onSecondNameChangeHandler}
        title={t('osago.statementScreen.secondName')}
        marginBottom={16}
      />
      <DatePickerComponent
        marginBottom={16}
        title={t('osago.statementScreen.date')}
        value={state.date.toLocaleDateString()}
        onPress={showDatePicker}
      />
      <InputComponent
        value={state.pin}
        onChangeValue={onPinChangeHandler}
        title={t('osago.statementScreen.pin')}
        placeholder={'12345678901234'}
        marginBottom={16}
        keyboardType={'numeric'}
        maxLength={14}
      />
      <DatePickerComponent
        marginBottom={16}
        title={t('osago.statementScreen.driverLicenseDate')}
        value={state.driverLicenseDate.toLocaleDateString()}
        onPress={showDriverLicenseDatepicker}
      />
    </ScreenContainer>
  );
};
