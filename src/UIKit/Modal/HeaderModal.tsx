import React from 'react';
import type {ModalHeaderProps} from './types';
import {ModalCloseBtn} from './ModalCloseBtn';
import {Row} from '../helpers/Layout';
import {Typography} from '../constants/Typography';

export const HeaderModal: React.FC<ModalHeaderProps> = ({
  title,
  onClosePress,
}) => (
  <Row alignItems="center" paddingVertical={16} paddingRight={16}>
    <ModalCloseBtn onClosePress={onClosePress} />
    <Row flex={1}>
      <Typography.R18>{title}</Typography.R18>
    </Row>
  </Row>
);
