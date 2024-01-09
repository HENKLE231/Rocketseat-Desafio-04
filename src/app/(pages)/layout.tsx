import type { Metadata } from 'next'
import { roboto } from '@/app/fonts'
import { getCssText } from '../styles'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'
import { Header } from './components/Header'
import { ShopContextProvider } from '@/contexts/ShopContext'
import { fetchProducts } from '@/lib/stripe'

export const metadata: Metadata = {
    title: {
        default: 'Home | Ignite Shop',
        template: '%s | IgniteShop'
    }
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
    const products = await fetchProducts()

    return (
        <html lang="pt-br">
            <head>
                <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
                {globalStyles()}
            </head>
            <body className={roboto.className}>
                <Container>
                    <ShopContextProvider>
                        <Header products={products} />
                        {children}
                    </ShopContextProvider>
                </Container>
            </body>
        </html>
    )
}
