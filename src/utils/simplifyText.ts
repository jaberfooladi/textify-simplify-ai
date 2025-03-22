// API wrapper for the Python-based Llama 3.2 text simplification

export const simplifyText = async (text: string): Promise<string> => {
  try {
    // Make a request to our Python API endpoint
    const response = await fetch('/api/simplify_text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to simplify text');
    }

    const data = await response.json();
    return data.simplified_text;
  } catch (error) {
    console.error('Error simplifying text:', error);
    throw error;
  }
};

// Keep the sample text generation function for demo purposes
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
