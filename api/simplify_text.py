
import os
import json
from http.server import BaseHTTPRequestHandler
from ollama import chat
from ollama.types import ChatResponse

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
        
        # Define the prompt for the Llama model
        prompt = "Rewrite the following text in simple, clear, and engaging language suitable for young audiences. Retain the key details and ideas."
        
        try:
            # Make the API call to the local Llama 3.2 model using Ollama
            response: ChatResponse = chat(
                model='llama3.2', 
                messages=[
                    {
                        'role': 'user',
                        'content': f'{prompt} : text : {text_to_simplify}',
                    },
                ]
            )
            
            # Extract the simplified text from the response
            simplified_text = response.message.content
            
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
