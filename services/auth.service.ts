import type { AxiosResponse } from 'axios';
import { ILoginForm, ISignInResponse } from '@/types/auth';
import axios from '@/classes/http';

export const authService = {
    signIn: async (form: ILoginForm) => {
        try {
            const res: AxiosResponse<ISignInResponse> = await axios.post('/api/auth', form);
            return [res.data, undefined];
        } catch (error) {
            return [undefined, error];
        }
    },
};
