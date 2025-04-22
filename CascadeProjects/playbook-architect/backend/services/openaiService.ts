import { OpenAIApi, Configuration } from 'openai';

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

export async function chatCompletion(messages: any[], model: string = 'gpt-4o-mini') {
  const response = await openai.createChatCompletion({
    model,
    messages,
  });
  return response.data.choices[0]?.message?.content;
}
