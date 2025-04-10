import { Modal } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

export default function ModalAddContractor({ isOpenModalAddContract, closeModalAddContract, }) {
  return (
    <Modal
      title="Добавление нового подрядчика"
      open={isOpenModalAddContract}
      onCancel={closeModalAddContract}
    >
      <Title level={5} style={{color:"gray",margin:"50px 0"}}>В стадии разработки...</Title>
    </Modal>
  )
}
