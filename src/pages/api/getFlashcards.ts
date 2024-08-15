import { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { prompt } = req.body;

	try {
		const response = await fetch(
			"https://openrouter.ai/api/v1/chat/completions",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${req.headers["authorization"]}`,
					// "HTTP-Referer": `https://pantrymanagement.vercel.app/`,
					// "X-Title": `https://pantrymanagement.vercel.app/`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "meta-llama/llama-3.1-8b-instruct:free",
					messages: [
						{
							role: "system",
							content: `
							You are a flashcard creator.Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
								1. Create clear and concise questions for the front of the flashcard.
								2. Provide accurate and informative answers for the back of the flashcard.
								3. Ensure that each flashcard focuses on a single concept or piece of information.
								4. Use simple language to make the flashcards accessible to a wide range of learners.
								5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
								6. Avoid overly complex or ambiguous phrasing in both questions and answers.
								7. When appropriate, use mnemonics or memory aids to help reinforce the information.
								8. Tailor the difficulty level of the flashcards to the user's specified preferences.
								9. If given a body of text, extract the most important and relevant information for the flashcards
								10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
								11. If the topic is not directly related to traditional academic subjects (such as science, history, mathematics, language, etc.), then return this exact JSON output with no extra text or explanation {"title": "Untitled", "difficulty": "None" ,"cards": []}

								Remember, the goal is to facilitate effective learning and retention of information through flashcards.

								Return the output only in the following JSON format with no extra text or explanation
								{"title": "<really cool and short title related to the topic>", "difficulty": "Easy" | "Medium" | "Hard", "cards": [{"front": "<flashcard question>", "back": "<flashcard answer>"}]}
							`,
						},
						{
							role: "user",
							content: `${prompt}. Give me 10 flashcards.`,
						},
					],
				}),
			}
		).then((res) => {
			return res.json();
		});
		// await new Promise((resolve) => {
		// 	setTimeout(resolve, 10000);
		// });
		return res.status(200).json({ data: response.choices[0].message.content });
	} catch (error) {
		throw Error(error as string);
	}
}

const response = {
	id: "gen-4qLrkbVum45OevmM4mRLlIIh1TRF",
	model: "meta-llama/llama-3.1-8b-instruct:free",
	object: "chat.completion",
	created: 1723564255,
	choices: [
		{
			index: 0,
			message: {
				role: "assistant",
				content:
					'{"title": "Gerentology", "cards": [{"front": "What is the largest planet in our solar system?", "back": "Jupiter"}, {"front": "Which planet is known as the Red Planet?", "back": "Mars"}, {"front": "What is the hottest planet in the solar system?", "back": "Venus"}, {"front": "Which planet do we live on?", "back": "Earth"}, {"front": "What is the farthest planet from the Sun?", "back": "Neptune"}, {"front": "Which planet is the largest of the gas giants?", "back": "Jupiter"}, {"front": "What is the smallest planet in our solar system?", "back": "Mercury"}, {"front": "Which planet has the most moons?", "back": "Jupiter"}, {"front": "What is the planet with the thickest atmosphere?", "back": "Neptune"}, {"front": "Which planet is also known as the Morning Star?", "back": "Venus"}]}',
			},
			finish_reason: "stop",
			logprobs: null,
		},
	],
	usage: {
		prompt_tokens: 326,
		completion_tokens: 213,
		total_tokens: 539,
	},
};