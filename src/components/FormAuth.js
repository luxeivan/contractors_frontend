'use client'
import React, { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
// import { getUser } from '@/lib/auth';
// import { redirect } from 'next/navigation'
import { signIn } from 'next-auth/react';
export default function FormAuth() {
    const [errorAuth, setErrorAuth] = useState(false)
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)


    async function onFinish(values) {
        try {

            setLoading(true)
            const formData = new FormData()
            formData.append('username', values.username)
            formData.append('password', values.password)
            const res = await signIn("credentials", { username: values.username, password: values.password, redirect: "true", redirectTo: "/checkauth" })
            // console.log("конец login");
            // setAuth(true)
            // console.log("res", res);

            setLoading(false)
            // if (res) {
            //     const user = await getUser()
            //     setErrorAuth(false)
            //     console.log("user", user);
            //     if (user.role.type === 'admin' || user.role.type === 'readadmin') {
            //         redirect('/admin')
            //     } else {
            //         redirect('/dashboard')
            //     }
            // } else {
            //     setErrorAuth(true)
            //     setAuth(false)
            // }
            // Mutate data
        } catch (error) {
            console.log("error", error);
            setLoading(false)
        }
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
