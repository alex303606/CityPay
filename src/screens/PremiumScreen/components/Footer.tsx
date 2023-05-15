import React from 'react';
import {Row} from '@UIKit';
import {TextButton} from './TextButton';
import {useTranslation} from 'react-i18next';

type Props = {
  onPressEula: () => void;
  restorePurchase: () => void;
  onPressAgreement: () => void;
};

export const Footer: React.FC<Props> = ({
  onPressAgreement,
  onPressEula,
  restorePurchase,
}) => {
  const {t} = useTranslation();

  return (
    <Row
      alignItems={'center'}
      justifyContent={'center'}
      paddingHorizontal={8}
      paddingVertical={16}>
      <TextButton title={t('premium.agreement')} onPress={onPressAgreement} />
      <Row flex={1} justifyContent={'center'}>
        <TextButton
          title={t('premium.restorePurchase')}
          onPress={restorePurchase}
        />
      </Row>
      <TextButton title={t('premium.eula')} onPress={onPressEula} />
    </Row>
  );
};

export default Footer;
