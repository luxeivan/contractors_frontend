import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
    const session = await auth()
    console.log("session",session);
    if(!session){
        return NextResponse.redirect(new URL('/login', request.nextUrl.origin))
    }else{
        if(session.user?.role==='admin'||session.user?.role==='readadmin'){
            return NextResponse.redirect(new URL('/admin', request.nextUrl.origin))
        }else{
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin))
        }
    }
    
}