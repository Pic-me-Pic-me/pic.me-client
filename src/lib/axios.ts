import axios from 'axios';

import Token from './token';

const TOKEN = Token.getAccessToken('accessToken');

const client = axios.create({
  baseURL: 'https://with-picme-api.com',

  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});

///** config에는 위의 axiosInstance 객체를 이용하여 request를 보냈을떄의 모든 설정값들이 들어있다.
client.interceptors.request.use((config: any) => {
  const headers = {
    ...config.headers,
    accessToken: Token.getAccessToken('accessToken'),
    refreshToken: Token.getRefreshToken('refreshToken'),
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
          accessToken: Token.getAccessToken('accessToken'),
          refreshToken: Token.getRefreshToken('refreshToken'),
        },
      );
      console.log(res);
      //리프레시 토큰도 만료돠거나 유효하지 않은 토큰인 경우
      if (res.data.status === 400) {
        window.location.href = '/login';
      }

      const newAccessToken = res.data.data.accessToken;

      Token.setAccessToken('accessToken', newAccessToken);
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
