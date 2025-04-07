import Image from "next/image";
import styles from "./page.module.css";
import { Button, Flex } from 'antd'
import Title from "antd/es/typography/Title";
import FormAuth from "@/components/FormAuth";
import Link from "next/link";

export default function Home() {


  return (
    <Flex vertical justify="center" align="center" style={{ height: "100vh" }} gap={20}>
      <Title>Приложение</Title>
      <Link href='/dashboard'><Button type="primary">Админ панель</Button></Link>
      <Link href='/login'><Button type="primary">Авторизация</Button></Link>
    </Flex>
  );
}
