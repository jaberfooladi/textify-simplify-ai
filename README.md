
# Text Simplification App

This application uses the Llama 3.2 model via Ollama to simplify complex text into easier-to-understand language.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```

3. Install Ollama:
   - Follow the instructions at [Ollama's website](https://ollama.com/) to install Ollama for your operating system
   - Pull the Llama 3.2 model using:
     ```
     ollama pull llama3.2
     ```

4. Install Python dependencies:
   ```
   pip install ollama
   ```

5. Run the development server:
   ```
   npm run dev
   ```

## API Usage

The application uses a Python serverless function to handle the Ollama API requests. The function is located in `api/simplify_text.py`.

## Deployment

When deploying to platforms like Vercel or Netlify, make sure to:
1. Set up Ollama on your server
2. Make sure the Python runtime has the Ollama package installed
3. Ensure the Llama 3.2 model is available on your server

## GitHub Repository

This project can be deployed directly from GitHub to most hosting platforms.
