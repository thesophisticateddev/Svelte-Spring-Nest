// axiosInstance.js
import Axios from 'axios';
 import { getToken , isTokenExpired, updateToken} from './auth';

const ApiClient = Axios.create();

ApiClient.interceptors.request.use(
  async (config) => {
    const token = await renewTokenIfNeeded();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function renewTokenIfNeeded() {
  return new Promise(async (resolve) => {
    const token = getToken();
    if (isTokenExpired()) {
      await updateToken(); // Renew the token (adjust the token lifespan as needed)
      console.log("Token renewed");
    }
    resolve(getToken());
  });
}

export default ApiClient;
