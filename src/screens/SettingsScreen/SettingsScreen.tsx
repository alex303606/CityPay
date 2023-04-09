import React, {useCallback} from 'react';
import {
  Colors,
  IconNames,
  Row,
  ScreenContainer,
  SwitchComponent,
  Typography,
} from '@UIKit';
import {EScreens, SettingsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {ThemeItem} from './components/ThemeItem';
import {InfoItem} from './components/InfoItem';
import {Themes} from '../../themes';
import {
  useAppDispatch,
  useAppSelector,
  useDependencies,
  useTheme,
} from '@hooks';
import {
  changePushActive,
  editUserData,
  getUserState,
  ILanguages,
  PushActive,
} from '@store';

type Props = NativeStackScreenProps<
  SettingsStackParamList,
  EScreens.SETTINGS_SCREEN
>;

export const SettingsScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {changeTheme} = useTheme();
  const deps = useDependencies();
  const remoteNotificationClient = deps.get('remoteNotificationClient');
  const user = useAppSelector(getUserState);
  const dispatch = useAppDispatch();
  const {theme} = useTheme();

  const handleSelectTheme = useCallback(
    (theme: Themes) => {
      changeTheme(theme);
    },
    [changeTheme],
  );

  const handleChangePush = useCallback(
    async (value: boolean) => {
      await remoteNotificationClient.getToken().then((token: string) => {
        editUserData({
          ...user,
          pushToken: token,
          pushActive: value ? PushActive.enabled : PushActive.disabled,
        });
      });
      dispatch(
        changePushActive(value ? PushActive.enabled : PushActive.disabled),
      );
    },
    [dispatch, remoteNotificationClient, user],
  );

  const onPressInfoItem = useCallback(
    ({uri, title}: {uri: string; title: string}) =>
      navigation.navigate(EScreens.WEBVIEW_SCREEN, {
        uri,
        title,
      }),
    [navigation],
  );

  const {selectedLanguage} = useAppSelector(getUserState);

  return (
    <ScreenContainer title={t('settings.title')}>
      <Typography.R16
        marginBottom={16}
        numberOfLines={1}
        color={theme.textColor}>
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
          color={'#FF6A6F'}
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
        value={user.pushActive === PushActive.enabled}
      />
      <Typography.R16
        marginBottom={8}
        numberOfLines={1}
        color={theme.textColor}>
        {t('settings.info')}
      </Typography.R16>
      <InfoItem
        onPress={onPressInfoItem}
        text={t('settings.questions')}
        iconName={IconNames.clipboard}
        uri={`https://citysoft.kido.kg/docs/faq${
          selectedLanguage === ILanguages.ru ? '' : `_${selectedLanguage}`
        }.php`}
      />
      <InfoItem
        onPress={onPressInfoItem}
        text={t('settings.privacyPolicy')}
        iconName={IconNames.shield}
        uri={`https://citysoft.kido.kg/docs/conf${
          selectedLanguage === ILanguages.ru ? '' : `_${selectedLanguage}`
        }.php`}
      />
      <InfoItem
        onPress={onPressInfoItem}
        text={t('settings.userAgreement')}
        iconName={IconNames.code}
        uri={`https://citysoft.kido.kg/docs/license${
          selectedLanguage === ILanguages.ru ? '' : `_${selectedLanguage}`
        }.php`}
      />
      <InfoItem
        onPress={onPressInfoItem}
        text={t('settings.eula')}
        iconName={IconNames.code}
        uri={`https://citysoft.kido.kg/docs/subscriptions${
          selectedLanguage === ILanguages.ru ? '' : `_${selectedLanguage}`
        }.php`}
      />
    </ScreenContainer>
  );
};
