
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyANAHP0ouCvcSz4XmCYfFkvygg1slos4U4",
	authDomain: "flickcards-782ee.firebaseapp.com",
	projectId: "flickcards-782ee",
	storageBucket: "flickcards-782ee.appspot.com",
	messagingSenderId: "106814558898",
	appId: "1:106814558898:web:d662ca01a0cce298efafab",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
