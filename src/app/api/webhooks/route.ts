import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
require("dotenv").config();

export async function POST(req: Request) {
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error occured", {
			status: 400,
		});
	}

	if (evt.type === "user.created") {
		console.log("userId:", evt.data.id);
		try {
			await setDoc(doc(db, `users/${evt.data.id}`), {
				id: evt.data.id,
				email: evt.data.email_addresses[0].email_address,
				created_at: evt.data.created_at,
				paid: null,
				last_paid: null,
				active_days: 7,
			});
			console.log("User data saved to Firebase successfully.");
		} catch (error) {
			console.error("Error saving user data to Firebase:", error);
			return new Response("Error saving data", {
				status: 500,
			});
		}
	} else if (evt.type === "user.deleted") {
		console.log("userId:", evt.data.id);
		try {
			await deleteDoc(doc(db, `users/${evt.data.id}`));
			console.log("User data deleted from Firebase successfully.");
		} catch (error) {
			console.error("Error deleting user data from Firebase:", error);
			return new Response("Error deleting data", {
				status: 500,
			});
		}
	}

	return new Response("", { status: 200 });
}
