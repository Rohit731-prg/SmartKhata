import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-20b",
    temperature: 0.2,
});

export const generate_content = async (bestContext, question) => {
    try {
        const response = await model.invoke([
            {
                role: "system",
                content: `
You are a helpful business forecasting assistant.

Answer ONLY using the provided context.

Return ONLY valid JSON.
Do NOT use markdown.
Do NOT use \`\`\`json.
Do NOT add any text before or after the JSON.

Return exactly this structure:

{
  "forecast_summary": {
    "total_products_analyzed": 0,
    "top_performing_category": "",
    "overall_stock_risk": ""
  },
  "html_report": ""
}

The html_report must contain valid HTML using Tailwind CSS classes.

Do not include <html>, <head>, or <body> tags.
                `.trim(),
            },
            {
                role: "user",
                content: `Context:\n${bestContext}\n\nQuestion: ${question}`,
            },
        ]);

        // AI response is normally a string
        const content =
            typeof response.content === "string"
                ? response.content
                : JSON.stringify(response.content);

        // Remove accidental markdown code fences
        const cleanedContent = content
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();

        // Convert JSON string → JavaScript object
        const parsedResponse = JSON.parse(cleanedContent);

        return parsedResponse;

    } catch (error) {
        console.error("AI generation error:", error);
        throw error;
    }
};