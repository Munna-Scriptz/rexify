import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SEC);

export async function proxy(req) {
    const token = req.cookies.get("X-AS-TOKEN")?.value;
    const { pathname } = req.nextUrl;

    // Only protect admin routes
    if (pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }

        try {
            const { payload } = await jwtVerify(token, SECRET);
            if (payload.role !== "admin") {
                return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
            }

            return NextResponse.next();
        } catch (err) {
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signout`, {
                method: 'POST',
                credentials: 'include',
            })
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};