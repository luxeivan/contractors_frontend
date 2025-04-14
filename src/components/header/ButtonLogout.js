'use client'
import { Button } from 'antd'
import React from 'react'
// import { logout } from '@/lib/auth'
// import { redirect } from 'next/navigation'
import { signOut } from "next-auth/react"

export default function ButtonLogout() {
    const handlerClick = async () => {
        // console.log(123);
        await signOut({ redirectTo: '/' })
    }
    return (
        <Button onClick={handlerClick}>Выйти</Button>
    )
}
