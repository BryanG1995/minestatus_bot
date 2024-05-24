"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const bardoIA = (promt_msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompt = promt_msg;
        const result = yield model.generateContent(prompt);
        const response = yield result.response;
        const text = response.text();
        console.log(text.length);
        return text;
    }
    catch (error) {
        console.log(error);
        return 'No hay respuesta.';
    }
});
exports.bardoIA = bardoIA;
let chatHistory = [];
//** --------------------------------------------------- */
const chatIA = (prompt_msg) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield chat.sendMessage(prompt_msg);
    const response = yield result.response;
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
});
exports.chatIA = chatIA;
//run();
