import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {BlueTitle, CheckBoxField, ScreenContainer} from '@UIKit';

type MyData = {
  iAmTheOwner: boolean;
  iHaveCard: boolean;
  carRegisteredInKr: boolean;
};

const initialState = {
  iAmTheOwner: false,
  iHaveCard: false,
  carRegisteredInKr: false,
};

export const StatementScreen = () => {
  const {t} = useTranslation();
  const [state, setMyData] = useState<MyData>(initialState);

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

  return (
    <ScreenContainer title={t('osago.statementScreen.title')}>
      <BlueTitle title={t('osago.statementScreen.totalInformation')} />
      <CheckBoxField
        marginTop={16}
        onChangeValue={onChangeValueIAmTheOwner}
        value={Boolean(state?.iAmTheOwner)}
        title={t('osago.statementScreen.iAmTheOwner')}
        subTitle={t('osago.statementScreen.iAmTheOwnerSubtitle')}
      />
      <CheckBoxField
        marginTop={16}
        onChangeValue={onChangeValueIHaveCard}
        value={Boolean(state?.iHaveCard)}
        title={t('osago.statementScreen.iHaveCard')}
      />
      <CheckBoxField
        marginTop={16}
        onChangeValue={onChangeValueCarRegisteredInKr}
        value={Boolean(state?.carRegisteredInKr)}
        title={t('osago.statementScreen.carRegisteredInKr')}
      />
    </ScreenContainer>
  );
};
