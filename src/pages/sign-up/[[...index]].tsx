import { SignUp } from "@clerk/nextjs";
import Head from "next/head";

export default function Page() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="meta.jpeg" />
                <meta name="twitter:image" content="meta.jpeg" />
                <meta name="twitter:title" content="FlickCards - Effortless Flashcards Generator" />
                <meta name="twitter:description" content="Create personalized flashcards instantly with AI. Save and organize your generated flashcards using an intuitive dashboard." />
                <title>FlickCards | Sign Up</title>
                <meta property="og:title" content="FlickCards - Effortless Flashcards Generator" />
                <meta property="og:description" content="Generate flashcards on any topic using AI, save them to your dashboard, and enhance your learning experience." />
                <meta name="author" content="Mayank Tamakuwala" />
            </Head>
            <SignUp />
        </div>
    );
}