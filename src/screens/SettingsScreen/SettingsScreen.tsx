import React, {useCallback, useState} from 'react';
import {Colors, IconNames, Row, Typography} from '@UIKit';
import {EScreens, SettingsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {ThemeItem} from './components/ThemeItem';
import {SwitchComponent} from '@UIKit';
import {InfoItem} from './components/InfoItem';
import {Themes} from '../../themes';
import {useTheme} from '@hooks';
import {ScreenContainer} from '@UIKit';

type Props = NativeStackScreenProps<
  SettingsStackParamList,
  EScreens.SETTINGS_SCREEN
>;

export const SettingsScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {changeTheme} = useTheme();

  const [pushValue, changePushValue] = useState<boolean>(false);

  const handleSelectTheme = useCallback(
    (theme: Themes) => {
      changeTheme(theme);
    },
    [changeTheme],
  );

  const handleChangePush = useCallback((value: boolean) => {
    changePushValue(value);
  }, []);

  const onPressInfoItem = useCallback(
    ({uri, title}: {uri: string; title: string}) =>
      navigation.navigate(EScreens.WEBVIEW_SCREEN, {
        uri,
        title,
      }),
    [navigation],
  );

  return (
    <ScreenContainer title={t('settings.title')}>
      <Typography.R16 marginBottom={16} numberOfLines={1} color={Colors.grey}>
        {t('settings.registration')}
      </Typography.R16>
      <Row justifyContent={'space-between'} marginBottom={32}>
        <ThemeItem
          theme={Themes.DEFAULT}
          color={Colors.white}
          onPress={handleSelectTheme}
        />
        <ThemeItem
          theme={Themes.RED}
          color={Colors.red}
          onPress={handleSelectTheme}
        />
        <ThemeItem
          theme={Themes.BLUE}
          color={Colors.blue}
          onPress={handleSelectTheme}
        />
      </Row>
      <SwitchComponent
        onValueChange={handleChangePush}
        text={t('settings.pushLabel')}
        value={pushValue}
      />
      <Typography.R16 marginBottom={8} numberOfLines={1} color={Colors.grey}>
        {t('settings.info')}
      </Typography.R16>
      <InfoItem
        onPress={onPressInfoItem}
        text={t('settings.questions')}
        iconName={IconNames.clipboard}
        uri={'https://citysoft.kido.kg/docs/faq.php'}
      />
      <InfoItem
        onPress={onPressInfoItem}
        text={t('settings.privacyPolicy')}
        iconName={IconNames.shield}
        uri={'https://citysoft.kido.kg/docs/conf.php'}
      />
      <InfoItem
        onPress={onPressInfoItem}
        text={t('settings.userAgreement')}
        iconName={IconNames.code}
        uri={'https://citysoft.kido.kg/docs/license.php'}
      />
      <InfoItem
        onPress={onPressInfoItem}
        text={t('settings.eula')}
        iconName={IconNames.code}
        uri={'https://citysoft.kido.kg/docs/subscriptions.php'}
      />
    </ScreenContainer>
  );
};
