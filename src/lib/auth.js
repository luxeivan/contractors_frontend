'use server'
import { auth, signOut } from "@/auth";
import axios from "axios";
// import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
// import { NextResponse } from "next/server";
const server = process.env.SERVER_API
// const expires = new Date(Date.now() + 3600 * 1000)
async function getJwt() {
    const session = await auth()
    const jwt = session?.user?.jwt
    if (!jwt) redirect('/login')
    return jwt
}

export async function getUser(myjwt = false) {
    let jwt = null
    if (myjwt) {
        jwt = myjwt
    } else {
        jwt = await getJwt()
    }
    try {
        const res = await axios.get(server + `/api/users/me?populate[0]=role`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        if (res.data) {
            return res.data
        }
    } catch (error) {
        console.log("error getUser:", error);
    }
}
export async function logout() {
    await signOut({ redirect: true, redirectTo: "/" })
}