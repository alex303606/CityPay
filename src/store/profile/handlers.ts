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
