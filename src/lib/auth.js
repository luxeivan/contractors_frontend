'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
const server = process.env.SERVER_API
const expires = new Date(Date.now() + 3600 * 1000)
export async function login(email, password) {
    // console.log(email, password)
    try {
        const response = await axios
            .post(server + '/api/auth/local', {
                identifier: email,
                password: password,
            })

        // console.log('Well done!');
        // console.log('User profile', response.data.user);
        // console.log('User token', response.data.jwt);
        await cookies().set('jwt', response.data.jwt, { expires })
        // cookies().set('user', JSON.stringify(response.data.user), { expires })
        return true
    } catch (error) {
        console.log('An error occurred:', error);
        return false
    }
}
export async function getJwt() {
    const jwt = (await cookies()).get('jwt')?.value
    if (!jwt) return null
    return jwt
}
export async function getUser() {
    const jwt = (await cookies()).get('jwt')?.value || null
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