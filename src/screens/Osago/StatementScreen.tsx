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
  useGetSupportUrls,
  useTheme,
} from '@hooks';
import {
  getCarTypesList,
  getInsuranceTypeList,
  getOfficesList,
  getPeriodList,
  getProductsList,
  getUserState,
} from '@store';
import styled from 'styled-components';
import {Image, Pressable} from 'react-native';
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
  const officesList = useAppSelector(getOfficesList);
  const periodList = useAppSelector(getPeriodList);
  const productsList = useAppSelector(getProductsList);
  const insuranceTypeList = useAppSelector(getInsuranceTypeList);

  const periodListSelector = periodList?.map(period => ({
    label: period.title,
    value: period.id,
  }));

  const carTypesListSelector = carTypesList?.map(type => ({
    label: type.title,
    value: type.id,
  }));

  const productsListSelector = productsList?.map(product => ({
    label: product.title,
    value: product.id,
  }));

  const officesListSelector = officesList?.map(office => ({
    label: `${office.title}\n${office.address}\n${office.phone}`,
    value: office.id,
  }));

  const numberOfSeats = carTypesList
    ?.find(type => type.paramTitle === 'Количество мест')
    ?.selectParams?.map(s => ({label: s.title, value: s.id}));

  const carEngineCapacity = carTypesList
    ?.find(
      type =>
        type.paramTitle === 'Объем двигателя' && type.title === 'Легковое авто',
    )
    ?.selectParams?.map(s => ({label: s.title, value: s.id}));

  const motorPower = carTypesList
    ?.find(type => type.paramTitle === 'Мощность двигателя')
    ?.selectParams?.map(s => ({label: s.title, value: s.id}));

  const loadCapacity = carTypesList
    ?.find(type => type.paramTitle === 'Грузоподъемность')
    ?.selectParams?.map(s => ({label: s.title, value: s.id}));

  useEffect(() => {
    getDataFromPartnerForNewApplicationHandler();
  }, [getDataFromPartnerForNewApplicationHandler]);

  const [state, setMyData] = useState<MyDataState>({
    isOwner: false,
    isHasToCard: false,
    isKgRegistration: false,
    IAmAgree: false,
    isPickUp: true,
    numberOfDrivers: !!productsListSelector?.length
      ? productsListSelector[0].value
      : '',
    selectedPeriodId: !!periodListSelector?.length
      ? periodListSelector[0].value
      : '',
    email: '',
    phone: phone,
    carVendor: '',
    carModel: '',
    carYear: '',
    carType: !!carTypesListSelector?.length
      ? carTypesListSelector[0].value
      : '',
    numberOfSeats: !!numberOfSeats?.length ? numberOfSeats[0].value : '',
    engineCapacity: !!carEngineCapacity?.length
      ? carEngineCapacity[0].value
      : '',
    motorPower: !!motorPower?.length ? motorPower[0].value : '',
    loadCapacity: !!loadCapacity?.length ? loadCapacity[0].value : '',
    carVin: '',
    whereToDeliver: '',
    pickUpOffice: !!officesListSelector?.length
      ? officesListSelector[0].value
      : '',
    insuranceTypeId: !!insuranceTypeList.length ? insuranceTypeList[0].id : '',
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
        isOwner: value,
      }),
    [state],
  );

  const onChangeIsPickUp = useCallback(
    (value: boolean) =>
      setMyData({
        ...state,
        isPickUp: !value,
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
      setMyData({...state, isHasToCard: value});
    },
    [state],
  );

  const onChangeValueCarRegisteredInKr = useCallback(
    (value: boolean) => setMyData({...state, isKgRegistration: value}),
    [state],
  );

  const onNumberOfDriversChangeHandler = useCallback(
    (value: string) => setMyData({...state, numberOfDrivers: value}),
    [state],
  );

  const onCarVendorChangeHandler = useCallback(
    (value: string) => setMyData({...state, carVendor: value}),
    [state],
  );

  const onModelChangeHandler = useCallback(
    (value: string) => setMyData({...state, carModel: value}),
    [state],
  );

  const onYearOfIssueChangeHandler = useCallback(
    (value: string) => setMyData({...state, carYear: value}),
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
  const onPickUpOfficeChangeHandler = useCallback(
    (value: string) => setMyData({...state, pickUpOffice: value}),
    [state],
  );

  const onCarVinChangeHandler = useCallback(
    (value: string) => setMyData({...state, carVin: value}),
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

  const onSelectedPeriodChangeHandler = useCallback(
    (value: string) => setMyData({...state, selectedPeriodId: value}),
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

  const {insuranceTerms, insuranceConditions} = useGetSupportUrls();

  const onPressRules = useCallback(() => {
    navigation.navigate(EScreens.WEBVIEW_SCREEN, {
      uri: insuranceTerms,
      title: t('osago.statementScreen.rulesTitle'),
    });
  }, [insuranceTerms]);

  const onPressConditions = useCallback(() => {
    navigation.navigate(EScreens.WEBVIEW_SCREEN, {
      uri: insuranceConditions,
      title: t('osago.statementScreen.conditionsTitle'),
    });
  }, [insuranceConditions]);

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
      productsList?.find(p => state.numberOfDrivers === p.id)
        ?.maxDriversCount !== 1
    );
  }, [state.numberOfDrivers]);

  const showMotorPower = useMemo(() => {
    const type = carTypesListSelector?.find(t => t.value === state.carType);
    return !!(type && type.label === 'Электромобиль');
  }, [carTypesListSelector, state.carType]);

  return (
    <ScreenContainer title={t('osago.statementScreen.title')}>
      <Row
        marginBottom={16}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <BlueTitle title={t('osago.statementScreen.totalInformation')} />
        <StyledImage resizeMode={'contain'} source={{uri: partner.logoUrl}} />
      </Row>
      <CheckBoxField
        marginBottom={16}
        onChangeValue={onChangeValueIAmTheOwner}
        value={Boolean(state?.isOwner)}
        title={t('osago.statementScreen.iAmTheOwner')}
        subTitle={t('osago.statementScreen.iAmTheOwnerSubtitle')}
      />
      <CheckBoxField
        marginBottom={16}
        onChangeValue={onChangeValueIHaveCard}
        value={Boolean(state?.isHasToCard)}
        title={t('osago.statementScreen.iHaveCard')}
      />
      <CheckBoxField
        marginBottom={16}
        onChangeValue={onChangeValueCarRegisteredInKr}
        value={Boolean(state?.isKgRegistration)}
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
        onValueChange={onSelectedPeriodChangeHandler}
        selectedValue={state.selectedPeriodId}
        title={t('osago.statementScreen.selectedPeriod')}
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
      <PickerComponent
        marginBottom={16}
        items={carTypesListSelector}
        onValueChange={onCarTypeChangeHandler}
        selectedValue={state.carType}
        title={t('osago.statementScreen.carType')}
      />
      <InputComponent
        value={state.carVendor}
        onChangeValue={onCarVendorChangeHandler}
        title={t('osago.statementScreen.carModel')}
        marginBottom={16}
      />
      <InputComponent
        value={state.carModel}
        onChangeValue={onModelChangeHandler}
        title={t('osago.statementScreen.model')}
        marginBottom={16}
      />
      <InputComponent
        value={state.carYear}
        onChangeValue={onYearOfIssueChangeHandler}
        title={t('osago.statementScreen.yearOfIssue')}
        keyboardType={'numeric'}
        maxLength={4}
        marginBottom={16}
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
      {showMotorPower ? (
        <PickerComponent
          marginBottom={16}
          items={motorPower || []}
          onValueChange={onMotorPowerChangeHandler}
          selectedValue={state.motorPower}
          title={t('osago.statementScreen.motorPower')}
        />
      ) : null}
      <PickerComponent
        marginBottom={16}
        items={loadCapacity || []}
        onValueChange={onLoadCapacityChangeHandler}
        selectedValue={state.loadCapacity}
        title={t('osago.statementScreen.loadCapacity')}
      />
      <InputComponent
        value={state.carVin}
        onChangeValue={onCarVinChangeHandler}
        title={t('osago.statementScreen.carVin')}
        marginBottom={16}
      />
      <BlueTitle
        marginBottom={16}
        title={t('osago.statementScreen.policeInformation')}
      />
      <CheckBoxField
        marginBottom={16}
        onChangeValue={onChangeIsPickUp}
        value={!state.isPickUp}
        title={t('osago.statementScreen.isPickUp')}
        subTitle={t('osago.statementScreen.isPickUpSubtitle')}
      />
      {!state.isPickUp ? (
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
      {state.isPickUp ? (
        <PickerComponent
          marginBottom={16}
          items={officesListSelector}
          onValueChange={onPickUpOfficeChangeHandler}
          selectedValue={state.pickUpOffice}
          numberOfLines={3}
          title={t('osago.statementScreen.pickUpOffice')}
        />
      ) : null}

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
        disabled={!state.IAmAgree}
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
