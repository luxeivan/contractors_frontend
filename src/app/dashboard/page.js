import { cookies } from 'next/headers'
import React from 'react'
import Title from 'antd/es/typography/Title'
import axios from 'axios'
import { Card, Flex, Image } from 'antd'
import Link from 'next/link'
const server = process.env.SERVER_API
export default async function Admin() {
   
    const jwt = (await cookies()).get('jwt')?.value || null
    let contractors = []
    console.log("jwt", jwt);
    try {
        const res = await axios.get(server + '/api/contractors', {
            headers: {

                Authorization: `Bearer ${jwt}`
            }
        })
        if (res.data) {
            contractors = res.data.results
        }
        // console.log("contractors:", contractors);
    } catch (error) {
        console.log("error:", error);

    }

    return (
        <>            
            {contractors &&
                <>
                    <Title level={2}>Мои компании</Title>
                    <Flex gap={20} style={{ padding: 20 }}>
                        {contractors.map(item =>
                            <Link key={item.id} href={`/dashboard/${item.documentId}/contracts`}>
                                <Card hoverable title={item.name} >
                                    <Image src='https://www.seascope.gr/wp-content/uploads/2020/07/home-company-icon.png' preview={false} width={200} />
                                </Card>
                            </Link>
                        )}
                    </Flex>
                </>
            }
        </>
    )
}
