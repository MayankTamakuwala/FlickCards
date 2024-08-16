// src/pages/_app.tsx
import { ClerkProvider } from '@clerk/nextjs'
import '@/styles/globals.css'
import type { AppProps } from "next/app";
import Header from '@/components/Header';

export default function App({ Component, pageProps }: AppProps) {

    return (
        <ClerkProvider>
            <div className="min-h-screen flex flex-col relative">
                <Header />
                <main className="flex-grow">
                    <Component {...pageProps} />
                </main>
            </div>
        </ClerkProvider>
    )
}