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
  useGetSupportUrls,
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
  const [iAmAgree, setIAmAgree] = useState<boolean>(false);
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

  const [state, setMyData] = useState<MyDataState>({
    isOwner: false,
    isHasToCard: false,
    isKgRegistration: false,
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
    insuranceTypeId: !!insuranceTypeList.length
      ? insuranceTypeList[0].id
      : undefined,
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
      date: new Date(631144800000),
      driverLicenseDate: new Date(631144800000),
      pin: '',
      surname: '',
      name: '',
      secondName: '',
      class: '3',
    },
  ]);

  const [errorFieldsState, setErrorFieldsState] = useState<IErrorFieldsState>({
    email: false,
    carVendor: false,
    carNumber: false,
    carModel: false,
    carYear: false,
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
    driversState,
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

  const onChangeIAmAgree = useCallback(
    (value: boolean) => setIAmAgree(value),
    [iAmAgree],
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
    (value: string) => setMyData({...state, product: value}),
    [state],
  );

  const onCarVendorChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, carVendor: value});
    },
    [state],
  );

  const onCarNumberChangeHandler = useCallback(
    (value: string) => setMyData({...state, carNumber: value}),
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

  const onCarTypeParamIdChangeHandler = useCallback(
    (value: string) => setMyData({...state, carTypeParamId: value}),
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

  const onDeliveryAddressChangeHandler = useCallback(
    (value: string) => setMyData({...state, deliveryAddress: value}),
    [state],
  );

  const onSelectedPeriodChangeHandler = useCallback(
    (value: string) => setMyData({...state, selectedPeriodId: value}),
    [state],
  );

  const onEmailChangeHandler = useCallback(
    (value: string) => {
      setMyData({...state, email: value});
    },
    [state],
  );

  const changeContactPhoneHandler = useCallback(
    (value: string) => setMyData({...state, contactPhone: value}),
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

  const onClassChangeHandler = useCallback(() => {
    return null;
  }, [driversState]);

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
        class: '3',
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

  const onLoadDoc = useCallback(() => {
    validate();
    //onLoadDocSuccess();
  }, [state, errorFieldsState]);

  const showAddDriverButton = useMemo(() => {
    return (
      productsList?.find(p => state.product === p.id)?.maxDriversCount !== 1
    );
  }, [state.product]);

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
            marginBottom={16}
            items={productsListSelector}
            onValueChange={onNumberOfDriversChangeHandler}
            selectedValue={state.product}
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
            error={errorFieldsState.email}
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
            changeValueHandler={changeContactPhoneHandler}
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
          {carTypesParams ? (
            <PickerComponent
              marginBottom={16}
              items={carTypesParams.params}
              onValueChange={onCarTypeParamIdChangeHandler}
              selectedValue={state.carType}
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
                value={state.deliveryAddress}
                onChangeValue={onDeliveryAddressChangeHandler}
                title={t('osago.statementScreen.whereToDeliver')}
                marginBottom={16}
              />
            </>
          ) : null}
          {!isDelivery ? (
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
              value={iAmAgree}
              onValueChange={onChangeIAmAgree}
              tintColors={{
                true: 'rgba(25, 135, 84, 1)',
                false: 'rgba(25, 135, 84, 1)',
              }}
            />
          </Row>
          <Button
            disabled={!iAmAgree}
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
