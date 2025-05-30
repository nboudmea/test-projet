
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";
import { Plus, FileAudio, Clock, Trash2, Settings, LogOut, Brain } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [newProjectName, setNewProjectName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const { projects, createProject, deleteProject, user, logout } = useAppStore();

  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      toast.error("Veuillez entrer un nom pour le projet");
      return;
    }
    
    createProject(newProjectName.trim());
    setNewProjectName("");
    setIsCreateDialogOpen(false);
    toast.success("Projet créé avec succès !");
  };

  const handleDeleteProject = (projectId: string, projectName: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${projectName}" ?`)) {
      deleteProject(projectId);
      toast.success("Projet supprimé");
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Déconnexion réussie");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-memento-coral rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-memento-navy">Memento</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Bonjour, {user?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/settings")}
                className="text-gray-600 hover:text-memento-navy"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-memento-navy mb-2">
            Vos projets d'apprentissage
          </h2>
          <p className="text-gray-600">
            Créez, gérez et explorez vos contenus éducatifs transformés par l'IA
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total projets</p>
                  <p className="text-2xl font-bold text-memento-navy">{projects.length}</p>
                </div>
                <FileAudio className="w-8 h-8 text-memento-teal" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Fiches créées</p>
                  <p className="text-2xl font-bold text-memento-navy">
                    {projects.reduce((sum, project) => sum + project.flashcards.length, 0)}
                  </p>
                </div>
                <Brain className="w-8 h-8 text-memento-orange" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Quiz complétés</p>
                  <p className="text-2xl font-bold text-memento-navy">
                    {projects.reduce((sum, project) => 
                      sum + project.quizzes.filter(q => q.completedAt).length, 0
                    )}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-memento-yellow" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-memento-navy">Mes projets</h3>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-memento-teal hover:bg-memento-teal/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau projet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un nouveau projet</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Nom du projet"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreateProject} className="bg-memento-teal hover:bg-memento-teal/90">
                    Créer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-12 text-center">
              <FileAudio className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun projet pour le moment
              </h3>
              <p className="text-gray-600 mb-6">
                Commencez par créer votre premier projet d'apprentissage
              </p>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-memento-teal hover:bg-memento-teal/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer mon premier projet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-memento-navy group-hover:text-memento-teal transition-colors">
                      {project.name}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project.id, project.name);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Fiches: {project.flashcards.length}</span>
                      <span>Quiz: {project.quizzes.length}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Créé le {formatDate(project.createdAt)}
                    </p>
                    <Button
                      onClick={() => navigate(`/workspace/${project.id}`)}
                      className="w-full bg-memento-navy hover:bg-memento-navy/90 text-white"
                    >
                      Ouvrir le projet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
