import React from 'react';
import {Block, Colors, WINDOW_WIDTH} from '@UIKit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, FinesStackParamList} from '@navigators';
import ImageViewer from 'react-native-image-zoom-viewer';
import {ActivityIndicator} from 'react-native';

type Props = NativeStackScreenProps<
  FinesStackParamList,
  EScreens.MODAL_IMAGE_VIEWER
>;

export const ModalImageViewer: React.FC<Props> = ({route}) => {
  return (
    <Block flex={1} backgroundColor={Colors.white}>
      <ImageViewer
        saveToLocalByLongPress={false}
        style={{
          width: WINDOW_WIDTH,
          flex: 1,
        }}
        loadingRender={() => <ActivityIndicator size="large" color={'white'} />}
        imageUrls={[{url: route.params.url}]}
      />
    </Block>
  );
};
