const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");

const { GoogleGenerativeAI } = require("@google/generative-ai");

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
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ...

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });


const bardoIA = async (promt_msg) => {

  const prompt = promt_msg;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
  //console.log(text);
}


let chatHistory = [];

//** --------------------------------------------------- */


const chatIA = async (prompt_msg) => {

  const chat = model.startChat({
    history: chatHistory,
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

    generationConfig: {
      maxOutputTokens: 100,
    },
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




module.exports = { bardoIA, chatIA };
//run();