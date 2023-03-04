import axios from 'axios';

import { getAccessToken, setAccessToken } from './token';

const TOKEN = getAccessToken('accessToken');

const client = axios.create({
  baseURL: process.env.REACT_APP_IP,
  headers: {
    'Access-Control-Allow-Origin': process.env.REACT_APP_IP,

    'Content-type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});
///** config에는 위의 axiosInstance 객체를 이용하여 request를 보냈을떄의 모든 설정값들이 들어있다.
client.interceptors.request.use((config: any) => {
  const headers = {
    ...config.headers,
    accessToken: getAccessToken('accessToken'),
  };

  console.log('getAccessToken', getAccessToken('accessToken'));
  return { ...config, headers };
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401) {
      //token refresh 요청

      const res = await client.post(
        `/auth/token`, // token refresh api
        {
          accessToken: getAccessToken('accessToken'),
        },
        {
          withCredentials: true,
        },
      );
      // if (res.data.status === 400) {
      //   window.location.href = '/login';
      // }

      const newAccessToken = res.data.data.accessToken;

      setAccessToken('accessToken', newAccessToken);
      originalRequest.headers = {
        newAccessToken,
        withCredentials: true,
      };
      return axios(originalRequest);
    }
    return error.response;
  },
);
export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
export { client };
