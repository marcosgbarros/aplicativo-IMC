import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Domínios permitidos
const allowedOrigins = [
  'https://aplicativo-imc.vercel.app',
  'https://aplicativo-imc-git-main-aplicativo-imc.vercel.app'
];

// Configuração do CORS
app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem 'origin' (como as feitas por ferramentas como Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Configuração para lidar com preflight requests (OPTIONS)
app.options('/api/chatgpt', cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
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
