import { cookies } from 'next/headers'
import React from 'react'
import Title from 'antd/es/typography/Title'
import Text from 'antd/es/typography/Text'

export default function Admin() {
    const user = JSON.parse(cookies().get('user')?.value)
    console.log("user", user);

    return (
        <div>
            <Title>Панель администратора</Title>
            <Text>Добро пожаловать {user.username}</Text>
        </div>
    )
}
