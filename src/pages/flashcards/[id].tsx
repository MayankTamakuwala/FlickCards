import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@clerk/nextjs';
import Flashcard from '@/components/Flashcard';
import withAuth from '@/lib/withAuth';
import Image from 'next/image';

interface Flashcard {
    front: string;
    back: string;
}

interface Flashcards {
    id: string;
    title: string;
    cards: Flashcard[];
}

const FlashcardPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [flashcards, setFlashcards] = useState<Flashcards | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {userId} = useAuth();

    useEffect(() => {
        if (id) {
            loadFlashcard(id as string);
        }
    }, [id]);

    const loadFlashcard = async (flashcardId: string) => {
        try {
            const docRef = doc(db, `users/${userId}/flashcards`, flashcardId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data() as Flashcards;
                setFlashcards(data);
                setLoading(false);
            } else {
                router.push('/404');
            }
        } catch (e) {
            console.error("Error loading document: ", e);
            router.push('/404');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className='flex justify-between w-full items-center mb-8'>
                <button onClick={() => {router.push("/dashboard")}} className='flex justify-center items-center gap-2'>
                    <Image
                        src={require("@/assets/back.png")}
                        alt="Back to Dashboard"
                        className='w-5 h-5'
                    />
                    <span>Go Back</span>
                </button>
                <h1 className="text-3xl font-bold">{flashcards?.title}</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {flashcards?.cards.map((card, index) => (
                    <Flashcard key={index} front={card.front} back={card.back} />
                ))}
            </div>
        </div>
    );
};

export default withAuth(FlashcardPage);