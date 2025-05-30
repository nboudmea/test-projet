
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/store/useAppStore";
import { MessageSquare, Send, Brain, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatView = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { chatMessages, addChatMessage, currentProject } = useAppStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    
    // Ajouter le message de l'utilisateur
    addChatMessage(userMessage, 'user');
    
    // Simuler la réponse de l'IA
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponses = [
        "D'après votre cours sur la photosynthèse, voici ce que je peux vous expliquer : La photosynthèse est effectivement un processus fondamental qui permet aux plantes de convertir l'énergie lumineuse en énergie chimique.",
        "Excellente question ! Selon votre transcription, les deux phases principales sont les réactions photochimiques (phase claire) et le cycle de Calvin (phase sombre). Souhaitez-vous que je détaille l'une d'entre elles ?",
        "Je peux vous aider à réviser ce concept. Basé sur votre contenu, la chlorophylle joue un rôle essentiel dans l'absorption de la lumière. Voulez-vous que je crée un résumé de cette partie ?",
        "D'après l'analyse de votre cours, cette équation est correcte : 6CO2 + 6H2O + énergie lumineuse → C6H12O6 + 6O2. Dois-je vous expliquer chaque élément de cette réaction ?",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addChatMessage(randomResponse, 'ai');
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Explique-moi la photosynthèse en détail",
    "Quelles sont les phases de la photosynthèse ?",
    "Crée un résumé du cours",
    "Pose-moi une question sur le contenu"
  ];

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-memento-coral" />
          <div>
            <h1 className="text-2xl font-bold text-memento-navy">Chat IA</h1>
            <p className="text-sm text-gray-600">
              Discutez avec l'IA sur le contenu de : {currentProject?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 && (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Commencez une conversation
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Posez des questions sur votre cours ou demandez des explications 
                  détaillées. L'IA a analysé votre contenu.
                </p>
                
                {/* Suggested Questions */}
                <div className="space-y-2 max-w-lg mx-auto">
                  <p className="text-sm font-medium text-gray-600 mb-3">
                    Questions suggérées :
                  </p>
                  <div className="grid gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setInputMessage(question)}
                        className="text-left justify-start h-auto py-2 px-3 text-sm"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start space-x-3",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 bg-memento-coral rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    message.sender === 'user'
                      ? "bg-memento-teal text-white"
                      : "bg-gray-100 text-gray-800"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={cn(
                    "text-xs mt-2 opacity-70",
                    message.sender === 'user' ? "text-white" : "text-gray-500"
                  )}>
                    {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-memento-navy rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-memento-coral rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Posez votre question sur le cours..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-memento-coral hover:bg-memento-coral/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              Appuyez sur Entrée pour envoyer • L'IA analyse le contenu de votre projet
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatView;
