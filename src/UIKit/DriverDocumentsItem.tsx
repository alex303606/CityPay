import React, {useCallback} from 'react';
import {Block} from './helpers';
import {DocumentsScanItem} from './DocumentsScanItem';
import {useTranslation} from 'react-i18next';
import {DriverPhotos, IPhoto} from '../screens/Osago/types';
import {BlueTitle} from './BlueTitle';

type Props = {
  driver: DriverPhotos;
  driverIndex: number;
  saveIdCard: (photo: IPhoto, index: number) => void;
  savePhotoDriverLicense: (photo: IPhoto, index: number) => void;
  savePhotoPowerAttorney: (photo: IPhoto, index: number) => void;
  handleDeletePhotoIdCard: (driverIndex: number, photoIndex: number) => void;
  handleDeletePhotoPowerAttorney: (
    driverIndex: number,
    photoIndex: number,
  ) => void;
  handleDeletePhotoDriveLicense: (
    driverIndex: number,
    photoIndex: number,
  ) => void;
};

export const DriverDocumentsItem: React.FC<Props> = ({
  driver,
  driverIndex,
  saveIdCard,
  savePhotoDriverLicense,
  savePhotoPowerAttorney,
  handleDeletePhotoIdCard,
  handleDeletePhotoPowerAttorney,
  handleDeletePhotoDriveLicense,
}) => {
  const {t} = useTranslation();

  const onDeletePhotoIdCard = useCallback(
    (photoIndex: number) => {
      handleDeletePhotoIdCard(driverIndex, photoIndex);
    },
    [driverIndex],
  );

  const onDeletePhotoDriveLicense = useCallback(
    (photoIndex: number) => {
      handleDeletePhotoDriveLicense(driverIndex, photoIndex);
    },
    [driverIndex],
  );

  const onDeletePhotoPowerAttorney = useCallback(
    (photoIndex: number) => {
      handleDeletePhotoPowerAttorney(driverIndex, photoIndex);
    },
    [driverIndex],
  );

  return (
    <Block>
      <BlueTitle
        marginBottom={16}
        title={t('osago.statementScreen.driver', {
          number: driverIndex === 0 ? '' : driverIndex + 1,
        })}
      />
      <DocumentsScanItem
        driverIndex={driverIndex}
        photos={driver.idCard}
        title={t('osago.documentsScreen.idCart')}
        savePhoto={saveIdCard}
        deletePhoto={onDeletePhotoIdCard}
      />
      <DocumentsScanItem
        driverIndex={driverIndex}
        photos={driver.driverLicense}
        title={t('osago.documentsScreen.driverLicense')}
        savePhoto={savePhotoDriverLicense}
        deletePhoto={onDeletePhotoDriveLicense}
      />
      <DocumentsScanItem
        driverIndex={driverIndex}
        photos={driver.powerAttorney}
        title={t('osago.documentsScreen.powerAttorney')}
        savePhoto={savePhotoPowerAttorney}
        deletePhoto={onDeletePhotoPowerAttorney}
      />
    </Block>
  );
};
