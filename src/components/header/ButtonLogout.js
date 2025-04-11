'use client'
import { Button } from 'antd'
import React from 'react'
import { logout } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default function ButtonLogout() {
    const handlerClick = async () => {
        // console.log(123);
        await logout()
    }
    return (
        <Button onClick={handlerClick}>Выйти</Button>
    )
}
