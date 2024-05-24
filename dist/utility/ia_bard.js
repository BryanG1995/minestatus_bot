"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatIA = exports.bardoIA = void 0;
const generative_ai_1 = require("@google/generative-ai");
const generative_ai_2 = require("@google/generative-ai");
const safetySettings = [
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
];
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new generative_ai_2.GoogleGenerativeAI(process.env.API_KEY);
// ...
// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    safetySettings,
    generationConfig: { maxOutputTokens: 125 }
});
const bardoIA = async (promt_msg) => {
    try {
        const prompt = promt_msg;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text.length);
        return text;
    }
    catch (error) {
        console.log(error);
        return 'No hay respuesta.';
    }
};
exports.bardoIA = bardoIA;
let chatHistory = [];
//** --------------------------------------------------- */
const chatIA = async (prompt_msg) => {
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
    chatHistory.push({
        role: 'user',
        parts: [{ text: prompt_msg }],
    }, {
        role: 'model',
        parts: [{ text: text }],
    });
    console.log(chatHistory);
    return text;
};
exports.chatIA = chatIA;
//run();
