import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const TOKEN = localStorage.getItem('accessToken');
const cookies = new Cookies();

const client = axios.create({
  baseURL: 'https://with-picme-api.com',
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
  function (response) {
    console.log('test', response);

    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    console.log(error);
    const originalRequest = config;

    if (status === 401) {
      console.log('토큰 만료');
      //token refresh 요청

      const res = await client.post(
        `/auth/token`, // token refresh api
        {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: cookies.get('refreshToken'),
        },
      );

      console.log(res.data.message);

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
    console.log(client.interceptors);
    return error.response;
  },
);
export { client };
