import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SEC);

export async function proxy(req) {
    const token = req.cookies.get("X-AS-TOKEN")?.value;
    const { pathname } = req.nextUrl;

    // Protect profile route (any logged in user)
    if (pathname.startsWith("/profile")) {
        if (!token) {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }

        try {
            await jwtVerify(token, SECRET);
            return NextResponse.next();
        } catch {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }
    }

    // Protect admin route (admin only)
    if (pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }

        try {
            const { payload } = await jwtVerify(token, SECRET);

            if (payload.role !== "admin") {
                return NextResponse.redirect(
                    new URL("/auth/unauthorized", req.url)
                );
            }

            return NextResponse.next();
        } catch {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/profile/:path*",
    ],
};