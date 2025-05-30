
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/useAppStore";
import { Brain, RotateCcw, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FlashcardsView = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  
  const { currentProject, updateProject } = useAppStore();
  const flashcards = currentProject?.flashcards || [];

  const handleFlipCard = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleDeleteCard = (cardId: string) => {
    if (currentProject) {
      const updatedFlashcards = currentProject.flashcards.filter(card => card.id !== cardId);
      updateProject(currentProject.id, { flashcards: updatedFlashcards });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Facile';
      case 'medium': return 'Moyen';
      case 'hard': return 'Difficile';
      default: return difficulty;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-memento-orange" />
          <h1 className="text-2xl font-bold text-memento-navy">Fiches de révision</h1>
          <Badge variant="secondary" className="bg-memento-orange/10 text-memento-orange">
            {flashcards.length} fiches
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setFlippedCards(new Set())}
            disabled={flippedCards.size === 0}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retourner toutes
          </Button>
          <Button className="bg-memento-orange hover:bg-memento-orange/90">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une fiche
          </Button>
        </div>
      </div>

      {/* Content */}
      {flashcards.length === 0 ? (
        <Card className="flex-1 border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center h-full text-center p-12">
            <Brain className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune fiche de révision
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Commencez par transcrire votre audio et générer automatiquement 
              des fiches de révision personnalisées.
            </p>
            <Button className="bg-memento-orange hover:bg-memento-orange/90">
              <Plus className="w-4 h-4 mr-2" />
              Créer ma première fiche
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {flashcards.map((card) => (
                <Card
                  key={card.id}
                  className={cn(
                    "relative cursor-pointer transition-all duration-300 hover:shadow-lg group",
                    selectedCard === card.id && "ring-2 ring-memento-orange"
                  )}
                  onClick={() => handleFlipCard(card.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge className={getDifficultyColor(card.difficulty)}>
                        {getDifficultyLabel(card.difficulty)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCard(card.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="min-h-[200px] flex items-center justify-center">
                      {flippedCards.has(card.id) ? (
                        <div className="text-center animate-fade-in">
                          <h4 className="text-sm font-medium text-gray-600 mb-3">Réponse</h4>
                          <p className="text-gray-800 leading-relaxed">
                            {card.answer}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <h4 className="text-sm font-medium text-gray-600 mb-3">Question</h4>
                          <p className="text-gray-800 font-medium leading-relaxed">
                            {card.question}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Tags */}
                    {card.tags.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-1">
                          {card.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs text-memento-orange border-memento-orange/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Study Mode Info */}
      {flashcards.length > 0 && (
        <div className="bg-memento-orange/10 border border-memento-orange/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-memento-orange" />
              <span className="text-sm font-medium text-memento-navy">
                Mode révision : Cliquez sur une fiche pour la retourner
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-memento-orange text-memento-orange hover:bg-memento-orange hover:text-white"
            >
              Mode étude avancé
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardsView;
