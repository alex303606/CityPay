import React, {useCallback} from 'react';
import {BlueTitle} from './BlueTitle';
import {InputComponent} from './InputComponent';
import {DatePickerComponent} from './DatePickerComponent';
import {useTranslation} from 'react-i18next';
import {IDriver} from '../screens/Osago/types';

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

  const {t} = useTranslation();

  const onSurnameChange = useCallback(
    (value: string) => onSurnameChangeHandler(value, index),
    [onSurnameChangeHandler],
  );

  const onNameChange = useCallback(
    (value: string) => onNameChangeHandler(value, index),
    [onNameChangeHandler],
  );

  const onSecondName = useCallback(
    (value: string) => onSecondNameChangeHandler(value, index),
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

  return (
    <>
      <BlueTitle
        marginBottom={16}
        title={t('osago.statementScreen.driver', {
          number: index === 0 ? '' : index + 1,
        })}
      />
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
