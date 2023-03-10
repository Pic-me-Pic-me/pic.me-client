import axios from 'axios';

import { getAccessToken, setAccessToken } from './token';

const client = axios.create({
  baseURL: process.env.REACT_APP_IP,
  headers: {
    'Access-Control-Allow-Origin': process.env.REACT_APP_IP,
    'Content-type': 'application/json',
  },
  withCredentials: true,
});
///** config에는 위의 axiosInstance 객체를 이용하여 request를 보냈을떄의 모든 설정값들이 들어있다.
client.interceptors.request.use((config: any) => {
  const headers = {
    ...config.headers,
    Authorization: `Bearer ${getAccessToken('accessToken')}`,
    accessToken: getAccessToken('accessToken'),
  };

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
      );
      if (res.data.status === 400) {
        window.location.href = '/login';
      }

      const newAccessToken = res.data.data.accessToken;

      setAccessToken('accessToken', newAccessToken);
      originalRequest.headers = {
        newAccessToken,
      };
      return axios(originalRequest);
    }
    return error.response;
  },
);
export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
export { client };
