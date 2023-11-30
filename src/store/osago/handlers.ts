import axios from 'axios';

export type IPartner = {
  id: string;
  logoUrl: string;
  name: string;
};

export type ILocation = {
  id: string;
  partnersId: string[];
  title: string;
};

export type ILocationsList = {
  partnersList: IPartner[];
  locationsList: ILocation[];
};

export const getLocationsList = () => {
  return axios
    .post('https://crm.citypay.kg/api/', {
      TYPE: 'get_locations_list',
      API_KEY: '28HimH4QhcEd4muqSktp',
    })
    .then(
      (response: {
        data: {
          data: ILocationsList | null;
          result: boolean;
          message: string;
        };
      }) => {
        if (response && response.data) {
          return response.data;
        }
      },
    )
    .catch(error => console.warn(error));
};
