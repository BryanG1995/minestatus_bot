import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

import { GoogleGenerativeAI } from '@google/generative-ai';

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

// ...

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  safetySettings,
  generationConfig: { maxOutputTokens: 125 }
});


export const bardoIA = async (promt_msg: string) => {

  try {

    const prompt = promt_msg;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text.length);
    return text;
  } catch (error) {
    console.log(error);
    return 'No hay respuesta.';
  }
}

interface ChatHistory {
  role: string
  parts: any[]
}

let chatHistory: ChatHistory[] | undefined = [];

//** --------------------------------------------------- */


export const chatIA = async (prompt_msg: string) => {

  const chat = model.startChat({
    history: chatHistory,
    generationConfig: {
      maxOutputTokens: 100,
    },
    /**
     * 
     * [
     *  {
     *    role: "user",
     *    parts: [{ text: "hola" }],
     *  },
     *  {
     *    role: "model",
     *    parts: [{ text: "¡Hola a ti también! ¿Cómo puedo ayudarte hoy?" }],
     *  },
     * ],
     */
  });

  // const msg = "How many paws are in my house?";

  const result = await chat.sendMessage(prompt_msg);
  const response = await result.response;
  const text = response.text();

  chatHistory.push(
    {
      role: 'user',
      parts: [{ text: prompt_msg }],
    },
    {
      role: 'model',
      parts: [{ text: text }],
    }
  )
  console.log(chatHistory);
  return text;
}




//run();