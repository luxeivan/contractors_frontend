// export { auth as middleware} from "@/auth"

import { NextResponse } from "next/server"
import { auth } from "@/auth";

export async function middleware(req) {
  const session = await auth()
  const host = req.nextUrl.origin
  console.log("host123123", host);
  if (!session) {
    // return NextResponse.redirect(url)
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin))
    // redirect('/login')
  } else {
    if (session.user?.role === 'admin' || session.user?.role === 'readadmin') {
      return NextResponse.redirect(new URL('/admin', req.nextUrl.origin))
      // redirect('/admin')
    } else {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin))
      // redirect('/dashboard')
    }
  }
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/checkauth/:path*'],
}