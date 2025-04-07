import Container from "@/components/Container";
import Header from "@/components/header/Header";
import Title from "antd/es/typography/Title";

export default function DashboardLayout({ children }) {
    return (
        <Container>
            <Header/>
            {children}
        </Container>
    );
}
