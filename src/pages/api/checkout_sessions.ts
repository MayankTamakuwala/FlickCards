import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const formatAmountForStripe = (amount: number) => {
	return Math.round(amount * 100);
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { userId } = req.body;
		const params: Stripe.Checkout.SessionCreateParams = {
			mode: "subscription",
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "FlickCards Pro",
						},
						unit_amount: formatAmountForStripe(9),
						recurring: {
							interval: "month",
							interval_count: 1,
						},
					},
					quantity: 1,
				},
			],
			success_url: `${process.env.BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&userId=${userId}`,
			cancel_url: `${process.env.BASE_URL}/result?session_id={CHECKOUT_SESSION_ID}&no_payment=true`,
		};

		try {
			const checkoutSession = await stripe.checkout.sessions.create(params);
			
			return res.status(200).json(checkoutSession);
		} catch (error: any) {
			console.error("Error creating checkout session", error);
			return res.status(500).json({ error: { message: error.message } });
		}
	} else if (req.method === "GET") {
		const { session_id, userId } = req.query

		console.log(session_id, userId)
		// const {userId} = req.body
		try {
			const checkoutSession = await stripe.checkout.sessions.retrieve(
				session_id as string
			);

			console.log("====================================");
			console.log("Mayank 4: ", checkoutSession);
			console.log("====================================");
			console.log("====================================");
			console.log("Mayank 5: ", checkoutSession.payment_status);
			console.log("====================================");
			console.log('====================================');
			console.log("Mayank 6: ", userId);
			console.log('====================================');

			if (checkoutSession.payment_status === "paid" && userId) {
				console.log("Mayank 5");
				updateFirestore(userId as string);
				console.log("Mayank 6");
			}

			return res.status(200).json(checkoutSession);
		} catch (error: any) {
			console.error("Error retrieving checkout session", error);
			return res.status(500).json({ error: { message: error.message } });
		}
	} else {
		res.setHeader("Allow", ["POST", "GET"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

const updateFirestore = async (userId: string) => {
	const userDocRef = doc(db, "users", userId);
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
};

export default handler;