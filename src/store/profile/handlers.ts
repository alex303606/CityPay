import axios from 'axios';

export const sendPhone = () => {
  return axios
    .post('', {
      TYPE: 'login',
      PHONE: 'phone',
      CODE: 'code',
    })
    .then(response => {
      if (response && response.data) {
        return response.data;
      }
    })
    .catch(error => console.log(error));
};
