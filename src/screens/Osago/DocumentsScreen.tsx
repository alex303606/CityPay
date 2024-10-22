import React, {useCallback, useState} from 'react';
import {
  Block,
  Button,
  CarDocuments,
  DriverDocumentsItem,
  Row,
  ScreenContainer,
  Typography,
} from '@UIKit';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EScreens, OsagoStackParamList} from '@navigators';
import {useTheme} from '@hooks';
import styled from 'styled-components';
import {Alert, Image} from 'react-native';
import {DriverPhotos, ICarDocuments, IPhoto} from './types';
const checkIcon = require('@assets/images/checkIcon.webp');

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.DOCUMENTS_SCREEN
>;

const LIMIT_PHOTOS = 2;

export const DocumentsScreen: React.FC<Props> = ({route, navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {numberOfDrivers, driversState, state, partner} = route.params;

  const [driversPhotos, setDriversPhoto] = useState<DriverPhotos[]>(
    [...Array(numberOfDrivers)].map(() => ({
      idCard: [],
      driverLicense: [],
    })),
  );

  const [carPhotos, setCarPhoto] = useState<ICarDocuments>({
    registration: [],
    registrationCard: [],
    powerOfAttorney: [],
  });

  const handleSavePhotoIdCard = useCallback(
    (photo: IPhoto, driverIndex: number) => {
      const newDriversPhotos = [...driversPhotos];
      newDriversPhotos[driverIndex].idCard = [
        ...newDriversPhotos[driverIndex].idCard,
        photo,
      ];
      setDriversPhoto(newDriversPhotos);
    },
    [driversPhotos],
  );

  const handleSavePhotoDriverLicense = useCallback(
    (photo: IPhoto, driverIndex: number) => {
      const newDriversPhotos = [...driversPhotos];
      newDriversPhotos[driverIndex].driverLicense = [
        ...newDriversPhotos[driverIndex].driverLicense,
        photo,
      ];
      setDriversPhoto(newDriversPhotos);
    },
    [driversPhotos],
  );

  const handleDeletePhotoIdCard = useCallback(
    (driverIndex: number, photoIndex: number) => {
      const newDriversPhotos = [...driversPhotos];
      newDriversPhotos[driverIndex].idCard.splice(photoIndex, 1);
      setDriversPhoto(newDriversPhotos);
    },
    [driversPhotos],
  );

  const handleDeletePhotoDriveLicense = useCallback(
    (driverIndex: number, photoIndex: number) => {
      const newDriversPhotos = [...driversPhotos];
      newDriversPhotos[driverIndex].driverLicense.splice(photoIndex, 1);
      setDriversPhoto(newDriversPhotos);
    },
    [driversPhotos],
  );

  const handleSetCarPhotoRegistration = useCallback(
    (photo: IPhoto) => {
      const newCarPhotos = {
        ...carPhotos,
      };
      newCarPhotos.registration.push(photo);
      setCarPhoto(newCarPhotos);
    },
    [carPhotos],
  );

  const handleSetCarPhotoRegistrationCard = useCallback(
    (photo: IPhoto) => {
      const newCarPhotos = {
        ...carPhotos,
      };
      newCarPhotos.registrationCard.push(photo);
      setCarPhoto(newCarPhotos);
    },
    [carPhotos],
  );

  const handleSetCarPhotoPowerOfAttorney = useCallback(
    (photo: IPhoto) => {
      const newCarPhotos = {
        ...carPhotos,
      };
      newCarPhotos.powerOfAttorney.push(photo);
      setCarPhoto(newCarPhotos);
    },
    [carPhotos],
  );

  const handleDeleteCarPhotoPowerOfAttorney = useCallback(
    (photoIndex: number) => {
      const newCarPhotos = {...carPhotos};
      newCarPhotos.powerOfAttorney.splice(photoIndex, 1);
      setCarPhoto(newCarPhotos);
    },
    [carPhotos],
  );

  const handleDeleteCarPhotoRegistration = useCallback(
    (photoIndex: number) => {
      const newCarPhotos = {...carPhotos};
      newCarPhotos.registration.splice(photoIndex, 1);
      setCarPhoto(newCarPhotos);
    },
    [carPhotos],
  );

  const handleDeleteCarPhotoRegistrationCard = useCallback(
    (photoIndex: number) => {
      const newCarPhotos = {...carPhotos};
      newCarPhotos.registrationCard.splice(photoIndex, 1);
      setCarPhoto(newCarPhotos);
    },
    [carPhotos],
  );

  const onPressDrawUp = useCallback(() => {
    const errorDriverPhotos = driversPhotos.some(
      driversPhotos =>
        driversPhotos.driverLicense.length < LIMIT_PHOTOS ||
        driversPhotos.idCard.length < LIMIT_PHOTOS,
    );

    const isCarPhotosRegistrationError =
      carPhotos.registration.length < LIMIT_PHOTOS;

    const isCarPhotosRegistrationCardError =
      carPhotos.registrationCard.length < LIMIT_PHOTOS && state.isHasToCard;

    const isCarPhotosPowerOfAttorneyError =
      carPhotos.powerOfAttorney.length < LIMIT_PHOTOS && !state.isOwner;

    if (
      errorDriverPhotos ||
      isCarPhotosRegistrationError ||
      isCarPhotosRegistrationCardError ||
      isCarPhotosPowerOfAttorneyError
    ) {
      return Alert.alert(t('osago.statementScreen.errorDoc'));
    }

    navigation.navigate(EScreens.INFO_PAYMENTS_SCREEN, {
      state,
      driversState,
      partner,
      driversPhotos,
      carPhotos,
    });
  }, [state, driversState, partner]);

  return (
    <ScreenContainer title={t('osago.documentsScreen.title')}>
      <Row marginBottom={16}>
        <StyledImage source={checkIcon} />
        <Block flex={1}>
          <Typography.R16 color={theme.textColor}>
            {t('osago.documentsScreen.subTitle')}
          </Typography.R16>
        </Block>
      </Row>
      {driversPhotos.map((driver, index) => {
        return (
          <DriverDocumentsItem
            handleDeletePhotoIdCard={handleDeletePhotoIdCard}
            handleDeletePhotoDriveLicense={handleDeletePhotoDriveLicense}
            key={index}
            saveIdCard={handleSavePhotoIdCard}
            savePhotoDriverLicense={handleSavePhotoDriverLicense}
            driverIndex={index}
            driver={driver}
          />
        );
      })}
      <CarDocuments
        onSavePhotoRegistration={handleSetCarPhotoRegistration}
        onDeletePhotoRegistration={handleDeleteCarPhotoRegistration}
        onSavePhotoRegistrationCard={handleSetCarPhotoRegistrationCard}
        onDeletePhotoRegistrationCard={handleDeleteCarPhotoRegistrationCard}
        carPhotos={carPhotos}
        onDeletePowerAttorney={handleDeleteCarPhotoPowerOfAttorney}
        onSavePhotoPowerAttorney={handleSetCarPhotoPowerOfAttorney}
        isOwner={state.isOwner}
        isHasToCard={state.isHasToCard}
      />
      <Button
        marginVertical={8}
        title={t('osago.documentsScreen.drawUp')}
        onPress={onPressDrawUp}
      />
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)({
  width: 16,
  height: 16,
  marginRight: 8,
});
