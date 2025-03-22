
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { simplifyText, generateSampleText } from '@/utils/simplifyText';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, RotateCcw, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import TextTransition from '@/components/TextTransition';

const TextSimplifier = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleSimplify = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text to simplify.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    setOutputText('');
    setError(null);
    
    try {
      const result = await simplifyText(inputText);
      
      // Display the result with a typing effect
      let displayText = '';
      const textArray = result.split('');
      
      for (let i = 0; i < textArray.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 10)); // adjust speed as needed
        displayText += textArray[i];
        setOutputText(displayText);
      }
      
    } catch (error) {
      setError(
        error instanceof Error 
          ? error.message 
          : "Failed to simplify text. Please check your API configuration and try again."
      );
      
      toast({
        title: "Error",
        description: "Failed to simplify text. Please check the API configuration.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleCopyOutput = () => {
    if (!outputText) return;
    
    navigator.clipboard.writeText(outputText);
    setIsCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "The simplified text has been copied to your clipboard.",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleReset = () => {
    setInputText('');
    setOutputText('');
  };
  
  const handleUseExample = () => {
    setInputText(generateSampleText());
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <TextTransition className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3">Simplify Complex Text</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform complex language into clear, easy-to-understand text with our AI-powered simplification tool.
        </p>
      </TextTransition>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <TextTransition delay={100} direction="up">
          <Card className="glass-panel rounded-2xl overflow-hidden p-0.5">
            <div className="bg-gradient-to-br from-background to-muted rounded-2xl">
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Input Text</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleUseExample}
                    className="text-xs h-8"
                  >
                    Use Example
                  </Button>
                </div>
                <Textarea 
                  placeholder="Enter text to simplify..." 
                  className="min-h-[250px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent p-3"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="transition-all duration-300"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <Button
                    onClick={handleSimplify}
                    disabled={isProcessing || !inputText.trim()}
                    size="sm"
                    className="bg-primary/90 hover:bg-primary transition-all duration-300"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Simplifying...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Simplify
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TextTransition>
        
        <TextTransition delay={200} direction="up">
          <Card className="glass-panel rounded-2xl overflow-hidden p-0.5 relative">
            <div className="bg-gradient-to-br from-background to-muted rounded-2xl h-full">
              <div className="p-4 space-y-2 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Simplified Output</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCopyOutput}
                    disabled={!outputText}
                    className={`text-xs h-8 transition-all duration-300 ${isCopied ? 'text-green-500' : ''}`}
                  >
                    <Copy className="mr-2 h-3 w-3" />
                    {isCopied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div 
                  className="min-h-[250px] flex-1 rounded-md bg-transparent p-3 text-sm whitespace-pre-wrap overflow-auto"
                >
                  {error ? (
                    <div className="text-destructive h-full flex items-center justify-center text-center p-6">
                      <div>
                        <AlertCircle className="h-6 w-6 mx-auto mb-3 opacity-50" />
                        <p>{error}</p>
                      </div>
                    </div>
                  ) : outputText ? (
                    outputText
                  ) : (
                    <div className="text-muted-foreground h-full flex items-center justify-center text-center p-6">
                      <div>
                        <ArrowRight className="h-6 w-6 mx-auto mb-3 opacity-50" />
                        <p>Your simplified text will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {isProcessing && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="relative h-10 w-10">
                    <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
                  </div>
                  <p className="mt-4 text-sm font-medium">Processing...</p>
                </div>
              </div>
            )}
          </Card>
        </TextTransition>
      </div>
      
      <TextTransition delay={300} className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by OpenAI's GPT API to provide accurate text simplification while preserving meaning.
        </p>
      </TextTransition>
    </div>
  );
};

export default TextSimplifier;
