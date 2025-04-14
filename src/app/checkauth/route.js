import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'

export async function GET(request) {
    const session = await auth()
    const host = request.headers.get('host')
    console.log("host", host);
    // const url = new URL('/login', request.url)
    // console.log("url",url);
    if (!session) {
        // return NextResponse.redirect(url)
        return NextResponse.redirect(new URL('/login', "http://" + host))
        // redirect('/login')
    } else {
        if (session.user?.role === 'admin' || session.user?.role === 'readadmin') {
            return NextResponse.redirect(new URL('/admin', "http://" + host))
            // redirect('/admin')
        } else {
            return NextResponse.redirect(new URL('/dashboard', "http://" + host))
            // redirect('/dashboard')
        }
    }

}