import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req) {
    const token = req.cookies.get("X-AS-TOKEN")?.value;
    const { pathname } = req.nextUrl;

    // Only protect admin routes
    if (pathname.startsWith("/admin")) {
        // ❌ No token
        if (!token) {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }

        try {
            // ✅ Verify JWT
            const { payload } = await jwtVerify(token, SECRET);

            // ❌ Not admin
            if (payload.role !== "admin") {
                return NextResponse.redirect(new URL("/", req.url));
            }

            // ✅ Allowed
            return NextResponse.next();

        } catch (err) {
            // ❌ Invalid/expired token
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};