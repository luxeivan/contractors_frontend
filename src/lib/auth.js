'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import { NextResponse } from "next/server";
const server = process.env.SERVER_API
const expires = new Date(Date.now() + 3600 * 1000)
async function getJwt() {
    const jwt = (await cookies()).get('jwt')?.value || null
    // console.log(jwt)
    if (!jwt) redirect('/login')
    return jwt
}
export async function login(email, password) {
    // console.log(email, password)
    try {
        const response = await axios
            .post(server + '/api/auth/local', {
                identifier: email,
                password: password,
            })
        console.log('User profile', response.data.user);
        if (response.data.jwt) {
            const cookieStore = await cookies()
            console.log("cookieStore ",cookieStore );            
            cookieStore.set('jwt', response.data.jwt, { expires })   
            // const user = await getUser()            
            // console.log("user", user);
            // if (user.role.type === 'admin' || user.role.type === 'readadmin') {
            //     return NextResponse.redirect(new URL('/admin'))
            // } else {
            //     return NextResponse.redirect(new URL('/dashboard'))
            // }                   
            return true
        } else {
            return false
        }
        // cookies().set('user', JSON.stringify(response.data.user), { expires })
    } catch (error) {
        console.log('An error occurred:', error);
        return false
    }
}
// export async function getJwt() {
//     const jwt = getJwt()
//     if (!jwt) return null
//     return jwt
// }
export async function getUser() {
    const jwt = await getJwt() || null
    try {
        const res = await axios.get(server + `/api/users/me?populate[0]=role`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        if (res.data) {
            // (await cookies()).set('user', JSON.stringify(res.data), { expires })
            return res.data
        }
    } catch (error) {
        console.log("error:", error);
    }
}
export async function logout() {
    (await cookies()).set('jwt', '', { expires: new Date(0) })
    redirect('/')
}