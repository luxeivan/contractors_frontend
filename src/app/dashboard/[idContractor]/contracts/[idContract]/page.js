// import { cookies } from 'next/headers'
import { Button, Card, Collapse, Flex, Image } from 'antd'
import Title from 'antd/es/typography/Title'
import Text from 'antd/es/typography/Text'
// import axios from 'axios'
import React from 'react'
import { getContractItem } from '@/lib/getData'
import ButtonAddStep from '@/components/ButtonAddStep'
import dayjs from 'dayjs'
const server = process.env.NEXT_PUBLIC_SERVER_API
export default async function Contract({ params }) {
    // const jwt = (await cookies()).get('jwt')?.value || null
    const { idContractor, idContract } = await params
    let contract = await getContractItem(idContract)

    console.log("contract:", contract);
    const countSteps = contract.steps.length
    const items = contract.steps.map((item, index) => (
        {
            key: index + 1,
            label: <Flex gap={30}><Text>{item.name}</Text><Text><span style={{color:"gray"}}>Дата создания: {dayjs(item.createdAt).format('DD-MM-YYYY HH:mm')}</span></Text></Flex>,
            children: <Flex vertical gap={20}>
                <p>{item.description}</p>
                <Flex gap={20}>                
                        {item.photos.map(item => <Image key={item.id} src={`${server}${item.url}`} width={200} />)}                             
                </Flex>
            </Flex>,
        }
    ))

    return (
        <>
            {contract &&
                <>
                    <Title>Договор №{contract.number}</Title>
                    <Flex gap={20} vertical>
                        <Flex justify='end'>
                            <ButtonAddStep idContract={idContract} countSteps={countSteps} />
                        </Flex>
                        <Collapse items={items} defaultActiveKey={[items.length]} />
                    </Flex>
                </>
            }
        </>
    )
}
