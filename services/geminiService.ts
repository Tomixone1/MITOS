import { GoogleGenAI, Type } from "@google/genai";
import { ExplanationResponse } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `Eres un historiador, científico y mitólogo experto. Tu tarea es analizar el mito o fantasía proporcionado y devolver una respuesta estrictamente en formato JSON. El JSON debe contener tres campos: 'category' (una cadena que clasifica el mito, por ejemplo, 'Mitología Griega', 'Leyenda Urbana', 'Folclore Japonés'), 'tags' (un array de cadenas con hasta 5 palabras clave relevantes, por ejemplo, 'dioses', 'creación', 'héroes', 'engaño'), y 'explanation' (una cadena en formato Markdown con la explicación racional, científica e histórica del mito). En la explicación, desacredita los elementos sobrenaturales, ofrece alternativas plausibles basadas en evidencias, y si es posible, explica los orígenes del mito. La respuesta debe estar en español.`;

export const getRationalExplanation = async (myth: string): Promise<ExplanationResponse> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: myth,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
          topP: 0.95,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              explanation: { type: Type.STRING, description: "La explicación detallada del mito en formato Markdown." },
              category: { type: Type.STRING, description: "La categoría principal del mito." },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Un array de palabras clave relevantes."
              }
            },
            required: ['explanation', 'category', 'tags']
          }
        },
    });
    
    const jsonResponse = JSON.parse(response.text);
    return jsonResponse;
  } catch (error) {
    console.error("Error processing Gemini response:", error);
    if (error instanceof SyntaxError) {
        throw new Error("La IA devolvió una respuesta en un formato inesperado. Por favor, intenta de nuevo.");
    }
    if (error instanceof Error) {
        throw new Error(`Error al contactar la IA: ${error.message}.`);
    }
    throw new Error("Ocurrió un error desconocido al procesar tu solicitud.");
  }
};
