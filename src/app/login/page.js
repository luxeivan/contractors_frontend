import React from 'react'
import { Flex } from 'antd'
import FormAuth from '@/components/FormAuth'
import Title from 'antd/es/typography/Title'
export default function Login() {
    return (
        <Flex vertical justify='center' align='center'>
            <Title>Авторизация</Title>
            <FormAuth />

        </Flex>
    )
}
