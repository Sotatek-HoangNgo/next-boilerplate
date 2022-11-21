import axios, { AxiosInstance } from 'axios';
import type { AxiosRequestConfig } from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export class Request {
    instance: AxiosInstance;

    constructor(public serverEndpoint = process.env.NEXT_PUBLIC_BASE_SERVER_URL) {
        const instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            baseURL: serverEndpoint,
        });

        instance.interceptors.request.use(
            async (config: AxiosRequestConfig) => {
                // const accessToken = localStorage.getItem('accessToken');
                // if (accessToken && config.headers && !config.headers['Authorization']) {
                //     config.headers['Authorization'] = `Bearer ${accessToken}`;
                // }
                if (apiKey && config.headers) config.headers['x-api-key'] = apiKey;
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        instance.interceptors.response.use(
            (response) => response,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error) => Promise.reject(error)
            // async (error: any) => {
            //     // if (error.response?.status === 401) {
            //     //     const refreshToken = localStorage.getItem('refreshToken');
            //     //     try {
            //     //         const result = await instance.post(`${serverEndpoint}/auth/refresh-token`, {
            //     //             refreshToken,
            //     //         });
            //     //         const { loginTokens } = result.data;

            //     //         localStorage.setItem('accessToken', loginTokens.accessToken);
            //     //         localStorage.setItem('refreshToken', loginTokens.newRefreshToken);

            //     //         error.config.headers['Authorization'] = `Bearer ${loginTokens.accessToken}`;
            //     //         const newRequest = await instance.request(error.config);

            //     //         return newRequest;
            //     //     } catch (error) {
            //     //         return Promise.reject(error);
            //     //     }
            //     // } else if (error.response?.status === 403) {
            //     //     return Promise.reject(error);
            //     // }

            //     return Promise.reject(error);
            // }
        );

        this.instance = instance;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get = (url: string, params?: any) => {
        return this.instance.get(url, { params });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post = (url: string, data: any) => {
        return this.instance.post(url, data);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    put = (url: string, data: any) => {
        return this.instance.put(url, data);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    patch = (url: string, data: any) => {
        return this.instance.patch(url, data);
    };

    delete = (url: string) => {
        return this.instance.delete(url);
    };
}

export default new Request();
