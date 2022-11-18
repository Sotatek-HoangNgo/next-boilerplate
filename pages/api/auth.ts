import { NextApiRequest, NextApiResponse } from 'next';
import { ISignInResponse } from '@/types/auth';
import jwt from 'jsonwebtoken';
import { KEYS } from '@/constants/keys';
import cookie from 'cookie';

const PRIVATE_KEY = process.env.SECRET_MESSAGE || '';
const ACCESS_TOKEN_MAX_AGE = Number(process.env.ACCESS_TOKEN_MAX_AGE);
const REFRESH_TOKEN_MAX_AGE = Number(process.env.REFRESH_TOKEN_MAX_AGE || '');

export default function handler(req: NextApiRequest, res: NextApiResponse<ISignInResponse>) {
    if (req.method === 'POST') {
        const data = req.body;
        const accessToken = jwt.sign({ user: data.username, exp: ACCESS_TOKEN_MAX_AGE }, PRIVATE_KEY);
        const refreshToken = jwt.sign({ user: data.username, exp: REFRESH_TOKEN_MAX_AGE }, PRIVATE_KEY);

        res.setHeader('Set-Cookie', [
            cookie.serialize(KEYS.ACCESS_TOKEN, accessToken, {
                maxAge: ACCESS_TOKEN_MAX_AGE,
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV !== 'development',
                path: '/',
            }),
            cookie.serialize(KEYS.REFRESH_TOKEN, refreshToken, {
                maxAge: REFRESH_TOKEN_MAX_AGE,
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV !== 'development',
                path: '/',
            }),
        ]);

        return res.status(200).json({
            data: {
                accessed: true,
            },
        });
    }
    return res.status(405).json({ data: { error: { message: 'Method Not Allowed' }, accessed: false } });
}
