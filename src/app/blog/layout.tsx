import { Container } from "@mui/material"

export default function BlogLayout({
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