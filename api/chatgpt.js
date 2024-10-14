import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { prompt, model } = req.body;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: model || 'chatgpt4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = completion.choices?.[0]?.message?.content;
    res.status(200).json({ response: content });
  } catch (error) {
    console.error('Erro na API do OpenAI:', error);
    res.status(500).json({ error: 'Erro ao processar o plano alimentar.' });
  }
}
