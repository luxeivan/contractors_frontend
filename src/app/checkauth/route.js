import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'

export async function GET(request) {
    const session = await auth()
    console.log("request.nextUrl",request.nextUrl);
    // const url = new URL('/login', request.url)
    // console.log("url",url);
    if(!session){
        // return NextResponse.redirect(url)
        return NextResponse.redirect(new URL('/login', request.nextUrl))
        // redirect('/login')
    }else{
        if(session.user?.role==='admin'||session.user?.role==='readadmin'){
            return NextResponse.redirect(new URL('/admin', request.nextUrl))
            // redirect('/admin')
        }else{
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
            // redirect('/dashboard')
        }
    }
    
}