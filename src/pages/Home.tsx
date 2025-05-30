
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mic, FileText, Brain, MessageSquare } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      // Simulation d'un login simple
      login({
        id: "user-1",
        name: "Utilisateur Demo",
        email: "demo@memento.app"
      });
    }
    navigate("/dashboard");
  };

  const steps = [
    {
      icon: Mic,
      title: "Uploadez votre audio",
      description: "Importez vos enregistrements de cours, conférences ou podcasts",
      color: "bg-memento-teal"
    },
    {
      icon: FileText,
      title: "Transcription automatique",
      description: "Notre IA transcrit et structure votre contenu automatiquement",
      color: "bg-memento-orange"
    },
    {
      icon: Brain,
      title: "Fiches & Quiz générés",
      description: "Créez instantanément des fiches de révision et des quiz personnalisés",
      color: "bg-memento-yellow"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-memento-navy via-memento-teal to-memento-navy">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-memento-coral rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Memento</span>
          </div>
          {isAuthenticated && (
            <Button 
              onClick={() => navigate("/dashboard")}
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-memento-navy"
            >
              Dashboard
            </Button>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
            Transformez votre{" "}
            <span className="text-memento-yellow">audio</span> en{" "}
            <span className="text-memento-coral">apprentissage</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
            Memento révolutionne votre façon d'apprendre en convertissant vos enregistrements 
            audio en cours structurés, fiches de révision et quiz interactifs.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-memento-coral hover:bg-memento-coral/90 text-white text-lg px-8 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Commencer maintenant
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-white/70">
            Trois étapes simples pour révolutionner votre apprentissage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Une IA conversationnelle 
              <span className="text-memento-yellow"> à votre service</span>
            </h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Notre assistant IA comprend le contenu de vos cours et peut répondre 
              à vos questions, créer des résumés personnalisés et vous aider dans 
              vos révisions.
            </p>
            <div className="space-y-4">
              {[
                "Réponses contextuelles sur votre contenu",
                "Synthèses automatiques par chapitre",
                "Questions-réponses interactives",
                "Suggestions d'approfondissement"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-memento-coral rounded-full"></div>
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <Card className="bg-white/10 backdrop-blur border-white/20 p-6">
              <div className="flex items-start space-x-3 mb-4">
                <MessageSquare className="w-6 h-6 text-memento-coral mt-1" />
                <div className="flex-1">
                  <p className="text-white/90 bg-memento-teal/20 rounded-lg p-3">
                    Peux-tu m'expliquer le concept de photosynthèse abordé dans le cours ?
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-memento-coral rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/90 bg-white/10 rounded-lg p-3">
                    Bien sûr ! D'après votre cours, la photosynthèse est le processus...
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-white/20">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-memento-coral rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Memento</span>
          </div>
          <p className="text-white/60">
            Transformez votre façon d'apprendre avec l'IA
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
