import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
// import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                My App
              </Typography>
              <Button component={Link} href="/" color="inherit">Home</Button>
            </Toolbar>
          </AppBar>
          <Container sx={{ marginTop: '1rem' }}>
            {children}
          </Container>
        </Container>
      </body>
    </html>
  )
}
