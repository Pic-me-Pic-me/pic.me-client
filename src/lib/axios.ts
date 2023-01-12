import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const TOKEN = localStorage.getItem('accessToken');
const cookies = new Cookies();

const client = axios.create({
  baseURL: process.env.REACT_APP_IP,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});

///** config에는 위의 axiosInstance 객체를 이용하여 request를 보냈을떄의 모든 설정값들이 들어있다.
client.interceptors.request.use((config: any) => {
  const headers = {
    ...config.headers,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: cookies.get('refreshToken'),
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
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: cookies.get('refreshToken'),
        },
      );

      const newAccessToken = res.data.data.accessToken;

      localStorage.setItem('accessToken', newAccessToken);
      originalRequest.headers = {
        newAccessToken,
      };
      //리프레시 토큰도 만료 되면
      if (res.data.status === 400) {
        const navigate = useNavigate();
        navigate('/auth/signin');
      }

      return axios(originalRequest);
    }
    return error.response;
  },
);
export const picmeGetFetcher = (url: string) => client.get(url).then((res) => res.data);
export { client };
