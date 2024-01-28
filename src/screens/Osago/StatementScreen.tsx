import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
  ScrollContainer,
  Typography,
} from '@UIKit';
import {
  useAppSelector,
  useGetDataFromPartnerForNewApplication,
  useTheme,
  useValidationFields,
} from '@hooks';
import {
  getCarTypesList,
  getDeliveryList,
  getInsuranceTypeList,
  getOfficesList,
  getPeriodList,
  getProductsList,
  getUserState,
} from '@store';
import styled from 'styled-components';
import {Image, Pressable, ScrollView} from 'react-native';
import {IDriver, IErrorFieldsState, MyDataState} from './types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';

const MASK = '+996 999 99-99-99';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.NEW_STATEMENT_SCREEN
>;

export const StatementScreen: React.FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const [isDelivery, setIsDelivery] = useState<boolean>(false);

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
  const deliveryList = useAppSelector(getDeliveryList);

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

  useEffect(() => {
    getDataFromPartnerForNewApplicationHandler();
  }, [getDataFromPartnerForNewApplicationHandler]);

  const insuranceTypeListSelector = insuranceTypeList.map(insurance => {
    return {
      label: insurance.title,
      value: insurance.id,
    };
  });

  const [state, setMyData] = useState<MyDataState>({
    isOwner: true,
    isHasToCard: false,
    isKgRegistration: true,
    deliveryId: undefined,
    product: undefined,
    selectedPeriodId: undefined,
    email: '',
    contactPhone: phone,
    phone: phone,
    carNumber: '',
    carVendor: '',
    carModel: '',
    carYear: '',
    carType: undefined,
    carTypeParamId: undefined,
    carVin: '',
    deliveryAddress: '',
    pickUpOffice: undefined,
    insuranceTypeId:
      insuranceTypeListSelector.length && insuranceTypeListSelector[0].value
        ? insuranceTypeListSelector[0].value
        : '',
  });

  const carTypesParams = useMemo(() => {
    const carTypesParams = carTypesList.find(type => type.id === state.carType);
    if (!carTypesParams) {
      return undefined;
    }

    return {
      title: carTypesParams.paramTitle,
      params: carTypesParams.selectParams.map(t => ({
        label: t.title,
        value: t.id,
      })),
    };
  }, [state.carType]);

  const [driversState, setDrivers] = useState<IDriver[]>([
    {
      date: '',
      driverLicenseDate: '',
      pin: '',
      surname: '',
      name: '',
      secondName: '',
      class: '3',
      errors: {
        pin: false,
        surname: false,
        name: false,
        class: false,
        date: false,
        driverLicenseDate: false,
      },
    },
  ]);

  const [errorFieldsState, setErrorFieldsState] = useState<IErrorFieldsState>({
    email: false,
    carVendor: false,
    carNumber: false,
    carModel: false,
    carYear: false,
    carVin: false,
    contactPhone: false,
    carType: false,
    selectedPeriodId: false,
    product: false,
    deliveryAddress: false,
    pickUpOffice: false,
    carTypeParamId: false,
  });

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, []);

  const {validate} = useValidationFields(
    state,
    setErrorFieldsState,
    errorFieldsState,
    scrollToTop,
    navigation,
    partner,
  );

  const onChangeValueIAmTheOwner = useCallback(
    (value: boolean) =>
      setMyData({
        ...state,
        isOwner: value,
      }),
    [state],
  );

  const onChangeIsDelivery = useCallback(
    (value: boolean) => {
      setIsDelivery(value);
      const delivery = deliveryList.find(
        delivery => delivery.isDelivery === value,
      );
      if (delivery) {
        setMyData({
          ...state,
          deliveryId: delivery.id,
        });
      }
    },
    [isDelivery, state],
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
    (value: string) => {
      const product = productsList.find(product => product.id === value);
      if (product?.maxDriversCount === 1) {
        const newDriversState = [...driversState];
        newDriversState.splice(1, driversState.length);
        setDrivers(newDriversState);
      }
      setErrorFieldsState({...errorFieldsState, product: false});
      return setMyData({...state, product: value});
    },
    [state, errorFieldsState],
  );

  const onCarVendorChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, carVendor: value});
      setErrorFieldsState({...errorFieldsState, carVendor: false});
    },
    [state, errorFieldsState],
  );

  const onCarNumberChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, carNumber: value});
      setErrorFieldsState({...errorFieldsState, carNumber: false});
    },
    [state, errorFieldsState],
  );

  const onModelChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, carModel: value});
      setErrorFieldsState({...errorFieldsState, carModel: false});
    },
    [state, errorFieldsState],
  );

  const onYearOfIssueChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, carYear: value});
      setErrorFieldsState({...errorFieldsState, carYear: false});
    },
    [state, errorFieldsState],
  );

  const onCarTypeChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, carType: value});
      setErrorFieldsState({...errorFieldsState, carType: false});
    },
    [state, errorFieldsState],
  );

  const onCarTypeParamIdChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, carTypeParamId: value});
      setErrorFieldsState({...errorFieldsState, carTypeParamId: false});
    },
    [state, errorFieldsState],
  );

  const onPickUpOfficeChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, pickUpOffice: value});
      setErrorFieldsState({...errorFieldsState, pickUpOffice: false});
    },
    [state, errorFieldsState],
  );

  const onCarVinChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, carVin: value});
      setErrorFieldsState({...errorFieldsState, carVin: false});
    },
    [state, errorFieldsState],
  );

  const onDeliveryAddressChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, deliveryAddress: value});
      setErrorFieldsState({...errorFieldsState, deliveryAddress: false});
    },
    [state, errorFieldsState],
  );

  const onSelectedPeriodChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, selectedPeriodId: value});
      setErrorFieldsState({...errorFieldsState, selectedPeriodId: false});
    },
    [state, errorFieldsState],
  );

  const onEmailChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, email: value});
      setErrorFieldsState({...errorFieldsState, email: false});
    },
    [state, errorFieldsState],
  );

  const changeContactPhoneHandler = useCallback(
    (value: string) => {
      setMyData({...state, contactPhone: value});
      setErrorFieldsState({...errorFieldsState, contactPhone: false});
    },
    [state, errorFieldsState],
  );

  const onSurnameChangeHandler = useCallback(
    (value: string, index: number) => {
      const word = value.replace(/\[{3}[^]]*]{3}/g, '');
      const newDriversState = [...driversState];
      newDriversState[index].surname = word;
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

  const onClassChangeHandler = useCallback(() => {
    return null;
  }, [driversState]);

  const onChangeDate = useCallback(
    (index: number, date: string) => {
      const newDriversState = [...driversState];
      newDriversState[index].date = date;
      setDrivers(newDriversState);
    },
    [driversState],
  );

  const onChangeDriverLicenseDate = useCallback(
    (index: number, date: string) => {
      const newDriversState = [...driversState];
      newDriversState[index].driverLicenseDate = date;
      setDrivers(newDriversState);
    },
    [driversState],
  );

  const onAddNewDriverPress = useCallback(() => {
    const newDriversState = [
      ...driversState,
      {
        date: '',
        driverLicenseDate: '',
        pin: '',
        surname: '',
        name: '',
        secondName: '',
        class: '3',
        errors: {
          pin: false,
          surname: false,
          name: false,
          class: false,
          date: false,
          driverLicenseDate: false,
        },
      },
    ];

    setDrivers(newDriversState);
  }, [driversState]);

  const deleteDriverHandler = useCallback(
    (index: number) => {
      const newDriversState = [...driversState];
      newDriversState.splice(index, 1);
      setDrivers(newDriversState);
    },
    [driversState],
  );

  const onLoadDoc = useCallback(() => {
    validate(driversState, setDrivers);
  }, [state, errorFieldsState, driversState, setDrivers]);

  const showAddDriverButton = useMemo(() => {
    const product = productsList.find(product => product.id === state.product);
    if (!product) {
      return false;
    }

    return product.maxDriversCount !== driversState.length;
  }, [state.product, productsList, driversState]);

  return (
    <Block flex={1}>
      <Row
        paddingHorizontal={16}
        paddingBottom={16}
        paddingTop={32}
        backgroundColor={theme.backgroundColor}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Typography.B28 numberOfLines={2} color={theme.textColor}>
          {t('osago.statementScreen.title')}
        </Typography.B28>
      </Row>
      <ScrollContainer scrollViewRef={scrollViewRef}>
        <Block flex={1} paddingBottom={16} paddingHorizontal={16}>
          <Row
            marginBottom={16}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <BlueTitle title={t('osago.statementScreen.totalInformation')} />
            <StyledImage
              resizeMode={'contain'}
              source={{uri: partner.logoUrl}}
            />
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
            error={errorFieldsState.product}
            marginBottom={16}
            items={productsListSelector}
            onValueChange={onNumberOfDriversChangeHandler}
            selectedValue={state.product}
            title={t('osago.statementScreen.product')}
          />
          <PickerComponent
            error={errorFieldsState.selectedPeriodId}
            marginBottom={16}
            items={periodListSelector}
            onValueChange={onSelectedPeriodChangeHandler}
            selectedValue={state.selectedPeriodId}
            title={t('osago.statementScreen.selectedPeriod')}
          />
          <InputComponent
            error={errorFieldsState.email}
            value={state.email}
            onChangeValue={onEmailChangeHandler}
            title={t('osago.statementScreen.email')}
            autoComplete={'email'}
            marginBottom={16}
          />
          <MaskedInput
            error={errorFieldsState.contactPhone}
            marginBottom={16}
            title={t('osago.statementScreen.phone')}
            placeholder={MASK}
            keyboardType="phone-pad"
            mask={MASK}
            changeValueHandler={changeContactPhoneHandler}
            value={state.phone}
          />
          {driversState.map((driver, index) => (
            <Driver
              deleteDriver={deleteDriverHandler}
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
            error={errorFieldsState.carType}
            marginBottom={16}
            items={carTypesListSelector}
            onValueChange={onCarTypeChangeHandler}
            selectedValue={state.carType}
            title={t('osago.statementScreen.carType')}
          />
          {carTypesParams ? (
            <PickerComponent
              marginBottom={16}
              error={errorFieldsState.carTypeParamId}
              items={carTypesParams.params}
              onValueChange={onCarTypeParamIdChangeHandler}
              selectedValue={state.carTypeParamId}
              title={carTypesParams.title}
            />
          ) : null}
          <InputComponent
            error={errorFieldsState.carNumber}
            value={state.carNumber}
            onChangeValue={onCarNumberChangeHandler}
            title={t('osago.statementScreen.carNumber')}
            marginBottom={16}
          />
          <InputComponent
            error={errorFieldsState.carVendor}
            value={state.carVendor}
            onChangeValue={onCarVendorChangeHandler}
            title={t('osago.statementScreen.carModel')}
            marginBottom={16}
          />
          <InputComponent
            error={errorFieldsState.carModel}
            value={state.carModel}
            onChangeValue={onModelChangeHandler}
            title={t('osago.statementScreen.model')}
            marginBottom={16}
          />
          <InputComponent
            error={errorFieldsState.carYear}
            value={state.carYear}
            onChangeValue={onYearOfIssueChangeHandler}
            title={t('osago.statementScreen.yearOfIssue')}
            keyboardType={'numeric'}
            maxLength={4}
            marginBottom={16}
          />
          <InputComponent
            error={errorFieldsState.carVin}
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
            onChangeValue={onChangeIsDelivery}
            value={isDelivery}
            title={t('osago.statementScreen.isPickUp')}
            subTitle={t('osago.statementScreen.isPickUpSubtitle')}
          />
          {isDelivery ? (
            <>
              <Typography.B16 color={theme.textColor}>
                {t('osago.statementScreen.deliveryPaid')}
              </Typography.B16>
              <InputComponent
                error={errorFieldsState.deliveryAddress}
                value={state.deliveryAddress}
                onChangeValue={onDeliveryAddressChangeHandler}
                title={t('osago.statementScreen.whereToDeliver')}
                marginBottom={16}
              />
            </>
          ) : null}
          {!isDelivery ? (
            <PickerComponent
              error={errorFieldsState.pickUpOffice}
              marginBottom={16}
              items={officesListSelector}
              onValueChange={onPickUpOfficeChangeHandler}
              selectedValue={state.pickUpOffice}
              numberOfLines={3}
              title={t('osago.statementScreen.pickUpOffice')}
            />
          ) : null}
          <Button
            marginVertical={8}
            title={t('osago.statementScreen.loadDoc')}
            onPress={onLoadDoc}
          />
        </Block>
      </ScrollContainer>
    </Block>
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
