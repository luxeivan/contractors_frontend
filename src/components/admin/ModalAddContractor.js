'use client'
import { addNewContractor } from '@/lib/getData'
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import Title from 'antd/es/typography/Title'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ModalAddContractor({ isOpenModalAddContract, closeModalAddContract, }) {
  const router = useRouter()
  const [formAddContractor] = Form.useForm()
  const [uploading, setUploading] = useState(false);
  const onFinish = async values => {
    setUploading(true)
    const newContractor = await addNewContractor(values)
    console.log('newContractor:', newContractor);
    setUploading(false)
    closeModalAddContract()
    formAddContractor.resetFields()
    router.refresh()
  };
  return (
   
      <Form
        name="formAddContractor"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={formAddContractor}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Наименование"
          name="name"
          rules={[{ required: true, message: 'Пожалуйста введите наименование.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ИНН"
          name="inn"
          rules={[{ required: true, message: 'Пожалуйста введите ИНН.' }]}

        >
          <Input
            maxLength={10}
            onChange={(e) => {
              let value = e.target.value.replace(/[^0-9]/g, "");
              e.target.value = value;
              formAddContractor.setFieldValue("inn", value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="КПП"
          name="kpp"
          rules={[{ required: true, message: 'Пожалуйста введите КПП.' }]}
        >
          <Input
            maxLength={9}
            onChange={(e) => {
              let value = e.target.value.replace(/[^0-9]/g, "");
              e.target.value = value;
              formAddContractor.setFieldValue("kpp", value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста введите пароль.' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Пароль еще раз"
          name="password2"
          dependencies={['password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>



        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            {uploading ? 'Добавляется...' : 'Добавить подрядчика'}
          </Button>
        </Form.Item>
      </Form>
  )
}
