import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'your-openai-key',
  dangerouslyAllowBrowser: true // Only for demo purposes
});

export const generateAIResponse = async (message: string, context: string = '') => {
  try {
    const systemPrompt = `You are EduPath Advisor, an AI educational counselor specializing in helping Indian students make informed decisions about their educational and career paths. 

Your expertise includes:
- Career guidance and counseling
- College and course recommendations
- Educational planning and timeline management
- Academic and professional development advice
- Indian education system knowledge (CBSE, ICSE, State boards, JEE, NEET, etc.)

Context: ${context}

Provide helpful, accurate, and encouraging responses. If you don't know something specific, suggest where the student can find more information.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "I'm experiencing technical difficulties. Please try again later or contact support.";
  }
};

export const generatePersonalizedRecommendations = async (userProfile: any) => {
  try {
    const prompt = `Based on this student profile, generate personalized educational recommendations:

Student Profile:
- Class: ${userProfile.class}
- Interests: ${userProfile.interests?.join(', ') || 'Not specified'}
- Completed Quiz: ${userProfile.completed_quiz ? 'Yes' : 'No'}

Generate 3-5 specific course and college recommendations with brief explanations. Focus on Indian educational institutions and career paths.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert educational counselor for Indian students. Provide specific, actionable recommendations." },
        { role: "user", content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "Unable to generate recommendations at this time.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "Unable to generate personalized recommendations. Please try again later.";
  }
};
