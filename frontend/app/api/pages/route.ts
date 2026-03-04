import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

        const res = await fetch(`${backendUrl}/api/pages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ success: false, error: 'Failed to communicate with backend' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
        const res = await fetch(`${backendUrl}/api/pages`);
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to communicate with backend' }, { status: 500 });
    }
}
