import OpenAI from 'openai';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: `Method ${event.httpMethod} Not Allowed` }),
    };
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('API Key não encontrada.');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API Key não configurada.' }),
      };
    }

    const { prompt, model } = JSON.parse(event.body);

    if (!prompt) {
      console.error('Prompt não fornecido.');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Prompt não fornecido.' }),
      };
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = completion.choices?.[0]?.message?.content;

    if (!content) {
      console.error('Resposta inválida do OpenAI:', completion);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Resposta inválida do OpenAI.' }),
      };
    }

    console.log('Resposta do OpenAI:', content);
    return {
      statusCode: 200,
      body: JSON.stringify({ response: content }),
    };
  } catch (error) {
    console.error('Erro ao chamar a API do OpenAI:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao processar o plano alimentar.' }),
    };
  }
};
