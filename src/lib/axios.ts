import axios from 'axios';
import { Cookies } from 'react-cookie';

const TOKEN = localStorage.getItem('accessToken');
const cookies = new Cookies();

export const client = axios.create({
  baseURL: 'http://3.36.80.168:3000',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});

client.interceptors.request.use((config: any) => {
  const headers = {
    ...config.headers,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: cookies.get('refreshToken'),
  };
  console.log('req', headers);
  return { ...config, headers };
});

client.interceptors.response.use(
  async function (res) {
    return res;
  },
  async function (error: { config: any; response: { status: any } }) {
    const { config, response } = error;
    console.log(error);
    const originalRequest = config;
    if (response?.status === 401) {
      // token refresh 요청
      const { data } = await axios.post(
        `/auth/token`, // token refresh api
        {},
        {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: cookies.get('refreshToken'),
          },
        },
      );
      const newAccessToken = data.data.accessToken;
      const newRefreshToken = data.data.refreshToken;

      localStorage.setItem('accessToken', newAccessToken);
      cookies.set('refreshToken', newRefreshToken);

      originalRequest.headers = {
        newAccessToken,
        newRefreshToken,
      };
      return axios(originalRequest);
    }
    return error.response;
  },
);
