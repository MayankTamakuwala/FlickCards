// src/pages/_app.tsx
import { ClerkProvider } from '@clerk/nextjs'
import '@/styles/globals.css'
import type { AppProps } from "next/app";
import Header from '@/components/Header';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {

    return (
        <ClerkProvider>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="manifest" href="manifest.json" />
                <link rel="icon" type="image/x-icon" href="favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="meta.jpeg" />
                <meta name="twitter:image" content="meta.jpeg" />
                <meta name="twitter:title" content="FlickCards - AI-Powered Flashcard Generation" />
                <meta name="twitter:description" content="Create personalized flashcards instantly with AI. Save and organize your generated flashcards using an intuitive dashboard." />
                <title>FlickCards - Effortless Flashcards Generator</title>
                <meta property="og:title" content="FlickCards - AI-Powered Flashcard Generation" />
                <meta property="og:description" content="Generate flashcards on any topic using AI, save them to your dashboard, and enhance your learning experience." />
                <meta name="author" content="Mayank Tamakuwala" />
            </Head>
            <div className="min-h-screen flex flex-col relative">
                <Header />
                <main className="flex-grow">
                    <Component {...pageProps} />
                </main>
            </div>
        </ClerkProvider>
    )
}