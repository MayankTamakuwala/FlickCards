// src/hooks/useSubscription.ts
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { doc, getDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Flashcard {
	id: string;
	title: string;
	cards: Array<{
		front: string;
		back: string;
	}>;
}

export interface UserData {
	id: string;
	email: string;
	created_at: number;
	paid: boolean | null;
	last_paid: string | null;
	flashcards: Flashcard[];
	planName: string;
	active_days: number;
}

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // in milliseconds

export const useSubscription = () => {
	const { userId } = useAuth();
	const [userData, setUserData] = useState<UserData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [retryCount, setRetryCount] = useState<number>(0);

	const fetchUserData = useCallback(async () => {
		if (!userId) return;

		try {
			setLoading(true);

			const userDocRef = doc(db, `users/${userId}`);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				const user = userDoc.data() as UserData;

				const flashcardsCollectionRef = collection(
					db,
					`users/${userId}/flashcards`
				);
				const flashcardsSnapshot = await getDocs(flashcardsCollectionRef);

				const flashcards = flashcardsSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as Flashcard[];

				setUserData({ ...user, flashcards });
			} else {
				if (retryCount < MAX_RETRIES) {
					setRetryCount((prev) => prev + 1);
					setTimeout(fetchUserData, RETRY_DELAY);
				} else {
					console.log("No such document!");
					setUserData(null);
					setError("User data not found");
				}
			}
		} catch (e) {
			console.error("Error fetching user data:", e);
			setError("Error fetching user data");
		} finally {
			setLoading(false);
		}
	}, [userId, retryCount]);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	const addFlashcard = async (newFlashcard: Flashcard) => {
		if (!userId) return;

		try {
			await setDoc(
				doc(db, `users/${userId}/flashcards`, newFlashcard.id),
				newFlashcard
			);

			setUserData((prevUserData) => {
				if (!prevUserData) return null;
				return {
					...prevUserData,
					flashcards: [newFlashcard, ...prevUserData.flashcards],
				};
			});
		} catch (e) {
			console.error("Error adding flashcard:", e);
			throw new Error("Failed to add flashcard");
		}
	};

	return { userData, loading, error, addFlashcard };
};