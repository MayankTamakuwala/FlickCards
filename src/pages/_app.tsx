// src/pages/_app.tsx
import { ClerkProvider } from '@clerk/nextjs'
import '@/styles/globals.css'
import type { AppProps } from "next/app";
import Header from '@/components/Header';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';

export default function App({ Component, pageProps }: AppProps) {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

    const options: StripeElementsOptions = {
        mode: 'subscription',
        amount: 0,
        currency: 'usd',
        // Fully customizable with appearance API.
        // appearance: {
        //     /*...*/
        // },
    };

    return (
        <ClerkProvider>
            <Elements stripe={stripePromise} options={options}>
                <div className="min-h-screen flex flex-col relative">
                    <Header />
                    <main className="flex-grow">
                        <Component {...pageProps} />
                    </main>
                </div>
            </Elements>
        </ClerkProvider>
    )
}