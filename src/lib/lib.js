'use server'
import axios from "axios";
import { cookies } from "next/headers";
const server = process.env.SERVER_API
export async function login(email, password) {
    console.log(email, password)
    try {
        const response = await axios
            .post(server + '/api/auth/local', {
                identifier: email,
                password: password,
            })

        console.log('Well done!');
        // console.log('User profile', response.data.user);
        // console.log('User token', response.data.jwt);
        const expires = new Date(Date.now() + 3600 * 1000)
        cookies().set('jwt', response.data.jwt, { expires })
        cookies().set('user', JSON.stringify(response.data.user), { expires })
        return true
    } catch (error) {
        console.log('An error occurred:', error);
        return false
    }
}
export async function getJwt() {
    const jwt = cookies().get('jwt')?.value
    if (!jwt) return null
    return jwt
}
export async function getUser() {
    const user = cookies().get('jwt')?.value
    if (!user) return null
    return user
}
export async function logout() {
    cookies().set('jwt', '', { expires: new Date(0) })
}