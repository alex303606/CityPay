import React, {ReactNode} from 'react';
import {HeaderModal as DefaultHeaderModal} from './HeaderModal';
import type {ModalHeaderProps} from './types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Block} from '../helpers/Layout';
import {Colors} from '../constants/Colors';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

interface IProps {
  HeaderModal?: React.FC<ModalHeaderProps>;
  title?: string;
  onClose?: () => void;
  hideHeader?: boolean;
  children: ReactNode;
}

export const ModalContainer: React.FC<IProps> = ({
  children,
  HeaderModal = DefaultHeaderModal,
  title = '',
  onClose,
  hideHeader = false,
}) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <Block
      flex={1}
      justifyContent="flex-end"
      backgroundColor={Colors.transparent}>
      <StyledTouchable onPress={onClose ?? navigation.goBack} />
      <Block flexShrink={1} backgroundColor={Colors.white} marginTop={top}>
        {!hideHeader && (
          <HeaderModal
            title={title}
            onClosePress={onClose ?? navigation.goBack}
          />
        )}
        {children}
      </Block>
    </Block>
  );
};

const StyledTouchable = styled.TouchableOpacity.attrs({activeOpacity: 1})({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: Colors.transparent,
});
