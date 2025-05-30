
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Brain, HelpCircle, MessageSquare, Menu } from "lucide-react";
import TranscriptionView from "@/components/workspace/TranscriptionView";
import FlashcardsView from "@/components/workspace/FlashcardsView";
import QuizView from "@/components/workspace/QuizView";
import ChatView from "@/components/workspace/ChatView";
import { cn } from "@/lib/utils";

const Workspace = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const {
    projects,
    currentProject,
    setCurrentProject,
    currentView,
    setCurrentView,
    sidebarOpen,
    setSidebarOpen
  } = useAppStore();

  useEffect(() => {
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setCurrentProject(project);
      } else {
        navigate('/dashboard');
      }
    }
  }, [projectId, projects, setCurrentProject, navigate]);

  const navigationItems = [
    {
      id: 'transcription' as const,
      label: 'Transcription',
      icon: FileText,
      color: 'text-memento-teal'
    },
    {
      id: 'flashcards' as const,
      label: 'Fiches',
      icon: Brain,
      color: 'text-memento-orange'
    },
    {
      id: 'quiz' as const,
      label: 'Quiz',
      icon: HelpCircle,
      color: 'text-memento-yellow'
    },
    {
      id: 'chat' as const,
      label: 'Chat IA',
      icon: MessageSquare,
      color: 'text-memento-coral'
    }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'transcription':
        return <TranscriptionView />;
      case 'flashcards':
        return <FlashcardsView />;
      case 'quiz':
        return <QuizView />;
      case 'chat':
        return <ChatView />;
      default:
        return <TranscriptionView />;
    }
  };

  if (!currentProject) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center card-dark p-8 rounded-2xl">
          <p className="text-lg text-slate-300 mb-4">Projet non trouvé</p>
          <Button onClick={() => navigate('/dashboard')} className="bg-memento-teal hover:bg-memento-teal/80">
            Retour au dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container flex">
      {/* Sidebar avec le nouveau style */}
      <aside className={cn(
        "card-dark border-r border-slate-600/50 shadow-sm transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-memento-coral rounded flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-white">Memento</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-300 hover:text-white hover:bg-slate-700/50"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>

          {/* Project Info */}
          {sidebarOpen && (
            <div className="mb-6 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <h3 className="font-medium text-white text-sm mb-1">
                Projet actuel
              </h3>
              <p className="text-slate-300 text-sm truncate">
                {currentProject.name}
              </p>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  currentView === item.id
                    ? "bg-memento-teal text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50",
                  !sidebarOpen && "px-2"
                )}
                onClick={() => setCurrentView(item.id)}
              >
                <item.icon className={cn("w-4 h-4", sidebarOpen && "mr-3")} />
                {sidebarOpen && item.label}
              </Button>
            ))}
          </nav>

          {/* Back to Dashboard */}
          <div className="mt-8 pt-4 border-t border-slate-600/50">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700/50",
                !sidebarOpen && "px-2"
              )}
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className={cn("w-4 h-4", sidebarOpen && "mr-3")} />
              {sidebarOpen && "Dashboard"}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
};

export default Workspace;
