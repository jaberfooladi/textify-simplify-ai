
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
      const errorText = await response.text();
      let errorMessage = 'Failed to simplify text';
      
      try {
        // Try to parse the error as JSON
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        // If parsing fails, use the raw text
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    const responseText = await response.text();
    if (!responseText) {
      throw new Error('Empty response received from server');
    }
    
    const data = JSON.parse(responseText);
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
