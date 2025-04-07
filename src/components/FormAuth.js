'use client'
import React, { useState } from 'react'
import { Form, Input, Checkbox, Button, Alert } from 'antd'
import { login } from '@/lib/auth';
import { redirect } from 'next/navigation'
export default function FormAuth() {
    const [errorAuth, setErrorAuth] = useState(false)
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)


    async function onFinish(values) {
        setLoading(true)
        const res = await login(values.username, values.password)
        setLoading(false)
        if (res) {
            setAuth(true)
            setErrorAuth(false)
            redirect('/dashboard')
        } else {
            setErrorAuth(true)
        }
        // Mutate data
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const onClose = e => {
        setErrorAuth(false)
    };
    const onCloseAuth = e => {
        setAuth(false)
    };
    return (
        <>
            <Form
                name="auth"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 800 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Пользователь"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" disabled={loading}>
                        Авторизоваться
                    </Button>
                </Form.Item>
            </Form>
            {errorAuth &&
                <Alert
                    message="Ошибка авторизации"
                    // description="Error Description Error Description Error Description Error Description Error Description Error Description"
                    type="error"
                    closable
                    onClose={onClose}
                />
            }
            {auth &&
                <Alert
                    message="Вы авторизированы"
                    description="Поздравляем"
                    type="success"
                    closable
                    onClose={onCloseAuth}
                />
            }
        </>
    )
}
