
import os
import json
from http.server import BaseHTTPRequestHandler
from openai import OpenAI

# Initialize the OpenAI client
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Get the content length
        content_length = int(self.headers['Content-Length'])
        # Read the request body
        request_body = self.rfile.read(content_length)
        # Parse the JSON data
        data = json.loads(request_body)
        
        # Get the text to simplify from the request
        text_to_simplify = data.get('text', '')
        
        # Define the prompt for the API
        system_prompt = "You are an expert at simplifying complex text. Your task is to rewrite the provided text in simpler language that's easy to understand without losing the original meaning. Break down complex sentences, use simpler vocabulary, and organize the information clearly."
        
        try:
            # Make the API call to OpenAI
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",  # You can use a different model if needed
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Please simplify this text: {text_to_simplify}"}
                ],
                temperature=0.7,
                max_tokens=1000
            )
            
            # Extract the simplified text from the response
            simplified_text = response.choices[0].message.content
            
            # Set the response headers
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            
            # Send the response
            self.wfile.write(json.dumps({"simplified_text": simplified_text}).encode())
            
        except Exception as e:
            # Handle errors
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
    
    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

