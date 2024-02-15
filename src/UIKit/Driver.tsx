import React, {useCallback} from 'react';
import {BlueTitle} from './BlueTitle';
import {InputComponent} from './InputComponent';
import {DatePickerComponent} from './DatePickerComponent';
import {useTranslation} from 'react-i18next';
import {IDriver} from '../screens/Osago/types';
import {Icon, IconNames} from './Icon';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {Colors} from './constants';
import {useTheme} from '@hooks';
import {Block, Row} from './helpers';

type Props = {
  index: number;
  driver: IDriver;
  onSurnameChangeHandler: (value: string, index: number) => void;
  onNameChangeHandler: (value: string, index: number) => void;
  onSecondNameChangeHandler: (value: string, index: number) => void;
  onPinChangeHandler: (value: string, index: number) => void;
  onClassChangeHandler: (value: string, index: number) => void;
  onChangeDate: (index: number, date: string) => void;
  onChangeDriverLicenseDate: (index: number, date: string) => void;
  deleteDriver: (index: number) => void;
};

export const Driver: React.FC<Props> = ({
  index,
  driver,
  onSurnameChangeHandler,
  onNameChangeHandler,
  onSecondNameChangeHandler,
  onPinChangeHandler,
  onClassChangeHandler,
  onChangeDriverLicenseDate,
  onChangeDate,
  deleteDriver,
}) => {
  const {
    name,
    date,
    driverLicenseDate,
    class: driverClass,
    secondName,
    surname,
    pin,
    errors,
  } = driver;

  const {theme} = useTheme();

  const {t} = useTranslation();

  const onSurnameChange = useCallback(
    (value: string) => {
      onSurnameChangeHandler(value.replace(/[^a-zA-Zа-яА-Я ]/g, ''), index);
    },
    [onSurnameChangeHandler],
  );

  const onNameChange = useCallback(
    (value: string) =>
      onNameChangeHandler(value.replace(/[^a-zA-Zа-яА-Я ]/g, ''), index),
    [onNameChangeHandler],
  );

  const onSecondName = useCallback(
    (value: string) =>
      onSecondNameChangeHandler(value.replace(/[^a-zA-Zа-яА-Я ]/g, ''), index),
    [onSecondNameChangeHandler],
  );

  const onPinChange = useCallback(
    (value: string) => onPinChangeHandler(value, index),
    [onPinChangeHandler],
  );

  const onClassChang = useCallback(
    (value: string) => onClassChangeHandler(value, index),
    [onClassChangeHandler],
  );

  const onChangeDateHandler = useCallback(
    (value: string) => {
      onChangeDate(index, value);
    },
    [index],
  );

  const onChangeDriverLicenseDateHandler = useCallback(
    (value: string) => {
      onChangeDriverLicenseDate(index, value);
    },
    [index],
  );

  const deleteDriverHandler = useCallback(() => {
    deleteDriver(index);
  }, [index, deleteDriver]);

  return (
    <>
      <Row
        alignItems={'center'}
        marginBottom={16}
        justifyContent={'space-between'}>
        <BlueTitle
          title={t('osago.statementScreen.driver', {
            number: index === 0 ? '' : index + 1,
          })}
        />
        {index === 0 ? null : (
          <Wrapper>
            <StyledPressable onPress={() => null}>
              <Icon
                onPress={deleteDriverHandler}
                color={theme.textColor}
                name={IconNames.close}
                size={30}
              />
            </StyledPressable>
          </Wrapper>
        )}
      </Row>
      <InputComponent
        error={errors.surname}
        autoComplete={'name-family'}
        value={surname}
        onChangeValue={onSurnameChange}
        title={t('osago.statementScreen.surname')}
        marginBottom={16}
      />
      <InputComponent
        error={errors.name}
        autoComplete={'name'}
        value={name}
        onChangeValue={onNameChange}
        title={t('osago.statementScreen.name')}
        marginBottom={16}
      />
      <InputComponent
        value={secondName}
        onChangeValue={onSecondName}
        title={t('osago.statementScreen.secondName')}
        marginBottom={16}
      />
      <DatePickerComponent
        error={errors.date}
        onChangeText={onChangeDateHandler}
        marginBottom={16}
        title={t('osago.statementScreen.date')}
        value={date}
      />
      <InputComponent
        error={errors.pin}
        value={pin}
        onChangeValue={onPinChange}
        title={t('osago.statementScreen.pin')}
        marginBottom={16}
        keyboardType={'numeric'}
        maxLength={14}
      />
      <DatePickerComponent
        error={errors.driverLicenseDate}
        marginBottom={16}
        title={t('osago.statementScreen.driverLicenseDate')}
        value={driverLicenseDate}
        onChangeText={onChangeDriverLicenseDateHandler}
      />
      <InputComponent
        error={errors.class}
        disabled
        value={driverClass}
        onChangeValue={onClassChang}
        title={t('osago.statementScreen.class')}
        marginBottom={16}
        keyboardType={'numeric'}
        maxLength={1}
      />
    </>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
});

const Wrapper = styled(Block)({
  borderRadius: 16,
  overflow: 'hidden',
});
