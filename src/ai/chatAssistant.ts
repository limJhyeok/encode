import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY!,
    dangerouslyAllowBrowser: true,
});

export async function getAIResponse(prompt: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        });
        return response.choices[0].message.content || "No response";
    } catch (error) {
        console.error("AI Assistant error:", error);
        return "⚠️ AI failed to respond.";
    }
}
