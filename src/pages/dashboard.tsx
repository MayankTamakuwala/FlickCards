import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { randomColorGenerator } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import {v4 as uuid4} from 'uuid';
import withAuth from "@/lib/withAuth";
import toast, {Toaster} from 'react-hot-toast';
import BookLoader from "@/components/BookLoader";
import { useSubscription } from "@/hooks/useSubscription";
import Head from "next/head";

interface Flashcards{
    id: string;
    title: string;
    cards: Array<{
        front: string;
        back: string;
    }>
}

const Dashboard = () => {
    const [prompt, setPrompt] = useState("");
    const [flashcards, setFlashcards] = useState<Flashcards[]>([]);
    const [loading, setLoading] = useState(false);
    const { userData, loading: userLoading, error, addFlashcard } = useSubscription();

    useEffect(() => {
        if (userData) {
            setFlashcards(userData.flashcards);
        }
    }, [userData])

    const placeholders = [
        "Generate flashcards on basic Python programming (Easy).",
        "Create flashcards about World War II history (Medium).",
        "What are the key concepts of Quantum Mechanics? (Hard)",
        "Design flashcards for learning French vocabulary (Easy).",
        "Summarize the major works of Shakespeare (Medium).",
        "What are the core principles of machine learning? (Hard)",
        "Generate flashcards on the human digestive system (Easy).",
        "Explain the process of photosynthesis in plants (Medium).",
        "Prepare flashcards on advanced calculus concepts (Hard).",
        "What are the differences between classical and operant conditioning? (Medium)",
    ];

    const getCards = async () => {

        setLoading(true)

        try {
            const response = await fetch("/api/getFlashcards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "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"
                    // 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
                },
                body: JSON.stringify({ prompt: prompt })
            });

            const data = (await response.json()).data;
            const res = JSON.parse(data);

            if (res) {
                const newFlashcards = {
                    id: uuid4(),
                    title: res.title || "Untitled",
                    cards: res.cards || [],
                };

                await addFlashcard(newFlashcards);

                toast.success(`Successfully Created ${newFlashcards.title}`);
            }
        } catch (error) {
            console.error("Error parsing document: ", error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    if (userLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>No user data found</div>;
    }

    return (
        <div className="h-screen flex flex-col pt-14">
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="meta.jpeg" />
                <meta name="twitter:image" content="meta.jpeg" />
                <meta name="twitter:title" content="FlickCards - Effortless Flashcards Generator" />
                <meta name="twitter:description" content="Create personalized flashcards instantly with AI. Save and organize your generated flashcards using an intuitive dashboard." />
                <title>FlickCards | Dashboard</title>
                <meta property="og:title" content="FlickCards - Effortless Flashcards Generator" />
                <meta property="og:description" content="Generate flashcards on any topic using AI, save them to your dashboard, and enhance your learning experience." />
                <meta name="author" content="Mayank Tamakuwala" />
            </Head>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-10 bg-muted">
                    {flashcards.length !== 0 ?
                        (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
                                {flashcards.map((flashcard) => (
                                    <Link key={flashcard.id} href={`/flashcards/${flashcard.id}`}>
                                        <EvervaultCard
                                            text={flashcard.title}
                                            className={"w-full md:w-60 h-60 shadow-2xl bg-gray-300 rounded-3xl"}
                                            cardPatternFromColor={randomColorGenerator()}
                                            cardPatternToColor={randomColorGenerator()}
                                        />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full h-full flex justify-center items-center text-center p-4">
                                <p className="text-xl font-semibold">
                                    {"It's awfully quiet here... Perhaps a perfect time to create some brilliant flashcards? 🧠✨"}
                                </p>
                            </div>
                        )}
                </div>
                <div className="p-4 border-t flex items-center w-full bg-gradient-to-tr from-cyan-950 to-slate-950">
                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPrompt(e.target.value);
                        }}
                        onSubmit={() => {
                            getCards()
                        }}
                    />
                </div>
            </div>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-40">
                    <BookLoader />
                </div>
            )}
        </div>
    );
};

export default withAuth(Dashboard);