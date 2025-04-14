import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'

export async function GET(request) {
    const session = await auth()
    // console.log("request",request);
    const url = new URL('/login', request.url)
    // console.log("url",url);
    if(!session){
        // return NextResponse.redirect(url)
        redirect('/login')
    }else{
        if(session.user?.role==='admin'||session.user?.role==='readadmin'){
            redirect('/admin')
            // return NextResponse.redirect(new URL('/admin', request.url))
        }else{
            redirect('/dashboard')
            // return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }
    
}