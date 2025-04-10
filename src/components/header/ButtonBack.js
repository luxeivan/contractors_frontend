'use client'
import { Button } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function ButtonBack() {
    const router = useRouter()
    const pathname = usePathname()
    
    if(pathname === '/dashboard'||pathname === '/admin') return false
    return (
        <Button onClick={() => { router.back() }}>Назад</Button>
    )
}
