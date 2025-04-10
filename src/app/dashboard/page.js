// import { cookies } from 'next/headers'
import React from 'react'
import Title from 'antd/es/typography/Title'
// import axios from 'axios'
import { Card, Flex, Image } from 'antd'
import Link from 'next/link'
import { getMyContractors } from '@/lib/getData'
// const server = process.env.SERVER_API
export default async function Admin() {

    // const jwt = (await cookies()).get('jwt')?.value || null
    const contractor = await getMyContractors()
    console.log("contractor", contractor);


    return (
        <>
            {contractor &&
                <>
                    <Title level={2}>{contractor.name}</Title>
                    <Flex gap={20} style={{ padding: 20 }} wrap="wrap">
                        {contractor.contracts.map(item =>
                            <Link key={item.id} href={`/dashboard/contracts/${item.documentId}`}>
                                <Card hoverable title={'Договор №'+item.number} >
                                    <Image src='https://infostart.ru/upload/iblock/d48/d489a1a6bb10747aa17e33be612ef5ff.png' preview={false} width={200} />
                                </Card>
                            </Link>
                        )}
                    </Flex>
                </>
            }
        </>
    )
}
