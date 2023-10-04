import React, {useState} from 'react';
import {Block, Button, ScreenContainer, Typography} from '@UIKit';
import styled from 'styled-components';
import {Image} from 'react-native';
import {useTheme} from '@hooks';
import {useTranslation} from 'react-i18next';
import {Picker} from '@react-native-picker/picker';

const emptyImage = require('@assets/images/empty-image.webp');

export const EmptyOsagoScreen = () => {
  const {theme} = useTheme();

  const {t} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <ScreenContainer scroll={false} title={t('osago.title')}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <Block flex={1} alignItems={'center'}>
        <StyledImage resizeMode="contain" source={emptyImage} />
        <Typography.B18
          marginTop={32}
          textAlign={'center'}
          color={theme.textColor}>
          {t('osago.emptyDescription')}
        </Typography.B18>
      </Block>

      <Button title={t('osago.applyOsago')} onPress={() => null} />
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 250,
});
