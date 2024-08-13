import {
    ClerkProvider
} from '@clerk/nextjs'
import '@/styles/globals.css'
import type { AppProps } from "next/app";
import AuthComponent from '@/components/AuthComponent';
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();

    return (
        <ClerkProvider>
            <header className="bg-primary text-primary-foreground py-4 px-6 flex justify-between">
                <h1 
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => {
                        router.push('/')
                    }}
                >
                    FlickCards
                </h1>
                <AuthComponent/>
            </header>
            <Component {...pageProps} />
        </ClerkProvider>
    )
}