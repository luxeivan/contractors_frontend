// import { cookies } from 'next/headers'
import React from 'react'
import Title from 'antd/es/typography/Title'
// import axios from 'axios'
import { Card, Flex, Image, Table } from 'antd'
import Link from 'next/link'
import { getAllContracts } from '@/lib/getData'
import TableContract from '@/components/admin/TableContract'
// const server = process.env.SERVER_API
export default async function Admin() {
    // const jwt = (await cookies()).get('jwt')?.value || null   
    return (
        <>
            <TableContract 
            // allContracts={allContracts}
            />
        </>
    )
}
