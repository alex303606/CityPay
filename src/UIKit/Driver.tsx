import React, {useCallback} from 'react';
import {BlueTitle} from './BlueTitle';
import {InputComponent} from './InputComponent';
import {DatePickerComponent} from './DatePickerComponent';
import {useTranslation} from 'react-i18next';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

type Props = {
  index: number;
  surname: string;
  name: string;
  secondName: string;
  date: Date;
  driverLicenseDate: Date;
  pin: string;
  driverClass: string;
  onSurnameChangeHandler: (value: string, index: number) => void;
  onNameChangeHandler: (value: string, index: number) => void;
  onSecondNameChangeHandler: (value: string, index: number) => void;
  onPinChangeHandler: (value: string, index: number) => void;
  onClassChangeHandler: (value: string, index: number) => void;
  onChangeDate: (index: number, date?: Date) => void;
  onChangeDriverLicenseDate: (index: number, date?: Date) => void;
};

export const Driver: React.FC<Props> = ({
  index,
  name,
  date,
  driverLicenseDate,
  driverClass,
  secondName,
  surname,
  pin,
  onSurnameChangeHandler,
  onNameChangeHandler,
  onSecondNameChangeHandler,
  onChangeDate,
  onPinChangeHandler,
  onChangeDriverLicenseDate,
  onClassChangeHandler,
}) => {
  const {t} = useTranslation();

  const onChangeDriverLicenseDateHandler = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      onChangeDriverLicenseDate(index, date);
    },
    [onChangeDriverLicenseDate],
  );

  const onChangeDateHandler = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      onChangeDate(index, date);
    },
    [onChangeDate],
  );

  const showDatePicker = useCallback(() => {
    return DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDateHandler,
      mode: 'date',
    });
  }, [onChangeDateHandler]);

  const showDriverLicenseDatepicker = useCallback(() => {
    return DateTimePickerAndroid.open({
      value: driverLicenseDate,
      onChange: onChangeDriverLicenseDateHandler,
      mode: 'date',
    });
  }, [onChangeDriverLicenseDateHandler]);

  const onSurnameChange = useCallback(
    (value: string) => onSurnameChangeHandler(value, index),
    [],
  );

  const onNameChange = useCallback(
    (value: string) => onNameChangeHandler(value, index),
    [],
  );

  const onSecondName = useCallback(
    (value: string) => onSecondNameChangeHandler(value, index),
    [],
  );

  const onPinChange = useCallback(
    (value: string) => onPinChangeHandler(value, index),
    [],
  );

  const onClassChang = useCallback(
    (value: string) => onClassChangeHandler(value, index),
    [],
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
        autoComplete={'name-family'}
        value={surname}
        onChangeValue={onSurnameChange}
        title={t('osago.statementScreen.surname')}
        marginBottom={16}
      />
      <InputComponent
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
        marginBottom={16}
        title={t('osago.statementScreen.date')}
        value={date.toLocaleDateString()}
        onPress={showDatePicker}
      />
      <InputComponent
        value={pin}
        onChangeValue={onPinChange}
        title={t('osago.statementScreen.pin')}
        placeholder={'12345678901234'}
        marginBottom={16}
        keyboardType={'numeric'}
        maxLength={14}
      />
      <DatePickerComponent
        marginBottom={16}
        title={t('osago.statementScreen.driverLicenseDate')}
        value={driverLicenseDate.toLocaleDateString()}
        onPress={showDriverLicenseDatepicker}
      />
      <InputComponent
        value={driverClass}
        onChangeValue={onClassChang}
        title={t('osago.statementScreen.class')}
        marginBottom={16}
        keyboardType={'numeric'}
        maxLength={14}
      />
    </>
  );
};
