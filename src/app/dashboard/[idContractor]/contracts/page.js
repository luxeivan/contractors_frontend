import Container from '@/components/Container';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text'
import axios from 'axios';
import { cookies } from 'next/headers'
import React from 'react'
import { Card, Flex, Image } from 'antd';
import Link from 'next/link';
const server = process.env.SERVER_API
export default async function Contracts({ params }) {
  const { idContractor } = await params
  const jwt = (await cookies()).get('jwt')?.value || null
  let contractor = null
  try {
    const res = await axios.get(server + `/api/contractors/${idContractor}?populate=contracts`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    if (res.data) {
      contractor = res.data
    }
    console.log("contractor:", contractor);
  } catch (error) {
    console.log("error:", error);

  }
  return (
    <Container>
            <Title>Панель администратора</Title>
            
            {contractor &&
                <>
                <Title level={2}>{contractor.name}</Title>
                    <Flex gap={20} style={{ padding: 20 }}>
                        {contractor.contracts.map(item =>
                            <Link href={`/dashboard/${idContractor}/contracts/${item.documentId}`}>
                                <Card hoverable title={'Договор №'+item.number} >
                                    <Image src='https://infostart.ru/upload/iblock/d48/d489a1a6bb10747aa17e33be612ef5ff.png' preview={false} width={200}/>
                                </Card>
                            </Link>
                        )}
                    </Flex>
                </>
            }
        </Container>
  )
}
