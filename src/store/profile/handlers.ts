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
    .then(response => {
      if (response && response.data) {
        return response.data;
      }
    })
    .catch(error => console.warn(error));
};
