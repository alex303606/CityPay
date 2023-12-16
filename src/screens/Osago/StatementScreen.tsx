import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import {
  useAppSelector,
  useGetDataFromPartnerForNewApplication,
  useTheme,
} from '@hooks';
import {
  getCarTypesList,
  getDeliveryList,
  getInsuranceTypeList,
  getOfficesList,
  getPeriodList,
  getProductsList,
  getUrlsList,
  getUserState,
} from '@store';
import styled from 'styled-components';
import {Alert, Image, Pressable} from 'react-native';
import {IDriver, MyDataState} from './types';
import CheckBox from '@react-native-community/checkbox';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';

const MASK = '+996 999 99-99-99';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.NEW_STATEMENT_SCREEN
>;

export const StatementScreen: React.FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {phone} = useAppSelector(getUserState);
  const {partner} = route.params;
  const {getDataFromPartnerForNewApplicationHandler} =
    useGetDataFromPartnerForNewApplication(partner.id);

  const carTypesList = useAppSelector(getCarTypesList);
  const deliveryList = useAppSelector(getDeliveryList);
  const insuranceTypeList = useAppSelector(getInsuranceTypeList);
  const officesList = useAppSelector(getOfficesList);
  const periodList = useAppSelector(getPeriodList);
  const productsList = useAppSelector(getProductsList);
  const urlsList = useAppSelector(getUrlsList);

  const periodListSelector = periodList.map(period => ({
    label: period.title,
    value: period.id,
  }));

  const carTypesListSelector = carTypesList.map(type => ({
    label: type.title,
    value: type.id,
  }));

  const productsListSelector = productsList.map(product => ({
    label: product.title,
    value: product.id,
  }));

  const officesListSelector = officesList.map(office => ({
    label: `${office.title}\n${office.address}\n${office.phone}`,
    value: office.id,
  }));

  const numberOfSeats = carTypesList
    .find(type => type.paramTitle === 'Количество мест')
    ?.selectParams?.map(s => ({label: s.title, value: s.id}));

  const carEngineCapacity = carTypesList
    .find(
      type =>
        type.paramTitle === 'Объем двигателя' && type.title === 'Легковое авто',
    )
    ?.selectParams?.map(s => ({label: s.title, value: s.id}));

  const motorPower = carTypesList
    .find(type => type.paramTitle === 'Мощность двигателя')
    ?.selectParams?.map(s => ({label: s.title, value: s.id}));

  const loadCapacity = carTypesList
    .find(type => type.paramTitle === 'Грузоподъемность')
    ?.selectParams?.map(s => ({label: s.title, value: s.id}));

  useEffect(() => {
    getDataFromPartnerForNewApplicationHandler();
  }, [getDataFromPartnerForNewApplicationHandler]);

  const [state, setMyData] = useState<MyDataState>({
    iAmTheOwner: false,
    iHaveCard: false,
    carRegisteredInKr: false,
    IAmAgree: false,
    needDelivery: false,
    numberOfDrivers: productsListSelector[0].value,
    validity: periodListSelector[0].value,
    email: '',
    phone: phone,
    carModel: '',
    model: '',
    yearOfIssue: '',
    carType: '',
    numberOfSeats: numberOfSeats ? numberOfSeats[0].value : '',
    engineCapacity: carEngineCapacity ? carEngineCapacity[0].value : '',
    motorPower: motorPower ? motorPower[0].value : '',
    loadCapacity: loadCapacity ? loadCapacity[0].value : '',
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
  const onPressLoadDoc = useCallback(() => {
    navigation.navigate(EScreens.DOCUMENTS_SCREEN, {
      numberOfDrivers: driversState.length,
      state,
      driversState,
      partner,
    });
  }, [driversState, state, partner]);

  const showAddDriverButton = useMemo(() => {
    return (
      productsList.find(p => state.numberOfDrivers === p.id)
        ?.maxDriversCount !== 1
    );
  }, [state.numberOfDrivers]);

  return (
    <ScreenContainer title={t('osago.statementScreen.title')}>
      <Row
        marginBottom={16}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <BlueTitle title={t('osago.statementScreen.totalInformation')} />
        <StyledImage source={{uri: partner.logoUrl}} />
      </Row>
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
        items={productsListSelector}
        onValueChange={onNumberOfDriversChangeHandler}
        selectedValue={state.numberOfDrivers}
        title={t('osago.statementScreen.product')}
      />
      <PickerComponent
        marginBottom={16}
        items={periodListSelector}
        onValueChange={onValidityChangeHandler}
        selectedValue={state.validity}
        title={t('osago.statementScreen.validity')}
      />
      <InputComponent
        value={state.email}
        onChangeValue={onEmailChangeHandler}
        title={t('osago.statementScreen.email')}
        autoComplete={'email'}
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
      {showAddDriverButton ? (
        <StyledPressable
          onPress={onAddNewDriverPress}
          color={theme.buttonColor}>
          <Typography.B18 color={theme.buttonColor}>
            {t('osago.statementScreen.addDriver')}
          </Typography.B18>
        </StyledPressable>
      ) : null}
      <BlueTitle
        marginBottom={16}
        title={t('osago.statementScreen.infoAboutCar')}
      />
      <InputComponent
        value={state.carModel}
        onChangeValue={onCarModelChangeHandler}
        title={t('osago.statementScreen.carModel')}
        marginBottom={16}
      />
      <InputComponent
        value={state.model}
        onChangeValue={onModelChangeHandler}
        title={t('osago.statementScreen.model')}
        marginBottom={16}
      />
      <InputComponent
        value={state.yearOfIssue}
        onChangeValue={onYearOfIssueChangeHandler}
        title={t('osago.statementScreen.yearOfIssue')}
        keyboardType={'numeric'}
        maxLength={4}
        marginBottom={16}
      />
      <PickerComponent
        marginBottom={16}
        items={carTypesListSelector}
        onValueChange={onCarTypeChangeHandler}
        selectedValue={state.carType}
        title={t('osago.statementScreen.carType')}
      />
      <PickerComponent
        marginBottom={16}
        items={numberOfSeats || []}
        onValueChange={onNumberOfSeatsChangeHandler}
        selectedValue={state.numberOfSeats}
        title={t('osago.statementScreen.numberOfSeats')}
      />
      <PickerComponent
        marginBottom={16}
        items={carEngineCapacity || []}
        onValueChange={onEngineCapacityChangeHandler}
        selectedValue={state.engineCapacity}
        title={t('osago.statementScreen.engineCapacity')}
      />
      <PickerComponent
        marginBottom={16}
        items={motorPower || []}
        onValueChange={onMotorPowerChangeHandler}
        selectedValue={state.motorPower}
        title={t('osago.statementScreen.motorPower')}
      />
      <PickerComponent
        marginBottom={16}
        items={loadCapacity || []}
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
        value={state.needDelivery}
        title={t('osago.statementScreen.doYouNeedDelivery')}
        subTitle={t('osago.statementScreen.doYouNeedDeliverySubtitle')}
      />
      {state.needDelivery ? (
        <>
          <Typography.B16 color={theme.textColor}>
            {t('osago.statementScreen.deliveryPaid')}
          </Typography.B16>
          <InputComponent
            value={state.whereToDeliver}
            onChangeValue={onWhereToDeliverHandler}
            title={t('osago.statementScreen.whereToDeliver')}
            marginBottom={16}
          />
        </>
      ) : null}
      <PickerComponent
        marginBottom={16}
        items={officesListSelector}
        onValueChange={onWhereToPickChangeHandler}
        selectedValue={state.whereToPick}
        numberOfLines={3}
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
}))<{color: string}>(({color}) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: color,
  borderRadius: 10,
  height: 56,
  marginBottom: 16,
  backgroundColor: Colors.white,
}));

const StyledImage = styled(Image)({
  width: 150,
  height: 50,
});
