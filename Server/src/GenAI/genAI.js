import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});
import { prompt } from "../Utils/prompt.js";
import { z } from "zod";

export const getAIresponse = async (data) => {
  const input_prmopt = prompt(data)
  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: input_prmopt,
  });
  console.log(interaction.output_text);
  return interaction.output_text;
}

export default getAIresponse