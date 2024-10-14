import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { prompt, model } = req.body;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const completion = await openai.chat.completions.create({
        model: model || 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      });

      if (completion && completion.choices && completion.choices[0]) {
        res.status(200).json({ response: completion.choices[0].message.content });
      } else {
        res.status(500).json({ error: 'Resposta inválida do OpenAI.' });
      }
    } catch (error) {
      console.error('Erro ao chamar a API do OpenAI:', error);
      res.status(500).json({ error: 'Erro ao gerar o plano alimentar.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
