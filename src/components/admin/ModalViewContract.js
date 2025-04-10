'use client'
import { getContractItem } from '@/lib/getData'
import { Descriptions, Flex, Modal, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import ViewSteps from './ViewSteps'
import Link from 'next/link'
import Title from 'antd/es/typography/Title'
import Text from 'antd/es/typography/Text'
const server = process.env.NEXT_PUBLIC_SERVER_API
export default function ModalViewContract({ isOpenModal, closeModal, docIdForModal }) {
    const [contract, setContracts] = useState(null)
    const [loading, setLoading] = useState(true)
    // console.log(docIdForModal);

    const fetching = async (idContract) => {
        try {
            setLoading(true)
            const temp = await getContractItem(idContract)
            console.log("temp", temp)
            setContracts(temp)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        if (docIdForModal && isOpenModal === true) {
            fetching(docIdForModal)
        }
    }, [isOpenModal])
    let propertiesContract = null
    if (contract) {
        propertiesContract = [
            // {
            //     key: '1',
            //     label: 'Номер',
            //     children: contract.number,
            // },
            {
                key: '2',
                label: 'Описание',
                children: contract.description,
            },
            {
                key: '3',
                label: 'Подрядчик',
                children: contract.contractor.name,
            },
            {
                key: '3',
                label: 'ИНН/КПП',
                children: <span>{contract.contractor.inn}/{contract.contractor.kpp}</span>,
            },
            {
                key: '4',
                label: 'Файл договора',
                children: contract.document?<Link href={`${server}${contract.document.url}`} target='_blank'>{contract.document.name}</Link>:<Text style={{color:"#f00"}}>файл отсутствует</Text>,
            },
        ]
    }
    return (
        <Modal
            open={isOpenModal}
            onCancel={closeModal}
            title={!loading && contract ? `Договор№${contract.number}` : 'Загрузка договора...'}
        >
            {loading && <Flex justify='center'><Spin /></Flex>}
            {!loading && contract &&
                <Flex vertical gap={20}>
                    <Descriptions items={propertiesContract} column={1} />
                    {contract.steps.length === 0 ? <Title level={4} style={{color:"#f00"}}>Этапов не добавлено</Title> : <ViewSteps steps={contract.steps} />
                    }
                </Flex>
            }
        </Modal>
    )
}
