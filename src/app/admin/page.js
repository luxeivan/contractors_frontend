import { cookies } from 'next/headers'
import React from 'react'

export default function Admin() {
    const user = JSON.parse(cookies().get('user')?.value)
    console.log("user", user);

    return (
        <div>Admin page</div>
    )
}
