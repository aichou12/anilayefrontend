/**
 * Modèle pour les utilisateurs
 */
export interface User {
    id: number;
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    role: 'ADMIN' | 'MAINTENANCIER';
    enabled: boolean;
  }