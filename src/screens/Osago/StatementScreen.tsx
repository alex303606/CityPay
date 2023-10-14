import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Block,
  BlueTitle,
  CheckBoxField,
  Colors,
  Icon,
  IconNames,
  InputComponent,
  MaskedInput,
  PickerComponent,
  Row,
  ScreenContainer,
  Typography,
} from '@UIKit';
import styled from 'styled-components';
import {Pressable, Text} from 'react-native';
import {useTheme} from '@hooks';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const MASK = '999 99-99-99';

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
};

const initialState: MyDataState = {
  iAmTheOwner: false,
  iHaveCard: false,
  carRegisteredInKr: false,
  numberOfDrivers: '',
  validity: '1 год',
  email: '',
  phone: '',
  date: new Date(631144800000),
  driverLicenseDate: new Date(631144800000),
  pin: '',
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
  const [state, setMyData] = useState<MyDataState>(initialState);
  const {theme} = useTheme();

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

  const showDatepicker = useCallback(() => {
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
        placeholder={'example@gmail.com'}
        marginBottom={16}
      />
      <Block marginBottom={16}>
        <Typography.RF16 marginBottom={4} color={theme.tabInactiveColor}>
          {t('osago.statementScreen.phone')}
        </Typography.RF16>
        <StyledPhoneInput paddingHorizontal={10}>
          <DialCode>+996</DialCode>
          <MaskedInput
            placeholder={MASK}
            keyboardType="phone-pad"
            mask={MASK}
            changeValueHandler={changePhoneHandler}
            value={state.phone}
          />
        </StyledPhoneInput>
      </Block>
      <Block marginBottom={16}>
        <Typography.RF16 marginBottom={4} color={theme.tabInactiveColor}>
          {t('osago.statementScreen.date')}
        </Typography.RF16>
        <StyledRow justifyContent={'space-between'} alignItems={'center'}>
          <Typography.RF16 marginBottom={4} color={theme.textColor}>
            {state.date.toLocaleDateString()}
          </Typography.RF16>
          <Pressable onPress={showDatepicker}>
            <Icon
              name={IconNames.calendar}
              size={24}
              color={theme.tabInactiveColor}
            />
          </Pressable>
        </StyledRow>
      </Block>
      <InputComponent
        value={state.pin}
        onChangeValue={onPinChangeHandler}
        title={t('osago.statementScreen.pin')}
        placeholder={'12345678901234'}
        marginBottom={16}
        keyboardType={'numeric'}
        maxLength={14}
      />
      <Block marginBottom={16}>
        <Typography.RF16 marginBottom={4} color={theme.tabInactiveColor}>
          {t('osago.statementScreen.driverLicenseDate')}
        </Typography.RF16>
        <StyledRow justifyContent={'space-between'} alignItems={'center'}>
          <Typography.RF16 marginBottom={4} color={theme.textColor}>
            {state.driverLicenseDate.toLocaleDateString()}
          </Typography.RF16>
          <Pressable onPress={showDriverLicenseDatepicker}>
            <Icon
              name={IconNames.calendar}
              size={24}
              color={theme.tabInactiveColor}
            />
          </Pressable>
        </StyledRow>
      </Block>
    </ScreenContainer>
  );
};

const StyledPhoneInput = styled(Row)({
  borderRadius: 10,
  backgroundColor: 'rgba(18, 18, 29, 0.05)',
});

const DialCode = styled(Text)({
  fontSize: 20,
  lineHeight: 48,
  color: Colors.black,
});

const StyledRow = styled(Row)({
  backgroundColor: 'rgba(18, 18, 29, 0.05)',
  height: 50,
  borderRadius: 10,
  paddingHorizontal: 10,
});
