import { auth } from "@/auth";
import { NextResponse } from "next/server";
// import { redirect } from 'next/navigation'

export async function GET(req,res) {
    const session = await auth()
    const host = req.nextUrl.origin
    console.log("host", host);
    // const url = new URL('/login', request.url)
    // console.log("url",url);
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