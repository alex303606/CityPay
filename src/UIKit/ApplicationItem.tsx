import React, {useCallback, useMemo} from 'react';
import {IApplication} from '@store';
import {Block, Row} from './helpers';
import styled from 'styled-components';
import {Image, Pressable} from 'react-native';
import {Colors, Typography} from './constants';
import {useTranslation} from 'react-i18next';

type Props = {
  item: IApplication;
  onPress: (id: string) => void;
  onOpenPolicy: (url: string) => void;
};

export const ApplicationItem: React.FC<Props> = ({
  item,
  onPress,
  onOpenPolicy,
}) => {
  const {t} = useTranslation();

  const bgColor = useMemo(() => {
    if (item.status === 'Отклонена') {
      return 'rgba(217, 52, 52, 1)';
    }

    if (item.status === 'В процессе') {
      return 'rgba(217, 134, 52, 1)';
    }

    if (item.status === 'Новая') {
      return 'rgba(242, 201, 76, 1)';
    }

    if (item.status === 'Готов') {
      return 'rgba(25, 135, 84, 1)';
    }

    return 'rgba(25, 135, 84, 1)';
  }, []);

  const onPressHandler = useCallback(() => {
    if (item.status === 'Выдан' && !!item.insurancePolicyUrl[0]) {
      return onOpenPolicy(item.insurancePolicyUrl[0]);
    }
    onPress(item.id);
  }, [item.id]);

  return (
    <Wrapper backgroundColor={'rgba(18, 18, 29, 0.1)'}>
      <StyledPressable onPress={onPressHandler}>
        <Row justifyContent={'space-between'}>
          <Block>
            <Typography.B16 marginBottom={5} numberOfLines={1}>
              {item.status === 'Готов'
                ? t('osago.osagoListScreen.policy', {
                    number: item.title,
                  })
                : t('osago.osagoListScreen.application', {
                    number: item.title,
                  })}
            </Typography.B16>
            <Typography.R16 numberOfLines={1}>
              {`${item.carVendor} ${item.carModel}`}
            </Typography.R16>
            <Typography.R16 marginBottom={4} numberOfLines={1}>
              {item.carNumber}
            </Typography.R16>
            <Typography.R16 numberOfLines={1}>
              {item.status === 'Готов'
                ? t('osago.osagoListScreen.validDate', {
                    date: item.endDate,
                  })
                : t('osago.osagoListScreen.applicationDate', {
                    date: item.date,
                  })}
            </Typography.R16>
          </Block>
          <Block alignItems={'flex-end'} justifyContent={'space-between'}>
            <Typography.B18 numberOfLines={1}>
              {item.paymentSum}c.
            </Typography.B18>
            <WrapperStatus backgroundColor={bgColor} paddingHorizontal={4}>
              <Typography.R14 color={Colors.white} numberOfLines={1}>
                {item.status}
              </Typography.R14>
            </WrapperStatus>
            <StyledImage
              resizeMode={'contain'}
              source={{uri: item.selectedPartner.logoUrl}}
            />
          </Block>
        </Row>
      </StyledPressable>
    </Wrapper>
  );
};

const StyledPressable = styled(Pressable).attrs(() => ({
  android_ripple: {
    borderless: false,
    color: Colors.ripple,
  },
}))({
  paddingHorizontal: 16,
  paddingVertical: 10,
});

const Wrapper = styled(Block)({
  borderRadius: 10,
  overflow: 'hidden',
});

const WrapperStatus = styled(Block)({
  borderRadius: 5,
  overflow: 'hidden',
});

const StyledImage = styled(Image)({
  width: 50,
  height: 25,
});
