
# Text Simplification App

This application uses OpenAI's GPT API to simplify complex text into easier-to-understand language.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set your OpenAI API key as an environment variable:
   - For local development, create a `.env` file in the root of your project with:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```
   - For production, set the environment variable in your hosting platform

4. Run the development server:
   ```
   npm run dev
   ```

## API Usage

The application uses a Python serverless function to handle the OpenAI API requests. The function is located in `api/simplify_text.py`.

## Deployment

When deploying to platforms like Vercel or Netlify, make sure to:
1. Set the `OPENAI_API_KEY` environment variable in your project settings
2. Deploy both the frontend and the API functions

## GitHub Repository

This project can be deployed directly from GitHub to most hosting platforms. Make sure to keep your API key secure and never commit it to your repository.

