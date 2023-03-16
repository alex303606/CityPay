import axios from 'axios';

export const sendPhone = (phone: string) => {
  return axios
    .post('', {
      TYPE: 'generate_code',
      PHONE: `996${phone.replace(/([!?\ \-])/g, '')}`,
    })
    .then(response => {
      if (response && response.data) {
        return response.data;
      }
    })
    .catch(error => console.warn(error));
};

export const sendCode = ({phone, code}: {phone: string; code: string}) => {
  return axios
    .post('', {
      TYPE: 'login',
      PHONE: `996${phone.replace(/([!?\ \-])/g, '')}`,
      CODE: code,
    })
    .then(
      (response: {
        data: {
          data: {black_list: boolean; user_id: string};
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

export const getUser = (phone: string) => {
  return axios
    .post('', {
      TYPE: 'get_user',
      PHONE: phone,
    })
    .then(
      (response: {
        data: {
          data: {
            balls: number;
            black_list: boolean;
            carsLimit: number;
            isPremiumAccess: boolean;
            last_name: string;
            name: string;
            rating: number;
            user_id: string;
          };
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

export const editUserData = ({
  phone,
  name,
  lastName,
  newPhone,
  active,
  pushToken,
  pushActive,
}: {
  phone: string;
  name?: string;
  lastName?: string;
  newPhone?: string;
  active?: boolean;
  pushToken?: string;
  pushActive?: string;
}) => {
  return axios
    .post('', {
      TYPE: 'edit_user',
      PHONE: phone,
      NAME: name,
      LAST_NAME: lastName,
      NEW_PHONE: newPhone,
      ACTIVE: active,
      PUSH_TOKEN: pushToken,
      PUSH_ACTIVE: pushActive,
    })
    .then(
      (response: {
        data: {
          data: null;
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

export const saveFcmToken = ({
  phone,
  token,
}: {
  phone: string;
  token: string;
}) => {
  return axios
    .post('', {
      TYPE: 'save_fcm_token',
      PHONE: phone,
      TOKEN: token,
    })
    .then(
      (response: {
        data: {
          data: null;
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
