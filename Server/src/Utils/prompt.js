export const prompt = (data) => {
  return `
You are an inventory forecasting expert.

Analyze the provided sales data and predict next month's demand for each product.

Return ONLY valid JSON.

Requirements:
1. Predict next month's sales quantity for each product.
2. Identify products that are risky to buy (low demand).
3. Identify best-selling products.
4. Give a confidence score (0-100).
5. Provide a short reason for each prediction.

Sales Data:
${JSON.stringify(data)}

also add html and inline css in the result, I will derectly paste your response
`;
};