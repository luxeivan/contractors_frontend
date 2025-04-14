import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
    const session = await auth()
    const url = new URL('/login', request.url)
    console.log("url",url);
    if(!session){
        return NextResponse.redirect(url)
    }else{
        if(session.user?.role==='admin'||session.user?.role==='readadmin'){
            return NextResponse.redirect(new URL('/admin', request.url))
        }else{
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }
    
}