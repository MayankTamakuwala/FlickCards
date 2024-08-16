import Stripe from "stripe";
import { NextRequest } from "next/server";

import { headers } from "next/headers";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-06-20",
	typescript: true,
});

export async function POST(request: NextRequest) {
	const body = await request.text();
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
	const sig = headers().get("stripe-signature") as string;
	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
	} catch (err) {
		return new Response(`Webhook Error: ${err}`, {
			status: 400,
		});
	}

	switch (event.type) {
		case "checkout.session.completed":
			const checkoutSession = event.data.object;

            if (
				checkoutSession.metadata &&
				checkoutSession.metadata.userId &&
				(
					checkoutSession.payment_status === 'no_payment_required' || 
					checkoutSession.payment_status === 'paid'
				)
			) {
				const userDocRef = doc(
					db,
					"users",
					checkoutSession.metadata.userId
				);
				await setDoc(
					userDocRef,
					{
						planName: "Pro",
						last_paid: new Date().getTime(),
						active_days: 30,
						paid: true,
					},
					{ merge: true }
				);
				console.log("User data updated on Firebase successfully.");
			}
			break;
		// case ""
	}
	return new Response("RESPONSE EXECUTE", {
		status: 200,
	});
}
