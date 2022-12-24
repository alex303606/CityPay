import React, {useCallback, useState} from 'react';
import {Block, Button, Colors, Icon, IconNames, Row, Typography} from '@UIKit';
import {EScreens, SettingsStackParamList} from '@navigators';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {ThemeItem} from './components/ThemeItem';
import {SwitchComponent} from '@UIKit';

type Props = NativeStackScreenProps<
  SettingsStackParamList,
  EScreens.SETTINGS_SCREEN
>;

export const SettingsScreen: React.FC<Props> = () => {
  const {t} = useTranslation();

  const [pushValue, chengePushValue] = useState<boolean>(false);

  const handleSelectTheme = useCallback(() => {
    return null;
  }, []);

  const handleChangePush = useCallback((value: boolean) => {
    chengePushValue(value);
  }, []);

  return (
    <Block
      backgroundColor={Colors.white}
      flex={1}
      paddingHorizontal={16}
      paddingVertical={32}>
      <Typography.B28 marginBottom={32} numberOfLines={1} color={Colors.black}>
        {t('settings.title')}
      </Typography.B28>
      <Typography.R14 marginBottom={16} numberOfLines={1} color={Colors.grey}>
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
      <Typography.R14 marginBottom={16} numberOfLines={1} color={Colors.grey}>
        {t('settings.info')}
      </Typography.R14>
      <Row>
        <Typography.R14 marginBottom={16} numberOfLines={1} color={Colors.grey}>
          {t('settings.questions')}
        </Typography.R14>
        <Icon color={Colors.grey} name={IconNames.help} size={32} />
      </Row>
      <Row>
        <Typography.R14 marginBottom={16} numberOfLines={1} color={Colors.grey}>
          {t('settings.privacyPolicy')}
        </Typography.R14>
        <Icon color={Colors.grey} name={IconNames.help} size={32} />
      </Row>
      <Row>
        <Typography.R14 marginBottom={16} numberOfLines={1} color={Colors.grey}>
          {t('settings.userAgreement')}
        </Typography.R14>
        <Icon color={Colors.grey} name={IconNames.help} size={32} />
      </Row>
      <Row>
        <Typography.R14 marginBottom={16} numberOfLines={1} color={Colors.grey}>
          {t('settings.eula')}
        </Typography.R14>
        <Icon color={Colors.grey} name={IconNames.help} size={32} />
      </Row>
      <Button title={'SettingsScreen'} onPress={() => null} />
    </Block>
  );
};
