import React, {useCallback, useState} from 'react';
import {
  Block,
  Colors,
  IconNames,
  Row,
  ScrollContainer,
  Typography,
} from '@UIKit';
import {EScreens, SettingsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {ThemeItem} from './components/ThemeItem';
import {SwitchComponent} from '@UIKit';
import {InfoItem} from './components/InfoItem';

type Props = NativeStackScreenProps<
  SettingsStackParamList,
  EScreens.SETTINGS_SCREEN
>;

export const SettingsScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const [pushValue, changePushValue] = useState<boolean>(false);

  const handleSelectTheme = useCallback(() => {
    return null;
  }, []);

  const handleChangePush = useCallback((value: boolean) => {
    changePushValue(value);
  }, []);

  const onPressQuestions = useCallback(
    () =>
      navigation.navigate(EScreens.WEBVIEW_SCREEN, {
        uri: 'https://citysoft.kido.kg/docs/faq.php',
        title: t('settings.questions'),
      }),
    [navigation, t],
  );

  const onPressPrivacyPolicy = useCallback(
    () =>
      navigation.navigate(EScreens.WEBVIEW_SCREEN, {
        uri: 'https://citysoft.kido.kg/docs/conf.php',
        title: t('settings.privacyPolicy'),
      }),
    [navigation, t],
  );

  const onPressUserAgreement = useCallback(
    () =>
      navigation.navigate(EScreens.WEBVIEW_SCREEN, {
        uri: 'https://citysoft.kido.kg/docs/license.php',
        title: t('settings.userAgreement'),
      }),
    [navigation, t],
  );

  const onPressEula = useCallback(
    () =>
      navigation.navigate(EScreens.WEBVIEW_SCREEN, {
        uri: 'https://citysoft.kido.kg/docs/subscriptions.php',
        title: t('settings.eula'),
      }),
    [navigation, t],
  );

  return (
    <Block flex={1}>
      <ScrollContainer>
        <Block paddingVertical={32} paddingHorizontal={16}>
          <Typography.B28
            marginBottom={32}
            numberOfLines={1}
            color={Colors.black}>
            {t('settings.title')}
          </Typography.B28>
          <Typography.R14
            marginBottom={16}
            numberOfLines={1}
            color={Colors.grey}>
            {t('settings.registration')}
          </Typography.R14>
          <Row justifyContent={'space-between'} marginBottom={32}>
            <ThemeItem color={Colors.white} onPress={handleSelectTheme} />
            <ThemeItem color={Colors.red} onPress={handleSelectTheme} />
            <ThemeItem color={Colors.blue} onPress={handleSelectTheme} />
          </Row>
          <SwitchComponent
            onValueChange={handleChangePush}
            text={t('settings.pushLabel')}
            value={pushValue}
          />
          <Typography.R14
            marginBottom={8}
            numberOfLines={1}
            color={Colors.grey}>
            {t('settings.info')}
          </Typography.R14>
          <InfoItem
            onPress={onPressQuestions}
            text={t('settings.questions')}
            iconName={IconNames.clipboard}
          />
          <InfoItem
            onPress={onPressPrivacyPolicy}
            text={t('settings.privacyPolicy')}
            iconName={IconNames.shield}
          />
          <InfoItem
            onPress={onPressUserAgreement}
            text={t('settings.userAgreement')}
            iconName={IconNames.code}
          />
          <InfoItem
            onPress={onPressEula}
            text={t('settings.eula')}
            iconName={IconNames.code}
          />
        </Block>
      </ScrollContainer>
    </Block>
  );
};
