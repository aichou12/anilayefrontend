/**
 * Modèle pour les réponses d'authentification
 */
export interface AuthResponse {
    token: string;
    email: string;
    role: string;
  }