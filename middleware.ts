import { type NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export function middleware(request: NextRequest) {
    const requestHeader = request.headers;

    if (requestHeader.get('x-api-key') === apiKey) {
        return NextResponse.next();
    }

    return new NextResponse(JSON.stringify({ success: false, message: 'authentication failed' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
    });
}

export const config = { matcher: '/api/:route*' };
