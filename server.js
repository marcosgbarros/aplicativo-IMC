import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Ajuste o CORS para permitir requisições do domínio do seu front-end
app.use(cors({
  origin: 'https://aplicativo-imc.vercel.app', // substitua pelo seu domínio front-end
  methods: ['GET', 'POST'], // métodos que você quer permitir
  allowedHeaders: ['Content-Type', 'Authorization'], // headers permitidos
}));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


app.use(cors());
app.use(express.json());

app.post('/api/chatgpt', async (req, res) => {
  const { prompt, model } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: model || "gpt-4o-mini",
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate response.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
