export interface Question {
  id: number;
  text: string;
  categories: string[];
  axes: {
    economic: number;    // -1 (gauche) à +1 (droite)
    social: number;      // -1 (progressiste) à +1 (conservateur)  
    authority: number;   // -1 (libertaire) à +1 (autoritaire)
    environment: number; // -1 (écologie) à +1 (croissance)
  };
}

export interface Response {
  questionId: number;
  value: number; // 1-5 scale ou 0 pour "ne se prononce pas"
}

export interface PoliticalScore {
  economic: number;    // 0-100 (0=gauche, 100=droite)
  social: number;      // 0-100 (0=progressiste, 100=conservateur)
  authority: number;   // 0-100 (0=libertaire, 100=autoritaire)
  environment: number; // 0-100 (0=écologie, 100=croissance)
}

export interface Ideology {
  id: string;
  name: string;
  description: string;
  color: string;
  scoreRanges: {
    economic: [number, number];
    social: [number, number];
    authority: [number, number];
    environment: [number, number];
  };
}

export interface IdeologyMatch {
  ideology: Ideology;
  compatibility: number; // 0-100 pourcentage de compatibilité
  distance: number; // Distance euclidienne
}

export interface UserSession {
  responses: Response[];
  currentQuestion: number;
  isComplete: boolean;
  score?: PoliticalScore;
  bestMatches?: IdeologyMatch[];
  startedAt: Date;
  completedAt?: Date;
}

export interface QuestionnaireState {
  currentQuestionIndex: number;
  responses: number[]; // Array de réponses 0-5 indexées par position
  isComplete: boolean;
}

// Types pour les options de réponse
export type ResponseValue = 0 | 1 | 2 | 3 | 4 | 5;

export const RESPONSE_LABELS: Record<ResponseValue, string> = {
  0: "Ne se prononce pas",
  1: "Pas du tout d'accord",
  2: "Plutôt pas d'accord",
  3: "Mitigé",
  4: "Plutôt d'accord",
  5: "Totalement d'accord"
};

export const RESPONSE_COLORS: Record<ResponseValue, string> = {
  0: "bg-gray-200 hover:bg-gray-300",      // Ne se prononce pas
  1: "bg-red-600 hover:bg-red-700",        // Pas du tout d'accord
  2: "bg-red-400 hover:bg-red-500",        // Plutôt pas d'accord
  3: "bg-yellow-500 hover:bg-yellow-600",  // Mitigé
  4: "bg-green-500 hover:bg-green-600",    // Plutôt d'accord
  5: "bg-green-700 hover:bg-green-800"     // Totalement d'accord
};