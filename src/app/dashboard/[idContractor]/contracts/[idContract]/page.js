// import { cookies } from 'next/headers'
import { Button, Card, Collapse, Flex } from 'antd'
import Title from 'antd/es/typography/Title'
// import axios from 'axios'
import React from 'react'
import { getContractItem } from '@/lib/getData'
import ButtonAddStep from '@/components/ButtonAddStep'
// const server = process.env.SERVER_API
export default async function Contract({ params }) {
    // const jwt = (await cookies()).get('jwt')?.value || null
    const { idContractor, idContract } = await params
    let contract = await getContractItem(idContract)
    
    console.log("contract:", contract);
    const countSteps = contract.steps.length
    const items = contract.steps.map((item, index) => (
        {
            key: index + 1,
            label: item.name,
            children: <p>{item.description}</p>,
        }
    ))

    return (
        <>
            {contract &&
                <>
                    <Title>Договор №{contract.number}</Title>
                    <Flex gap={20} vertical>
                        <Flex justify='end'>
                            <ButtonAddStep idContract={idContract} countSteps={countSteps}/>
                        </Flex>
                        <Collapse items={items} defaultActiveKey={[items.length]} />
                    </Flex>
                </>
            }
        </>
    )
}
