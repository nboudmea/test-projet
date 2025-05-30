
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-memento-navy"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="w-6 h-6 bg-memento-coral rounded flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-memento-navy">Paramètres</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-memento-navy">
                <User className="w-5 h-5" />
                <span>Profil utilisateur</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" value={user?.name || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email || ""} />
                </div>
              </div>
              <Button className="bg-memento-teal hover:bg-memento-teal/90">
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-memento-navy">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications par email</p>
                    <p className="text-sm text-gray-600">
                      Recevoir des emails pour les nouveaux quiz et fiches
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Activé
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rappels d'étude</p>
                    <p className="text-sm text-gray-600">
                      Rappels quotidiens pour réviser vos fiches
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Désactivé
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-memento-navy">
                <Shield className="w-5 h-5" />
                <span>Confidentialité et sécurité</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Partage des données d'apprentissage</p>
                    <p className="text-sm text-gray-600">
                      Permettre l'amélioration de l'IA avec vos données anonymisées
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Activé
                  </Button>
                </div>
                <Separator />
                <Button variant="outline" className="w-full">
                  Télécharger mes données
                </Button>
                <Button variant="outline" className="w-full">
                  Modifier le mot de passe
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* IA Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-memento-navy">
                <Brain className="w-5 h-5" />
                <span>Paramètres IA</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="difficulty">Niveau de difficulté par défaut</Label>
                  <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                    <option>Facile</option>
                    <option>Moyen</option>
                    <option>Difficile</option>
                    <option>Adaptatif</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="language">Langue de l'IA</Label>
                  <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                    <option>Français</option>
                    <option>Anglais</option>
                    <option>Espagnol</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <Trash2 className="w-5 h-5" />
                <span>Zone de danger</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-red-800">Supprimer le compte</p>
                  <p className="text-sm text-red-600 mb-3">
                    Cette action supprimera définitivement votre compte et toutes vos données.
                  </p>
                  <Button 
                    variant="destructive"
                    onClick={handleDeleteAccount}
                  >
                    Supprimer mon compte
                  </Button>
                </div>
                <Separator />
                <div>
                  <p className="font-medium text-gray-800">Déconnexion</p>
                  <p className="text-sm text-gray-600 mb-3">
                    Se déconnecter de cette session.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={handleLogout}
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
