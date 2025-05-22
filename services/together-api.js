require('dotenv').config();
const Together = require('together-ai');

const API_KEY = process.env.TOGETHER_API_KEY;
const MODEL = process.env.TOGETHER_MODEL || 'meta-llama/Llama-Vision-Free';

if (!API_KEY) {
  throw new Error('Missing Together API key. Please check your .env file.');
}

const together = new Together({
  apiKey: API_KEY
});

async function getTogetherResponse(userMessage) {
  try {
    const response = await together.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Please be super brief and accurate as you reply to this: ${userMessage }` }
      ],
      stream: false // We use non-streamed for simplicity
    });

    const reply = response.choices?.[0]?.message?.content;
    return reply || "Sorry, I didn't get that.";
  } catch (error) {
    console.error('Error from Together AI SDK:', error.message);
    throw new Error('Failed to get response from Together AI');
  }
}

module.exports = { getTogetherResponse };
