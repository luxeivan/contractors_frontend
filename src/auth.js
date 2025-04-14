import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUser } from "./lib/auth"
import axios from "axios"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
// import { redirect } from "next/navigation"

const thisServer = process.env.THIS_SERVER
const server = process.env.SERVER_API
const login = async (username, password) => {
    try {

        const response = await axios
            .post(server + '/api/auth/local', {
                identifier: username,
                password: password,
            })
        if (response.data.jwt) {
            return response.data
        } else {
            return false
        }
    } catch (error) {
        // console.log('Ошибка авторизации', error);
        throw new Error(error)
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    let user = null
                    console.log("credentials", credentials);

                    // logic to salt and hash password

                    const tempUser = await login(credentials.username, credentials.password)
                    // console.log("tempUser", tempUser);

                    if (tempUser) {
                        user = await getUser(tempUser.jwt)
                    }
                    user.jwt = tempUser.jwt
                    console.log("user", user);
                    
                    if (!user) {
                        throw new Error("Ошибка авторизации123")
                    }
                    return user
                } catch (error) {
                    console.log("Ошибка авторизации123", error);
                }
            },

        }),
    ],
    pages: {
        signIn: '/login',
        error: '/error'
    },
    callbacks: {
        // redirect(propredirect) {
        //     console.log("propredirect",propredirect);
        //     // redirect('/checkauth')
        // },
        // signIn(signInprop){

        //     console.log("signInprop",signInprop);
        // },
        jwt({ token, user }) {
            if (user) {
                token.jwt = user.jwt
                token.username = user.username
                token.role = user.role.type
            }
            return token
        },
        session({ session, token }) {
            session.user.jwt = token.jwt
            session.user.username = token.username
            session.user.role = token.role
            return session
        },
        // authorized: async ({ auth }) => {
        //     console.log("auth", auth);
        //     if(auth){
        //         return NextResponse.redirect(new URL('/checkauth',thisServer))
        //     }
        //     // Logged in users are authenticated, otherwise redirect to login page
        //     // return !!auth
        // },
    },


})