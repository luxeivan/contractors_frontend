
import styles from "./page.module.css";
import { Button, Flex,Image } from 'antd'
import Title from "antd/es/typography/Title";
import FormAuth from "@/components/FormAuth";
import Link from "next/link";
import icon from '@/img/logo_mosoblenergo.svg'
import { auth } from "@/auth";

export default async function Home() {
const session = await auth()

  return (
    <Flex vertical justify="center" align="center" style={{ height: "100vh" }} gap={20}>
      {/* <Title style={{margin:0}}>Мособлэнерго</Title> */}
      <Image src={icon.src} preview={false}/>
      <Title level={2} style={{margin:0,color:"gray"}}>Приложение для подрядных организаций</Title>
      <Link href='/checkauth'><Button type="primary">Перейти в панель управления</Button></Link>
    </Flex>
  );
}
