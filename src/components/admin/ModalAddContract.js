'use client'
import { addNewContract, getAllContractors } from '@/lib/getData';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Switch, Upload } from 'antd'
import Title from 'antd/es/typography/Title'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ModalAddContract({ isOpenModalAddContract, closeModalAddContract, }) {
  const router = useRouter()
  const [contractors, setContractors] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();
  const fetchContractors = async () => {
    const allContractors = await getAllContractors(100,1)
    console.log("allContractors",allContractors)
    setContractors(allContractors.data.map(item => ({
      value: item.id,
      label: item.name,
    })))

  }
  useEffect(() => {
    fetchContractors()
  }, [])
  async function handleUpload(values) {
    // console.log("values", values)
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file);
    });
    setUploading(true);
    try {
      const newContractor = await addNewContract(formData, values)
      if (newContractor) {
        // console.log("newStep", newStep);
        setFileList([]);
        closeModalAddContract(false);
        form.resetFields()
        router.refresh()
      } else {
        throw new Error('Ошибка добавления договора')
      }

      // message.success('upload successfully.');
    } catch (error) {
      console.log('Ошибка добавления договора: ', error);
    }

    setUploading(false);

  };
  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // console.log("file", file);
      setFileList(prev => ([...prev, file]));
      return false;
    },
    fileList,
  };
  return (
    <Modal
      title="Добавление нового договора"
      open={isOpenModalAddContract}
      onCancel={closeModalAddContract}
      footer={false}
    >
      <Form
        form={form}
        onFinish={handleUpload}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}>
        <Form.Item
          name='contractor'
          label="Подрядчик"
          required
        >

          <Select
            showSearch
            placeholder="Выберите подрядчика"
            optionFilterProp="label"
            // onChange={onChange}
            // onSearch={onSearch}
            options={contractors}
          />
        </Form.Item>
        <Form.Item
          name='number'
          label="Номер договора"
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label="Описание"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name='social'
          label="Социальный объект"
        >
          <Switch />
        </Form.Item>

        <Upload
          {...props}
          accept=".jpg,.jpeg,.png,.pdf"
        >
          <Button icon={<UploadOutlined />}>Выбрать документ</Button>
        </Upload>
        <Button
          type="primary"
          htmlType='submit'
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Добавляется...' : 'Добавить договор'}
        </Button>
      </Form>
      {/* <Title level={5} style={{color:"gray",margin:"50px 0"}}>В стадии разработки...</Title> */}
    </Modal>
  )
}
