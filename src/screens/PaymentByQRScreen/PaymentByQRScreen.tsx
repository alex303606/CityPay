import {
  Block,
  Button,
  Colors,
  EShadow,
  Icon,
  InputField,
  Row,
  ScreenContainer,
  ShadowsSizes,
  Typography,
} from '@UIKit';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, FinesStackParamList} from '@navigators';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@hooks';
import styled from 'styled-components';

type Props = NativeStackScreenProps<
  FinesStackParamList,
  EScreens.PAYMENTS_BY_QR_SCREEN
>;

export const PaymentByQRScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();

  const {
    params: {icon},
  } = route;
  const [code, setCode] = useState('');
  const [ammount, setAmmount] = useState('');

  return (
    <ScreenContainer title={t('fines.title')}>
      <Block flex={1}>
        <Row alignItems={'center'} justifyContent={'space-between'}>
          <Typography.R20 numberOfLines={2} color={theme.textColor}>
            {t('fines.paymentByCode')}
          </Typography.R20>
          <StyledBlock backgroundColor={Colors.white} marginRight={8}>
            <Icon name={icon} size={32} color={Colors.blue} />
          </StyledBlock>
        </Row>
        <Row marginVertical={16}>
          <InputField
            maxLength={14}
            keyboardType={'numeric'}
            value={code}
            onChangeValue={setCode}
            label={t('fines.paymentCode')}
            showAdditionalButton
          />
        </Row>
        <Row marginVertical={16}>
          <InputField
            disabled={false}
            keyboardType={'numeric'}
            value={ammount}
            onChangeValue={setAmmount}
            label={t('fines.paymentAmmount')}
          />
        </Row>
        <Button
          title={t('fines.goToPay')}
          onPress={() => null}
          marginTop={16}
        />
      </Block>
    </ScreenContainer>
  );
};

const StyledBlock = styled(Block)({
  borderRadius: 10,
  width: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: ShadowsSizes[EShadow.S],
});
