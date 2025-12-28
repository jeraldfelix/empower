
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Career Coach Chat with optional Deep Thinking mode.
 * Uses gemini-3-pro-preview for complex reasoning.
 */
export const chatWithCoach = async (message: string, profile: any, deepThink: boolean = false) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const config: any = {
    systemInstruction: "You are EmpowerHer Coach, a supportive, empathetic, and professional female career mentor. Your goal is to provide actionable career advice, boost confidence, and help women navigate professional challenges. Use inclusive, warm, yet direct language. Focus on growth mindset and practical steps.",
    temperature: deepThink ? 1.0 : 0.7,
  };

  if (deepThink) {
    // Enable thinking mode for complex reasoning tasks
    config.thinkingConfig = { thinkingBudget: 32768 };
    // Instruction: Do not set maxOutputTokens when using thinkingBudget.
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `User Profile: ${JSON.stringify(profile)}. User Message: ${message}`,
    config: config,
  });
  return response.text;
};

/**
 * Low-latency career tips using gemini-flash-lite-latest.
 */
export const getQuickTip = async (context: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-flash-lite-latest',
    contents: `Give a quick, empowering 1-sentence career tip about: ${context}`,
    config: {
      systemInstruction: "You are a concise career mentor for women. Be brief and impactful.",
    }
  });
  return response.text;
};

/**
 * Structured Roadmap Generation.
 */
export const generateCareerPlan = async (profile: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Create a 4-week career roadmap for this user: ${JSON.stringify(profile)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            week: { type: Type.NUMBER },
            title: { type: Type.STRING },
            tasks: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["week", "title", "tasks"]
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

/**
 * High-quality professional content generation.
 */
export const generateArtifactContent = async (type: string, input: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Help me write a professional ${type} content based on this info: ${input}. Optimize for impact and female leadership qualities.`,
  });
  return response.text;
};

// Audio decoding and encoding helpers
export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
