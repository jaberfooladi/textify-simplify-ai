import os
import json
import re
from http.server import BaseHTTPRequestHandler, HTTPServer
from ollama import chat
from ollama import ChatResponse

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Read and parse the request body
            content_length = int(self.headers.get('Content-Length', 0))
            request_body = self.rfile.read(content_length)
            data = json.loads(request_body)
            
            # Retrieve the text, model, and simplification option
            text_to_simplify = data.get('text', '')
            selected_model = data.get('model', 'llama3.2')
            option = data.get('option', 'simple_explain')  # default to simple explanation

            # Choose prompt based on simplification option
            if option == "simple_explain":
                prompt = (
                    "Rewrite the following text in simple, clear language using simple words and phrases. "
                    "Provide brief explanations for any complex concepts, so that someone with limited language skills can understand easily."
                )
            elif option == "child_friendly":
                prompt = (
                    "Rewrite the following text in a simple, clear, and engaging language suitable for children and young audiences. "
                    "Use fun, accessible language and examples that a child can easily understand."
                )
            else:
                prompt = (
                    "Rewrite the following text in simple, clear language."
                )
            
            # Call the local model via Ollama with the selected model and prompt
            response: ChatResponse = chat(
                model=selected_model, 
                messages=[
                    {
                        'role': 'user',
                        'content': f'{prompt} : \n\n\n text : "{text_to_simplify}"',
                    },
                ]
            )
            simplified_text = response.message.content

            # If using deepseek-r1, remove any internal thinking text (<think> ... </think>)
            if selected_model == 'deepseek-r1':
                simplified_text = re.sub(r'<think>.*?</think>', '', simplified_text, flags=re.DOTALL).strip()
            
            # Send back the JSON response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps({"simplified_text": simplified_text}).encode())
        except Exception as e:
            # Send error message in JSON format
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

def run(server_class=HTTPServer, handler_class=handler, port=8081):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
