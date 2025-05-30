
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Bell, Shield, Trash2, Brain } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAppStore();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Déconnexion réussie");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      logout();
      navigate("/");
      toast.success("Compte supprimé");
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <header className="card-dark border-b border-slate-600/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white hover:text-memento-teal hover:bg-slate-700/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="w-6 h-6 bg-memento-coral rounded flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Paramètres</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Profile Section */}
          <Card className="card-dark">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <User className="w-5 h-5" />
                <span>Profil utilisateur</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nom</Label>
                  <Input 
                    id="name" 
                    value={user?.name || ""} 
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={user?.email || ""} 
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
              </div>
              <Button className="bg-memento-teal hover:bg-memento-teal/90 text-white">
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="card-dark">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Notifications par email</p>
                    <p className="text-sm text-slate-300">
                      Recevoir des emails pour les nouveaux quiz et fiches
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700/50">
                    Activé
                  </Button>
                </div>
                <Separator className="bg-slate-600/50" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Rappels d'étude</p>
                    <p className="text-sm text-slate-300">
                      Rappels quotidiens pour réviser vos fiches
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700/50">
                    Désactivé
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="card-dark">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Shield className="w-5 h-5" />
                <span>Confidentialité et sécurité</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Partage des données d'apprentissage</p>
                    <p className="text-sm text-slate-300">
                      Permettre l'amélioration de l'IA avec vos données anonymisées
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700/50">
                    Activé
                  </Button>
                </div>
                <Separator className="bg-slate-600/50" />
                <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700/50">
                  Télécharger mes données
                </Button>
                <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700/50">
                  Modifier le mot de passe
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* IA Settings */}
          <Card className="card-dark">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Brain className="w-5 h-5" />
                <span>Paramètres IA</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="difficulty" className="text-white">Niveau de difficulté par défaut</Label>
                  <select className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-md text-white">
                    <option>Facile</option>
                    <option>Moyen</option>
                    <option>Difficile</option>
                    <option>Adaptatif</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="language" className="text-white">Langue de l'IA</Label>
                  <select className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-md text-white">
                    <option>Français</option>
                    <option>Anglais</option>
                    <option>Espagnol</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="card-dark border-red-500/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-400">
                <Trash2 className="w-5 h-5" />
                <span>Zone de danger</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-red-300">Supprimer le compte</p>
                  <p className="text-sm text-red-400 mb-3">
                    Cette action supprimera définitivement votre compte et toutes vos données.
                  </p>
                  <Button 
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Supprimer mon compte
                  </Button>
                </div>
                <Separator className="bg-slate-600/50" />
                <div>
                  <p className="font-medium text-white">Déconnexion</p>
                  <p className="text-sm text-slate-300 mb-3">
                    Se déconnecter de cette session.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={handleLogout}
                    className="border-slate-600 text-white hover:bg-slate-700/50"
                  >
                    Se déconnecter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
