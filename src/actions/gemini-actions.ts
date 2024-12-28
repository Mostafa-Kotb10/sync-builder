"use server";

import { model } from "@/lib/gemini";

import {
  GenerateSummaryInput,
  generateSummarySchema,
  generateWorkExperienceSchema,
  GenerateWorkExperienceInput,
  WorkExperience,
  GeneratePersonalInfoInput,
  PersonalInfoValues,
} from "@/lib/validation";

import { parse } from "date-fns";

export const generateSummary = async (input: GenerateSummaryInput) => {
  // TODO: Block for non-premium users.

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const sysMessage =
    "You are a job resume generator AI. your task is to write professional introduction summary for a resume given to user's provided data only return the summary and don't include any other information in the response. Keep it concise and professional.";

  const prompt = `
        Please generate a professional resume summary from this data:
        Job Title: ${jobTitle || "N/A"}
        Work experiences:
        ${workExperiences
          ?.map(
            (exp) => `
              Position: ${exp.position || "N/A"},
              Company: ${exp.company || "N/A"},
              Description: ${exp.description || "N/A"},
              Start date: ${exp.startDate || "N/A"}
              End date: ${exp.endDate || "Present"}
            `,
          )
          .join("\n\n")}
        Educations:
        ${educations
          ?.map(
            (edu) => `
              Degree: ${edu.degree || "N/A"},
              School: ${edu.school || "N/A"},
              Start date: ${edu.startDate || "N/A"}
              End date: ${edu.endDate || "N/A"}
            `,
          )
          .join("\n\n")}
        Skills: 
        ${skills}
    `;
  const aiResponse = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    systemInstruction: {
      role: "system",
      parts: [
        {
          text: sysMessage,
        },
      ],
    },
  });

  if (!aiResponse) {
    throw new Error("Failed tp generate AI Response");
  }

  return aiResponse.response.text();
};

export const generateWorkExperience = async (
  input: GenerateWorkExperienceInput,
) => {
  // TODO: Block for non-premium users

  const { description } = generateWorkExperienceSchema.parse(input);

  const sysMessage = `
    You are a Job resume generator AI, your job is to generate a single work experience entry based on the user input. Your response must adhere to the following structure. You can omit fields if they can't be inferred from provided data, but fon't add any new ones

    Job title: <job title>
    Company: <Company name>
    Start date: <Date> only of provided
    End date: <Date Object Format> only of provided
    Description: <an optimized description in bullet format, might be inferred from the job title> and limit it to 5 bullet points
    the data should be in yyyy-MM-dd format
  `;

  const userMessage = `
    Please provide the work experience Entry from this description:
    ${description}
  `;

  const aiResponse = await model
    .generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
      systemInstruction: {
        role: "system",
        parts: [{ text: sysMessage }],
      },
    })
    .then((res) => res.response?.text());

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }
  const startDateMatch = aiResponse.match(
    /Start date: (\d{4}-\d{2}-\d{2})/,
  )?.[1];

  const endDateMatch = aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1];

  const startDate = startDateMatch
    ? parse(startDateMatch, "yyyy-MM-dd", new Date())
    : undefined;

  const endDate = endDateMatch
    ? parse(endDateMatch, "yyyy-MM-dd", new Date())
    : undefined;

  console.log("aiResponse", aiResponse);

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: aiResponse.match(/Description:([\s\S]*)/)?.[1],
    startDate,
    endDate,
  } satisfies WorkExperience;
};

export const generatePersonalInfo = async (
  input: GeneratePersonalInfoInput,
) => {
  const sysMessage = `
  You are a Job resume generator AI, your job is to generate a personal info based on the user input. Your response must adhere to the following structure. You can omit fields if they can't be inferred from provided data, but fon't add any new ones, Fill the place holder with the data provided

  First name: <First name>
  Last name: <Last name>
  Job title: <Job title>
  City name: <City name>
  Country name: <Country name>
  Phone: <Phone>
  Email: <email>
`;

  const userMessage = `
  Please provide the personal info from this description ${input.description}
`;

  const aiResponse = await model
    .generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
      systemInstruction: {
        role: "system",
        parts: [{ text: sysMessage }],
      },
    })
    .then((res) => res.response?.text());

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  console.log(aiResponse);

  return {
    firstName: aiResponse.match(/First name: (.*)/)?.[1] || "",
    lastName: aiResponse.match(/Last name: (.*)/)?.[1] || "",
    city: aiResponse.match(/City name: (.*)/)?.[1] || "",
    jobTitle: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    country: aiResponse.match(/Country name: (.*)/)?.[1] || "",
    email: aiResponse.match(/Email: (.*)/)?.[1] || "",
    phone: aiResponse.match(/Phone: (.*)/)?.[1] || "",
  } satisfies PersonalInfoValues;
};
