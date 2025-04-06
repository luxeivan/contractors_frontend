import axios from "axios"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password"
const server = process.env.SERVER_API

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null
                try {
                    const response = await axios
                        .post(server + '/api/auth/local', {
                            identifier: credentials.email,
                            password: credentials.password,
                        })
                    user = response.data.user
                    console.log('Well done!');
                    console.log('User profile', response.data.user);
                    console.log('User token', response.data.jwt);
                } catch (error) {
                    console.log('An error occurred:', error.response);
                }
                // logic to salt and hash password
                // const pwHash = saltAndHashPassword(credentials.password)

                // logic to verify if the user exists
                // user = await getUserFromDb(credentials.email, pwHash)

                // if (!user) {
                //     // No user found, so this is their first attempt to login
                //     // Optionally, this is also the place you could do a user registration
                //     throw new Error("Invalid credentials.")
                // }

                // return user object with their profile data
                return user
            },
        }),
    ],
})