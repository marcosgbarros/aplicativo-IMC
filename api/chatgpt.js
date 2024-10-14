import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    console.log('API Key:', process.env.OPENAI_API_KEY ? 'Carregada' : 'Não encontrada');

    const { prompt, model } = req.body;

    if (!prompt) {
      console.error('Prompt não fornecido.');
      return res.status(400).json({ error: 'Prompt não fornecido.' });
    }

    const openai = new OpenAI({ apiKey });

    console.log('Enviando prompt para OpenAI:', prompt);

    const completion = await openai.chat.completions.create({
      model: model || 'text-davinci-003',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = completion.choices?.[0]?.message?.content;

    if (!content) {
      console.error('Resposta inválida do OpenAI:', completion);
      return res.status(500).json({ error: 'Resposta inválida do OpenAI.' });
    }

    console.log('Resposta recebida do OpenAI:', content);
    res.status(200).json({ response: content });
  } catch (error) {
    console.error('Erro ao chamar a API do OpenAI:', error.message);
    res.status(500).json({ error: 'Erro ao processar o plano alimentar.' });
  }
}
