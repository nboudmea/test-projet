
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  name: string;
  audioFile?: string;
  transcription?: string;
  flashcards: Flashcard[];
  quizzes: Quiz[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  score?: number;
  completedAt?: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AppState {
  // User state
  user: { id: string; name: string; email: string } | null;
  isAuthenticated: boolean;
  
  // Projects
  projects: Project[];
  currentProject: Project | null;
  
  // Chat
  chatMessages: ChatMessage[];
  
  // UI state
  sidebarOpen: boolean;
  currentView: 'transcription' | 'flashcards' | 'quiz' | 'chat';
  
  // Actions
  login: (user: { id: string; name: string; email: string }) => void;
  logout: () => void;
  createProject: (name: string) => void;
  setCurrentProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  addChatMessage: (content: string, sender: 'user' | 'ai') => void;
  clearChat: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCurrentView: (view: 'transcription' | 'flashcards' | 'quiz' | 'chat') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      projects: [],
      currentProject: null,
      chatMessages: [],
      sidebarOpen: true,
      currentView: 'transcription',
      
      // Actions
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, currentProject: null }),
      
      createProject: (name) => {
        const newProject: Project = {
          id: crypto.randomUUID(),
          name,
          flashcards: [],
          quizzes: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          projects: [...state.projects, newProject],
          currentProject: newProject,
        }));
      },
      
      setCurrentProject: (project) => set({ currentProject: project }),
      
      updateProject: (projectId, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId ? { ...p, ...updates, updatedAt: new Date() } : p
          ),
          currentProject:
            state.currentProject?.id === projectId
              ? { ...state.currentProject, ...updates, updatedAt: new Date() }
              : state.currentProject,
        }));
      },
      
      deleteProject: (projectId) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== projectId),
          currentProject:
            state.currentProject?.id === projectId ? null : state.currentProject,
        }));
      },
      
      addChatMessage: (content, sender) => {
        const message: ChatMessage = {
          id: crypto.randomUUID(),
          content,
          sender,
          timestamp: new Date(),
        };
        set((state) => ({
          chatMessages: [...state.chatMessages, message],
        }));
      },
      
      clearChat: () => set({ chatMessages: [] }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setCurrentView: (view) => set({ currentView: view }),
    }),
    {
      name: 'memento-storage',
    }
  )
);
