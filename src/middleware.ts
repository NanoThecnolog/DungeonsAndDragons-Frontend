import { NextRequest, NextResponse } from "next/server";

const TOKEN_COOKIE = "@d&d.token";

const publicRoutes = ["/", "/signup"];
const protectedRoutes = ["/dashboard", "/me", "/new_char", "/char"];

function matches(pathname: string, routes: string[]) {
    return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(TOKEN_COOKIE)?.value;

    if (matches(pathname, protectedRoutes) && !token) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        url.search = "";
        return NextResponse.redirect(url);
    }

    if (matches(pathname, publicRoutes) && token) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        url.search = "";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/signup",
        "/dashboard/:path*",
        "/me/:path*",
        "/new_char/:path*",
        "/char/:path*",
    ],
};