import axios from 'axios';

export const sendPhone = (phone: string) => {
  return axios
    .post('', {
      TYPE: 'generate_code',
      PHONE: phone,
    })
    .then(response => {
      if (response && response.data) {
        debugger;
        return response.data;
      }
    })
    .catch(error => {
      debugger;
      console.log(error);
    });
};
