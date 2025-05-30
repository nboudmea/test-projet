
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/store/useAppStore";
import { Upload, Play, Pause, Volume2, Save } from "lucide-react";
import { toast } from "sonner";

const TranscriptionView = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { currentProject, updateProject } = useAppStore();

  // Simulation de données pour la démonstration
  const mockTranscription = `Bienvenue dans ce cours sur la photosynthèse. La photosynthèse est un processus biologique fondamental qui permet aux plantes de convertir l'énergie lumineuse en énergie chimique.

Ce processus se déroule principalement dans les chloroplastes des cellules végétales et implique deux phases principales :

1. Les réactions photochimiques (phase claire)
- Absorption de la lumière par la chlorophylle
- Production d'ATP et de NADPH
- Libération d'oxygène

2. Le cycle de Calvin (phase sombre)
- Fixation du CO2
- Synthèse de glucose
- Régénération des accepteurs de CO2

L'équation globale de la photosynthèse peut s'écrire :
6CO2 + 6H2O + énergie lumineuse → C6H12O6 + 6O2

Cette réaction est essentielle pour la vie sur Terre car elle produit l'oxygène que nous respirons et forme la base de la chaîne alimentaire.`;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        // Simulation de l'upload et transcription
        setTimeout(() => {
          setTranscriptionText(mockTranscription);
          toast.success("Audio téléchargé et transcrit avec succès !");
        }, 2000);
        toast.info("Transcription en cours...");
      } else {
        toast.error("Veuillez sélectionner un fichier audio valide");
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSaveTranscription = () => {
    if (currentProject) {
      updateProject(currentProject.id, {
        transcription: transcriptionText
      });
      toast.success("Transcription sauvegardée !");
    }
  };

  const generateContent = () => {
    if (!transcriptionText.trim()) {
      toast.error("Veuillez d'abord ajouter une transcription");
      return;
    }

    // Simulation de génération de contenu
    const mockFlashcards = [
      {
        id: crypto.randomUUID(),
        question: "Qu'est-ce que la photosynthèse ?",
        answer: "Un processus biologique qui permet aux plantes de convertir l'énergie lumineuse en énergie chimique.",
        difficulty: 'easy' as const,
        tags: ['biologie', 'photosynthèse']
      },
      {
        id: crypto.randomUUID(),
        question: "Quelles sont les deux phases principales de la photosynthèse ?",
        answer: "Les réactions photochimiques (phase claire) et le cycle de Calvin (phase sombre).",
        difficulty: 'medium' as const,
        tags: ['biologie', 'photosynthèse', 'phases']
      }
    ];

    const mockQuiz = {
      id: crypto.randomUUID(),
      title: "Quiz sur la photosynthèse",
      questions: [
        {
          id: crypto.randomUUID(),
          question: "Où se déroule principalement la photosynthèse ?",
          options: ["Dans les mitochondries", "Dans les chloroplastes", "Dans le noyau", "Dans les vacuoles"],
          correctAnswer: 1,
          explanation: "La photosynthèse se déroule principalement dans les chloroplastes des cellules végétales."
        }
      ]
    };

    if (currentProject) {
      updateProject(currentProject.id, {
        flashcards: [...currentProject.flashcards, ...mockFlashcards],
        quizzes: [...currentProject.quizzes, mockQuiz]
      });
      toast.success("Fiches et quiz générés avec succès !");
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-memento-navy">Transcription</h1>
        <div className="flex space-x-2">
          <Button
            onClick={handleSaveTranscription}
            disabled={!transcriptionText}
            className="bg-memento-teal hover:bg-memento-teal/90"
          >
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
          <Button
            onClick={generateContent}
            disabled={!transcriptionText}
            className="bg-memento-coral hover:bg-memento-coral/90"
          >
            Générer fiches & quiz
          </Button>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-6">
        {/* Audio Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-memento-navy">
              <Volume2 className="w-5 h-5 mr-2" />
              Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Glissez-déposez votre fichier audio ou cliquez pour sélectionner
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                Sélectionner un fichier
              </Button>
            </div>

            {/* Audio Player Simulation */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">audio-cours.mp3</span>
                <span className="text-sm text-gray-600">03:45 / 15:32</span>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={togglePlayPause}
                  className="w-10 h-10 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-memento-teal h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transcription Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-memento-navy">
              <Volume2 className="w-5 h-5 mr-2" />
              Transcription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="La transcription apparaîtra ici automatiquement après l'upload de votre fichier audio..."
              value={transcriptionText}
              onChange={(e) => setTranscriptionText(e.target.value)}
              className="min-h-[400px] resize-none font-mono text-sm leading-relaxed"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TranscriptionView;
