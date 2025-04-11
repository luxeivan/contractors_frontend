'use client'
import React, { useState } from 'react'
import { Form, Input, Checkbox, Button, Alert } from 'antd'
import { getUser, login } from '@/lib/auth';
import { redirect } from 'next/navigation'
export default function FormAuth() {
    const [errorAuth, setErrorAuth] = useState(false)
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)


    async function onFinish(values) {
        setLoading(true)
        console.log("начало login");
        const res = await login(values.username, values.password)
        setAuth(true)
        console.log("res",res);
        
        setLoading(false)
        if (res) {
            const user = await getUser()
            setErrorAuth(false)
            console.log("user", user);
            if (user.role.type === 'admin' || user.role.type === 'readadmin') {
                redirect('/admin')
            } else {
                redirect('/dashboard')
            }
        } else {
            setErrorAuth(true)
            setAuth(false)
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
                    rules={[{ required: true, message: 'Пожалуйста введите пользователя' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
                >
                    <Input.Password />
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
