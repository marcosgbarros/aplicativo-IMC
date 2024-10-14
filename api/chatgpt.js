import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { prompt, model } = req.body;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: model || 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    if (completion?.choices?.[0]?.message?.content) {
      res.status(200).json({ response: completion.choices[0].message.content });
    } else {
      throw new Error('Resposta inválida do OpenAI.');
    }
  } catch (error) {
    console.error('Erro na API do OpenAI:', error);
    res.status(500).json({ error: 'Erro ao processar o plano alimentar.' });
  }
}
