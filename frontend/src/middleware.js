// src/middleware.js
import { NextRequest, NextResponse } from "next/server";
import isValidJWT from "./utils/validJwt";

export default async function middleware(request) {
  const JWT_TOKEN = request.cookies.get("jwt-token");
  const { pathname } = request.nextUrl;
  
  const validJWT = JWT_TOKEN && isValidJWT(JWT_TOKEN.value);
  console.log("token is",validJWT)
  console.log("Path",authPaths.includes(pathname))
  
  // Allow access to the Next.js app
  if (pathname.startsWith("/_next")) return NextResponse.next();

  // Redirect logged-in users away from auth pages
  if (validJWT && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to the login page
  if (!validJWT && !authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }

  return NextResponse.next();
}

const authPaths = ["/account/login", "/account/register",'/account/reset-password','/user/blog','/account/send-reset-password-email'];
