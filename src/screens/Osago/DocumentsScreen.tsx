import React, {useCallback, useState} from 'react';
import {
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
import {Image} from 'react-native';
import {DriverPhotos, ICarDocuments} from './types';
const checkIcon = require('@assets/images/checkIcon.webp');

type Props = NativeStackScreenProps<
  OsagoStackParamList,
  EScreens.DOCUMENTS_SCREEN
>;

export const DocumentsScreen: React.FC<Props> = ({route}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {numberOfDrivers} = route.params;

  const [driversPhotos, setDriversPhoto] = useState<DriverPhotos[]>(
    [...Array(numberOfDrivers)].map(() => ({
      idCard: [],
      driverLicense: [],
      powerAttorney: [],
    })),
  );

  const [carPhotos, setCarPhoto] = useState<ICarDocuments>({
    registration: [],
    registrationCard: [],
  });

  const handleSavePhotoIdCard = useCallback(
    (photo: string, driverIndex: number) => {
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
    (photo: string, driverIndex: number) => {
      const newDriversPhotos = [...driversPhotos];
      newDriversPhotos[driverIndex].driverLicense = [
        ...newDriversPhotos[driverIndex].driverLicense,
        photo,
      ];
      setDriversPhoto(newDriversPhotos);
    },
    [driversPhotos],
  );

  const handleSavePhotoPowerAttorney = useCallback(
    (photo: string, driverIndex: number) => {
      const newDriversPhotos = [...driversPhotos];
      newDriversPhotos[driverIndex].powerAttorney = [
        ...newDriversPhotos[driverIndex].powerAttorney,
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

  const handleDeletePhotoPowerAttorney = useCallback(
    (driverIndex: number, photoIndex: number) => {
      const newDriversPhotos = [...driversPhotos];
      newDriversPhotos[driverIndex].powerAttorney.splice(photoIndex, 1);
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
    (photo: string) => {
      const newCarPhotos = {
        ...carPhotos,
      };
      newCarPhotos.registration.push(photo);
      setCarPhoto(newCarPhotos);
    },
    [carPhotos],
  );

  const handleSetCarPhotoRegistrationCard = useCallback(
    (photo: string) => {
      const newCarPhotos = {
        ...carPhotos,
      };
      newCarPhotos.registrationCard.push(photo);
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
    return;
  }, []);

  return (
    <ScreenContainer title={t('osago.documentsScreen.title')}>
      <Row marginBottom={16}>
        <StyledImage source={checkIcon} />
        <Typography.R16 color={theme.textColor}>
          {t('osago.documentsScreen.subTitle')}
        </Typography.R16>
      </Row>
      {driversPhotos.map((driver, index) => {
        return (
          <DriverDocumentsItem
            handleDeletePhotoIdCard={handleDeletePhotoIdCard}
            handleDeletePhotoPowerAttorney={handleDeletePhotoPowerAttorney}
            handleDeletePhotoDriveLicense={handleDeletePhotoDriveLicense}
            key={index}
            saveIdCard={handleSavePhotoIdCard}
            savePhotoDriverLicense={handleSavePhotoDriverLicense}
            savePhotoPowerAttorney={handleSavePhotoPowerAttorney}
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
