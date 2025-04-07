import Image from "next/image";
import styles from "./page.module.css";
import { Flex } from 'antd'
import Title from "antd/es/typography/Title";
import FormAuth from "@/components/FormAuth";
import Link from "next/link";

export default function Home() {


  return (
    <Flex vertical justify="center" align="center" style={{ height: "100vh" }}>
      <Title>Приложение</Title>
     <Link href='/dashboard'>Админ панель</Link>
     <Link href='/login'>Авторизация</Link>
    </Flex>
  );
}
