import axios, { AxiosRequestConfig } from 'axios';
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

///** config에는 위의 axiosInstance 객체를 이용하여 request를 보냈을떄의 모든 설정값들이 들어있다.
client.interceptors.request.use((config: any) => {
  console.log(client.interceptors);
  console.log(config);
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
      console.log('토큰 만료');
      // token refresh 요청
      console.log('accesstoken', localStorage.getItem('accessToken'));
      console.log('refreshToken', cookies.get('refreshToken'));
      const res = await client.post(
        `/auth/token`, // token refresh api
        {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: cookies.get('refreshToken'),
        },
      );

      const newAccessToken = res.data.data.accessToken;

      localStorage.setItem('accessToken', newAccessToken);
      originalRequest.headers = {
        newAccessToken,
      };

      return axios(originalRequest);
    }
    console.log(client.interceptors);
    return error.response;
  },
);
