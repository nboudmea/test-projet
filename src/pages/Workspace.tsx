
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Projet non trouvé</p>
          <Button onClick={() => navigate('/dashboard')}>
            Retour au dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r border-gray-200 shadow-sm transition-all duration-300",
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
                <span className="font-semibold text-memento-navy">Memento</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>

          {/* Project Info */}
          {sidebarOpen && (
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-memento-navy text-sm mb-1">
                Projet actuel
              </h3>
              <p className="text-gray-600 text-sm truncate">
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
                    ? "bg-memento-navy text-white"
                    : "text-gray-600 hover:text-memento-navy hover:bg-gray-100",
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
          <div className="mt-8 pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-600 hover:text-memento-navy hover:bg-gray-100",
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
