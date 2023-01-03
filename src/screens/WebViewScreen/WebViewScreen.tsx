import React, {useCallback} from 'react';
import {Block, Colors} from '@UIKit';
import {EScreens, SettingsStackParamList} from '@navigators';
import {StackScreenProps} from '@react-navigation/stack';
import {WebView} from 'react-native-webview';
import {HeaderModal} from '../../UIKit/Modal';

type Props = StackScreenProps<SettingsStackParamList, EScreens.WEBVIEW_SCREEN>;

export const WebViewScreen: React.FC<Props> = ({navigation, route}) => {
  const {
    params: {uri, title},
  } = route;
  const onCloseHandler = useCallback(() => navigation.goBack(), [navigation]);
  return (
    <Block flex={1} backgroundColor={Colors.white}>
      <HeaderModal title={title} onClosePress={onCloseHandler} />
      <WebView source={{uri}} />
    </Block>
  );
};
