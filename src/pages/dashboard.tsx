import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { randomColorGenerator } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {v4 as uuid4} from 'uuid';
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import withAuth from "@/lib/withAuth";
import toast, {Toaster} from 'react-hot-toast';
import BookLoader from "@/components/BookLoader";

interface Flashcards{
    id: string;
    title: string;
    cards: Array<{
        front: string;
        back: string;
    }>
}

const Dashboard = () => {
    const {userId} = useAuth();
    const [prompt, setPrompt] = useState("")
    const [flashcards, setFlashcards] = useState<Flashcards[]>([])
    const [loading, setLoading] = useState(false)

    const placeholders = [
        "Who is Mayank Tamakuwala?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
        "What's the first rule of Fight Club?",
        "Where is Andrew Laeddis Hiding?",
    ];

    useEffect(() => {
        if (userId) {
            loadCards();
        }
    }, [userId]);

    const loadCards = async () => {
        if (!userId) return;

        try {
            const querySnapshot = await getDocs(collection(db, `users/${userId}/flashcards`));
            const loadedFlashcards: Flashcards[] = [];

            querySnapshot.forEach((doc) => {
                loadedFlashcards.push({
                    id: doc.id,
                    title: doc.data().title,
                    cards: doc.data().cards
                });
            });

            setFlashcards(loadedFlashcards);
        } catch (e) {
            console.error("Error loading documents: ", e);
        }
    };

    const getCards = async () => {

        setLoading(true)
        const response = await fetch("/api/getFlashcards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": "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"
                // "Authorization": "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"
                "Authorization": "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"
            },
            body: JSON.stringify({ prompt: prompt })
        })

        const data = (await response.json()).data
        
        try{
            const res = JSON.parse(data)
            if (res) {

                const newFlashcards: Flashcards = {
                    id: uuid4(),
                    title: res.title || "Untitled",
                    cards: res.cards || [],
                };

                setFlashcards((prevFlashcards) => [newFlashcards, ...prevFlashcards]);

                try {
                    await setDoc(doc(db, `users/${userId}/flashcards`, newFlashcards.id), newFlashcards);
                    toast.success(`Successfully Created ${newFlashcards.title}`)
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        } catch(error){
            console.error("Error parsing document: ", error);
            toast.error('Something went wrong!')
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className="h-screen flex flex-col pt-14" id="main-div">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <div id="flashcards-cards" className="flex-1 overflow-y-auto p-10 bg-muted">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
                        {flashcards.map((flashcard, index) => (
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
                </div>
                <div className="p-4 border-t flex items-center w-full bg-slate-950">
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