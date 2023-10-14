import React from 'react';
import {Block, Row} from './helpers';
import {Typography} from './constants';
import CheckBox from '@react-native-community/checkbox';
import {useTheme} from '@hooks';

type Props = {
  title: string;
  subTitle?: string;
  value: boolean;
  onChangeValue: (value: boolean) => void;
  marginBottom?: number;
};

export const CheckBoxField: React.FC<Props> = ({
  title,
  subTitle,
  value,
  onChangeValue,
  marginBottom,
}) => {
  const {theme} = useTheme();

  return (
    <Row alignItems={'center'} marginBottom={marginBottom}>
      <Block flex={1} marginRight={24}>
        <Typography.B16 color={theme.textColor} marginBottom={5}>
          {title}
        </Typography.B16>
        {subTitle ? (
          <Typography.R16 color={theme.textColor}>{subTitle}</Typography.R16>
        ) : null}
      </Block>
      <CheckBox
        value={value}
        onValueChange={onChangeValue}
        tintColors={{
          true: 'rgba(25, 135, 84, 1)',
          false: 'rgba(25, 135, 84, 1)',
        }}
      />
    </Row>
  );
};
