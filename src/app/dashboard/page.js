import React from 'react'
import Title from 'antd/es/typography/Title'
import { Card, Flex, Image } from 'antd'
import Link from 'next/link'
import { getMyContractor } from '@/lib/getData'
export default async function Admin() {
    const contractor = await getMyContractor()
    // const contractor = {contracts:[]}
    // console.log("contractor", contractor);
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
