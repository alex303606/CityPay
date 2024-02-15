import React, {useCallback} from 'react';
import {Icon, IconNames} from './Icon';
import styled from 'styled-components';
import {Block} from './helpers';
import {Image, Pressable} from 'react-native';
import {Colors} from './constants';

type Props = {
  photo: string;
  deletePhoto: (photoIndex: number) => void;
  photoIndex: number;
};

export const CarDocumentPhoto: React.FC<Props> = ({
  photo,
  deletePhoto,
  photoIndex,
}) => {
  const handleDeletePhoto = useCallback(() => {
    deletePhoto(photoIndex);
  }, [photoIndex]);

  return (
    <WrapperImage marginRight={8}>
      <StyledImage resizeMode="cover" source={{uri: photo}} />
      <WrapperDelete>
        <StyledPressableDelete onPress={handleDeletePhoto}>
          <Icon name={IconNames.delete} size={16} />
        </StyledPressableDelete>
      </WrapperDelete>
    </WrapperImage>
  );
};

const WrapperDelete = styled(Block)({
  width: 24,
  height: 24,
  borderRadius: 12,
  position: 'absolute',
  right: 0,
  top: 0,
  overflow: 'hidden',
});

const StyledPressableDelete = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgb(225,229,232)',
});

const StyledImage = styled(Image)({
  width: '100%',
  height: '100%',
  borderRadius: 2,
});

const WrapperImage = styled(Block)({
  borderRadius: 2,
  overflow: 'hidden',
  padding: 8,
  width: 110,
  height: 110,
  borderWidth: 1,
  borderColor: Colors.grey,
});
