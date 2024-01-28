import React, {useCallback} from 'react';
import {Colors, IconNames, ScreenContainer, WINDOW_WIDTH} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import {ActivityIndicator} from 'react-native';
import Share from 'react-native-share';
import ImageViewer from 'react-native-image-zoom-viewer';

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.POLICY_SCREEN
>;

export const PolicyScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();

  const {url} = route.params;

  const onPressShare = useCallback(async () => {
    Share.open({
      title: '',
      filename: 'Полис',
      url,
    })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        err && console.log(err);
      });
  }, []);

  return (
    <ScreenContainer
      showButton
      iconName={IconNames.share}
      onPressButton={onPressShare}
      disablePaddings
      title={t('osago.policyScreen.title')}>
      <ImageViewer
        saveToLocalByLongPress={false}
        style={{
          width: WINDOW_WIDTH,
          flex: 1,
        }}
        backgroundColor={Colors.white}
        loadingRender={() => <ActivityIndicator size="large" color={'white'} />}
        imageUrls={[{url: url}]}
      />
    </ScreenContainer>
  );
};
