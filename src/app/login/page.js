import React from 'react'
import { Flex } from 'antd'
import FormAuth from '@/components/FormAuth'
import Title from 'antd/es/typography/Title'

export default async function Login() {    
    return (
        <Flex vertical justify='center' align='center' style={{ height: "100vh" }}>
            <Title>Авторизация</Title>
            <FormAuth />
        </Flex>
    )
}
