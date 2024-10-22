import {Text} from 'react-native';
import styled from 'styled-components';
import {spacings, SpacingsProps} from '../helpers';
import {Colors} from './Colors';

export interface ColoredTextProps {
  color?: string;
  textAlign?: string;
  flexShrink?: number;
}

const coloredText = styled(Text)<ColoredTextProps & SpacingsProps>`
  color: ${({color}) => color || Colors.black};
  text-align: ${({textAlign}) => textAlign || 'left'};
  ${({flexShrink}) =>
    typeof flexShrink === 'number' ? `flex-shrink: ${flexShrink}` : ''}
  ${props => spacings(props)}
`;

const regular = styled(coloredText)`
  font-family: 'SF-Pro-Display-Light';
`;

const regularFont = styled(coloredText)`
  font-family: 'SF-Pro-Display-Regular';
`;

const semiBold = styled(coloredText)`
  font-family: 'SF-Pro-Display-Semibold';
`;

const bold = styled(coloredText)`
  font-family: 'SF-Pro-Display-Semibold';
`;

const R11 = styled(regular)`
  font-size: 11px;
  line-height: 16px;
`;

const B11 = styled(bold)`
  font-size: 11px;
  line-height: 16px;
`;

const R12 = styled(regular)`
  font-size: 12px;
  line-height: 16px;
`;

const B12 = styled(bold)`
  font-size: 12px;
  line-height: 14px;
`;

const R14 = styled(regular)`
  font-size: 14px;
  line-height: 20px;
`;

const B14 = styled(bold)`
  font-size: 14px;
  line-height: 16px;
`;

const S14 = styled(semiBold)`
  font-size: 14px;
  line-height: 20px;
`;

const S16 = styled(semiBold)`
  font-size: 16px;
  line-height: 20px;
`;

const S11 = styled(semiBold)`
  font-size: 11px;
  line-height: 20px;
`;

const R16 = styled(regular)`
  font-size: 16px;
  line-height: 24px;
`;

const RF16 = styled(regularFont)`
  font-size: 16px;
  line-height: 24px;
`;

const R18 = styled(regular)`
  font-size: 18px;
  line-height: 26px;
`;

const B16 = styled(bold)`
  font-size: 16px;
  line-height: 24px;
`;

const B18 = styled(bold)`
  font-size: 18px;
  line-height: 26px;
`;

const R20 = styled(regular)`
  font-size: 20px;
  line-height: 28px;
`;

const B20 = styled(bold)`
  font-size: 20px;
  line-height: 28px;
`;

const B24 = styled(bold)`
  font-size: 24px;
  line-height: 28px;
`;

const R28 = styled(regular)`
  font-size: 28px;
  line-height: 32px;
`;

const B28 = styled(bold)`
  font-size: 28px;
  line-height: 32px;
`;

const B34 = styled(bold)`
  font-size: 34px;
  line-height: 40px;
`;

const B48 = styled(bold)`
  font-size: 48px;
  line-height: 56px;
`;

const RF52 = styled(regularFont)`
  font-size: 52px;
  line-height: 62px;
`;

const RF48 = styled(regularFont)`
  font-size: 48px;
  line-height: 56px;
`;

const RF20 = styled(regularFont)`
  font-size: 20px;
  line-height: 28px;
`;

const RF28 = styled(regularFont)`
  font-size: 28px;
  line-height: 32px;
`;

const R24 = styled(regularFont)`
  font-size: 24px;
  line-height: 28px;
`;

const RF14 = styled(regularFont)`
  font-size: 14px;
  line-height: 18px;
`;

const RF12 = styled(regularFont)`
  font-size: 12px;
  line-height: 16px;
`;

export const Typography = {
  R11,
  R12,
  B12,
  R14,
  R16,
  R18,
  R20,
  B14,
  S11,
  S14,
  S16,
  B11,
  B16,
  B18,
  B20,
  B24,
  R28,
  B28,
  B34,
  B48,
  RF52,
  RF20,
  RF28,
  RF48,
  RF14,
  R24,
  RF16,
  RF12,
};
