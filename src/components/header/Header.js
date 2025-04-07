import { Flex } from 'antd'
import React from 'react'
import ButtonLogout from './ButtonLogout'
import Title from 'antd/es/typography/Title'
import Text from 'antd/es/typography/Text'
import { cookies } from 'next/headers'
import ButtonBack from './ButtonBack'

export default async function Header() {
  const user = JSON.parse((await cookies()).get('user')?.value || null)
  return (
    <Flex vertical>
      <Flex justify='space-between' align='center'>
        <Title>Панель управления</Title>
        <Flex align='center' gap={20}>
          {user &&
            <p >
              <Text style={{ fontSize: 20 }} type="secondary">Добро пожаловать </Text>
              <Text style={{ fontSize: 20 }}>{user.username}</Text>
            </p>
          }
          <ButtonLogout />
        </Flex>
      </Flex>
      <Flex>
        <ButtonBack />
      </Flex>
    </Flex>
  )
}
