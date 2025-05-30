
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";
import { Plus, FileAudio, Clock, Trash2, Settings, LogOut, Brain, Search, Filter, Grid, List, MoreVertical } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [newProjectName, setNewProjectName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
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

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header noir */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-memento-teal to-memento-coral rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Memento</h1>
                <p className="text-sm text-gray-400">Tableau de bord</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-gray-300">
                <div className="w-8 h-8 bg-memento-teal/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{user?.name?.[0]}</span>
                </div>
                <span className="text-sm">Bonjour, {user?.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/settings")}
                className="text-gray-400 hover:text-white hover:bg-gray-900/50"
                aria-label="Paramètres"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                aria-label="Se déconnecter"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Section d'accueil */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-white mb-3">
            Vos projets d'apprentissage
          </h2>
          <p className="text-xl text-gray-400">
            Créez, gérez et explorez vos contenus éducatifs transformés par l'IA
          </p>
        </div>

        {/* Statistiques en noir */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total projets</p>
                  <p className="text-3xl font-bold text-white">{projects.length}</p>
                </div>
                <div className="w-12 h-12 bg-memento-teal/20 rounded-xl flex items-center justify-center">
                  <FileAudio className="w-6 h-6 text-memento-teal" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Fiches créées</p>
                  <p className="text-3xl font-bold text-white">
                    {projects.reduce((sum, project) => sum + project.flashcards.length, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-memento-orange/20 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-memento-orange" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Quiz complétés</p>
                  <p className="text-3xl font-bold text-white">
                    {projects.reduce((sum, project) => 
                      sum + project.quizzes.filter(q => q.completedAt).length, 0
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 bg-memento-yellow/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-memento-yellow" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre d'outils noire */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un projet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-800 text-white placeholder-gray-400 focus:border-memento-teal"
              />
            </div>
            <Button variant="outline" size="sm" className="border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-memento-teal text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-memento-teal text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-memento-teal to-memento-coral hover:from-memento-teal/80 hover:to-memento-coral/80 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau projet
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl">Créer un nouveau projet</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <Input
                    placeholder="Nom du projet"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                    className="bg-black border-gray-700 text-white placeholder-gray-400"
                  />
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      Annuler
                    </Button>
                    <Button onClick={handleCreateProject} className="bg-memento-teal hover:bg-memento-teal/80">
                      Créer
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Grille de projets noire */}
        {filteredProjects.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-700 bg-gray-900/30">
            <CardContent className="p-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-memento-teal/20 to-memento-coral/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileAudio className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-3">
                {searchQuery ? "Aucun projet trouvé" : "Aucun projet pour le moment"}
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {searchQuery 
                  ? "Essayez avec des mots-clés différents"
                  : "Commencez par créer votre premier projet d'apprentissage"
                }
              </p>
              {!searchQuery && (
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-gradient-to-r from-memento-teal to-memento-coral hover:from-memento-teal/80 hover:to-memento-coral/80 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Créer mon premier projet
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            {filteredProjects.map((project) => (
              <Card 
                key={project.id} 
                className="bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700 transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(`/workspace/${project.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-white group-hover:text-memento-teal transition-colors">
                      {project.name}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project.id, project.name);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Fiches: <span className="text-white font-medium">{project.flashcards.length}</span></span>
                      <span className="text-gray-400">Quiz: <span className="text-white font-medium">{project.quizzes.length}</span></span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Créé le {formatDate(project.createdAt)}
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/workspace/${project.id}`);
                      }}
                      className="w-full bg-gray-800 hover:bg-memento-teal text-white transition-colors"
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
