
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";
import { Plus, FileAudio, Clock, Trash2, Settings, LogOut, Brain, Search, BookOpen, Target, TrendingUp, ChevronRight, Star } from "lucide-react";
import { toast } from "sonner";

const DashboardAlternative = () => {
  const navigate = useNavigate();
  const [newProjectName, setNewProjectName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
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

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Déconnexion réussie");
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentProjects = filteredProjects.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation latérale minimaliste */}
      <div className="fixed left-0 top-0 h-full w-20 bg-black/20 backdrop-blur-xl border-r border-white/10 z-40 flex flex-col items-center py-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-8 shadow-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        
        <nav className="flex flex-col space-y-4 flex-1">
          <Button variant="ghost" size="sm" className="w-12 h-12 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl">
            <BookOpen className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="w-12 h-12 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl">
            <Target className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="w-12 h-12 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </Button>
        </nav>
        
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/settings")}
            className="w-12 h-12 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
            aria-label="Paramètres"
          >
            <Settings className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-12 h-12 p-0 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-xl"
            aria-label="Se déconnecter"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="pl-20">
        {/* Header simplifié */}
        <header className="p-8 pb-0">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Bonjour, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p className="text-lg text-white/60">
                Prêt à continuer votre apprentissage ?
              </p>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-2xl px-6 py-3 rounded-2xl text-lg font-medium">
                  <Plus className="w-5 h-5 mr-2" />
                  Nouveau projet
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl text-center">Créer un projet</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  <Input
                    placeholder="Nom de votre projet..."
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                    className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 text-center text-lg py-3"
                  />
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCreateDialogOpen(false)} 
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Annuler
                    </Button>
                    <Button 
                      onClick={handleCreateProject} 
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Créer
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main className="p-8 pt-4">
          {/* Statistiques en ligne */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileAudio className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{projects.length}</p>
                <p className="text-sm text-white/60">Projets</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {projects.reduce((sum, project) => sum + project.flashcards.length, 0)}
                </p>
                <p className="text-sm text-white/60">Fiches</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-amber-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {projects.reduce((sum, project) => sum + project.quizzes.length, 0)}
                </p>
                <p className="text-sm text-white/60">Quiz</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {projects.reduce((sum, project) => 
                    sum + project.quizzes.filter(q => q.completedAt).length, 0
                  )}
                </p>
                <p className="text-sm text-white/60">Complétés</p>
              </CardContent>
            </Card>
          </div>

          {/* Section projets récents et recherche */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projets récents */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Projets récents</h2>
                {projects.length > 3 && (
                  <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                    Voir tout
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
              
              {projects.length === 0 ? (
                <Card className="bg-white/5 backdrop-blur-sm border-2 border-dashed border-white/20">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FileAudio className="w-8 h-8 text-white/40" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      Votre premier projet vous attend
                    </h3>
                    <p className="text-white/60 mb-6">
                      Créez votre premier projet pour commencer à transformer votre audio en apprentissage
                    </p>
                    <Button 
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Créer mon premier projet
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <Card 
                      key={project.id} 
                      className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                      onClick={() => navigate(`/workspace/${project.id}`)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                              <FileAudio className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-white group-hover:text-purple-300 transition-colors">
                                {project.name}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-white/60">
                                <span>{project.flashcards.length} fiches</span>
                                <span>{project.quizzes.length} quiz</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProject(project.id, project.name);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Panneau latéral - Recherche et actions rapides */}
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Recherche rapide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                    <Input
                      placeholder="Chercher un projet..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-purple-400"
                    />
                  </div>
                  {searchQuery && (
                    <div className="mt-4 space-y-2">
                      {filteredProjects.slice(0, 3).map((project) => (
                        <div 
                          key={project.id}
                          onClick={() => navigate(`/workspace/${project.id}`)}
                          className="p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
                        >
                          <p className="text-white text-sm font-medium">{project.name}</p>
                          <p className="text-white/60 text-xs">
                            {project.flashcards.length} fiches · {project.quizzes.length} quiz
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Actions rapides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                    onClick={() => setIsCreateDialogOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-3" />
                    Nouveau projet
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <Search className="w-4 h-4 mr-3" />
                    Recherche avancée
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                    onClick={() => navigate("/settings")}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Préférences
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAlternative;
