import { Container } from "@mui/material"

export default function AboutUsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Container maxWidth="xl">
            {children}
        </Container>
    )
}