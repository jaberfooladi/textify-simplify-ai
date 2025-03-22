
// This is a placeholder for a more sophisticated text simplification algorithm
// In a real application, this would be replaced with an API call to an AI model

export const simplifyText = async (text: string): Promise<string> => {
  // Simulating an API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Placeholder text simplification logic
  let simplified = text
    // Replace complex words with simpler alternatives
    .replace(/utilize/g, "use")
    .replace(/commence/g, "start")
    .replace(/terminate/g, "end")
    .replace(/sufficient/g, "enough")
    .replace(/acquire/g, "get")
    .replace(/purchase/g, "buy")
    .replace(/obtain/g, "get")
    .replace(/require/g, "need")
    .replace(/additional/g, "more")
    .replace(/approximately/g, "about")
    .replace(/subsequently/g, "later")
    .replace(/regarding/g, "about")
    // Break long sentences
    .replace(/(\. )/g, ".\n\n");
  
  // If the text is very short, don't modify it
  if (text.length < 10) {
    simplified = text;
  }
  
  return simplified;
};

export const generateSampleText = (): string => {
  const samples = [
    "The patient subsequently exhibited symptoms that required additional examination regarding the underlying condition.",
    "We need to utilize our resources efficiently to acquire the necessary funding for this project.",
    "The corporation endeavors to maximize stakeholder value through strategic implementations of innovative technologies.",
    "The pedagogical methodology employed by the institution necessitates comprehensive understanding of complex theoretical frameworks.",
    "It is imperative that we commence the proceedings without further delay and terminate any superfluous activities."
  ];
  
  return samples[Math.floor(Math.random() * samples.length)];
};
