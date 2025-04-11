import Container from "@/components/Container";
import Header from "@/components/header/Header";

export default function DashboardLayout({ children }) {
    return (
        <Container>
            <Header/>
            {children}
        </Container>
    );
}
