import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { prompt, model } = req.body;
      const completion = await new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
        .chat.completions.create({
          model: model || 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
        });

      res.status(200).json({ response: completion.choices[0].message.content });
    } catch (error) {
      console.error('Erro:', error);
      res.status(500).json({ error: 'Erro ao gerar o plano alimentar.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
