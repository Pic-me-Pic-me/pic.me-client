import axios from 'axios';

import { RefreshType } from '../types/auth';
import LocalStorage from './localStorage';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_IP}`,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

// // client side base instance (default)
// // 로컬스토리지 접근이 가능하고 token이 필요한 api 호출에서 사용
// client.interceptors.request.use((config: any) => {
//   const headers = {
//     ...config.headers,
//     accessToken: LocalStorage.getItem('accessToken'),
//     refreshToken: LocalStorage.getItem('refreshToken'),
//   };
//   console.log('req', headers);

//   return { ...config, headers };
// });

// client.interceptors.response.use(
//   async function (res) {
//     return res;
//   },
//   async function (error: { config: any; response: { status: any } }) {
//     const { config, response } = error;
//     console.log(error);
//     const originalRequest = config;
//     if (response?.status === 401) {
//       // token refresh 요청
//       const { data } = await axios.post<RefreshType>(`/auth/token`, {
//         accessToken: LocalStorage.getItem('accessToken'),
//         refreshToken: LocalStorage.getItem('refreshToken'),
//       });
//       const accessToken = data.data.accessToken;
//       // const refreshToken = data.data.refreshToken;

//       LocalStorage.setItem('accessToken', accessToken);
//       LocalStorage.setItem('refreshToken', refreshToken);

//       originalRequest.headers = {
//         accessToken,
//         refreshToken,
//       };
//       return axios(originalRequest);
//     }
//     return error.response;
//   },
// );

export { client };
