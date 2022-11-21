import { NextApiRequest, NextApiResponse } from 'next';
import { ISignInResponse } from '@/types/auth';
import jwt from 'jsonwebtoken';
import { KEYS } from '@/constants/keys';
import cookie from 'cookie';
import { Request } from '@/classes/http';
import { AxiosError } from 'axios';

const PRIVATE_KEY = process.env.SECRET_MESSAGE || '';
const ACCESS_TOKEN_MAX_AGE = Number(process.env.ACCESS_TOKEN_MAX_AGE);
const REFRESH_TOKEN_MAX_AGE = Number(process.env.REFRESH_TOKEN_MAX_AGE || '');

const request = new Request(process.env.BASE_URL);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ISignInResponse>) {
    if (req.method === 'POST') {
        const data = req.body;
        try {
            const authInfo = await request.post('/auth', data);
            const { accessToken, maxAge } = authInfo.data;

            // const accessToken = jwt.sign({ user: data.username, exp: ACCESS_TOKEN_MAX_AGE }, PRIVATE_KEY);
            // const refreshToken = jwt.sign({ user: data.username, exp: REFRESH_TOKEN_MAX_AGE }, PRIVATE_KEY);

            res.setHeader('Set-Cookie', [
                cookie.serialize(KEYS.ACCESS_TOKEN, accessToken, {
                    maxAge: maxAge,
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV !== 'development',
                    path: '/',
                }),
                // cookie.serialize(KEYS.REFRESH_TOKEN, refreshToken, {
                //     maxAge: REFRESH_TOKEN_MAX_AGE,
                //     httpOnly: true,
                //     sameSite: 'lax',
                //     secure: process.env.NODE_ENV !== 'development',
                //     path: '/',
                // }),
            ]);

            return res.status(200).json({
                data: {
                    accessed: true,
                },
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return res.status(error.response.status).json(error.response.data);
        }
    }
    return res.status(405).json({ data: { error: { message: 'Method Not Allowed' }, accessed: false } });
}
