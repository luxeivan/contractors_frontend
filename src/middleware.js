import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export default async function middleware(req) {
    // const currentPage = req.nextUrl.pathname
    // const protectedRoutes = ['/admin']
    // const isProtectedRoute = protectedRoutes.includes(currentPage)
    // console.log("currentPage:", currentPage)
    // console.log("isProtectedRoute:",isProtectedRoute)
    
    // if (isProtectedRoute) {
        const cookie = (await cookies()).get('jwt')?.value
        // console.log("cookie:", cookie)
        if (!cookie) {
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }
        return NextResponse.next()
        // }
    }

    export const config = {
        matcher: ['/dashboard/:path*','/admin/:path*'],
    }