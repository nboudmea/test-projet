
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "@/store/useAppStore";
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const QuizView = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizMode, setQuizMode] = useState<'selection' | 'playing'>('selection');
  const [answers, setAnswers] = useState<number[]>([]);
  
  const { currentProject } = useAppStore();
  const quizzes = currentProject?.quizzes || [];
  const currentQuiz = quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];

  const handleStartQuiz = (quizIndex: number) => {
    setCurrentQuizIndex(quizIndex);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizMode('playing');
    setAnswers([]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);

      if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz terminé
        setQuizMode('selection');
        // Ici on pourrait calculer et sauvegarder le score
      }
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const calculateScore = (quizAnswers: number[], quiz: any) => {
    const correct = quizAnswers.reduce((score, answer, index) => {
      return score + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    return Math.round((correct / quiz.questions.length) * 100);
  };

  if (quizMode === 'playing' && currentQuiz && currentQuestion) {
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    
    return (
      <div className="h-full flex flex-col space-y-6">
        {/* Quiz Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-6 h-6 text-memento-yellow" />
            <div>
              <h1 className="text-2xl font-bold text-memento-navy">{currentQuiz.title}</h1>
              <p className="text-gray-600">
                Question {currentQuestionIndex + 1} sur {currentQuiz.questions.length}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setQuizMode('selection')}
          >
            Quitter le quiz
          </Button>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progression</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-xl text-memento-navy leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    "w-full text-left justify-start h-auto p-4 text-wrap",
                    selectedAnswer === index && "border-memento-yellow bg-memento-yellow/10",
                    showResult && index === currentQuestion.correctAnswer && "border-green-500 bg-green-50",
                    showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && "border-red-500 bg-red-50"
                  )}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className="flex items-center space-x-3">
                    <span className="font-medium text-sm">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span>{option}</span>
                    {showResult && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                    )}
                  </span>
                </Button>
              ))}
            </div>

            {/* Explanation */}
            {showResult && currentQuestion.explanation && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Explication</h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <div>
                {selectedAnswer !== null && !showResult && (
                  <Button
                    variant="outline"
                    onClick={handleShowResult}
                  >
                    Voir la réponse
                  </Button>
                )}
              </div>
              <div>
                {showResult && (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-memento-yellow hover:bg-memento-yellow/90 text-memento-navy"
                  >
                    {currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Question suivante' : 'Terminer le quiz'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <HelpCircle className="w-6 h-6 text-memento-yellow" />
          <h1 className="text-2xl font-bold text-memento-navy">Quiz interactifs</h1>
          <Badge variant="secondary" className="bg-memento-yellow/10 text-memento-yellow">
            {quizzes.length} quiz
          </Badge>
        </div>
        <Button className="bg-memento-yellow hover:bg-memento-yellow/90 text-memento-navy">
          Créer un quiz
        </Button>
      </div>

      {/* Content */}
      {quizzes.length === 0 ? (
        <Card className="flex-1 border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center h-full text-center p-12">
            <HelpCircle className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun quiz disponible
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Créez votre premier quiz à partir de votre transcription pour 
              tester vos connaissances de manière interactive.
            </p>
            <Button className="bg-memento-yellow hover:bg-memento-yellow/90 text-memento-navy">
              Générer un quiz
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
              {quizzes.map((quiz, index) => (
                <Card key={quiz.id} className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-memento-navy group-hover:text-memento-yellow transition-colors">
                        {quiz.title}
                      </CardTitle>
                      {quiz.completedAt && quiz.score !== undefined && (
                        <Badge 
                          className={cn(
                            quiz.score >= 80 ? "bg-green-100 text-green-800" :
                            quiz.score >= 60 ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          )}
                        >
                          {quiz.score}%
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{quiz.questions.length} questions</span>
                      <span>
                        {quiz.completedAt ? 
                          `Complété le ${new Date(quiz.completedAt).toLocaleDateString('fr-FR')}` :
                          'Non commencé'
                        }
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleStartQuiz(index)}
                        className="flex-1 bg-memento-yellow hover:bg-memento-yellow/90 text-memento-navy"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {quiz.completedAt ? 'Recommencer' : 'Commencer'}
                      </Button>
                      {quiz.completedAt && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizView;
