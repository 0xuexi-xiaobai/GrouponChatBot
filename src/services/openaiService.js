import OpenAI from 'openai';

let openaiInstance = null;

export const initializeOpenAI = (apiKey) => {
  if (!apiKey) {
    console.error(
      'OpenAI API key is missing. Please check your environment configuration.'
    );
    return null;
  }
  openaiInstance = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  return openaiInstance;
};

export const sendMessage = async (messages) => {
  if (!openaiInstance) {
    throw new Error('OpenAI instance not initialized');
  }

  const systemMessage = {
    role: 'system',
    content: `You are a helpful assistant for Groupon, a popular e-commerce marketplace that connects subscribers with local merchants. 
    Your primary goal is to assist users with their queries about Groupon services, deals, and policies. 
    Please provide accurate, concise, and friendly responses. 
    If you're unsure about any specific details, direct users to Groupon's official website or customer service.
    Always maintain a positive and helpful tone, and try to provide actionable advice when possible.`,
  };

  try {
    const response = await openaiInstance.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.choices[0].message;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};
