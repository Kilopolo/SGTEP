// ----------------- NOTES -----------------
export interface Note {
  id?: string;       // Usamos directamente el de Mongo
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

// ----------------- USERS / AUTH -----------------
export interface User {
  id?: string;        // MongoDB _id
  username: string;
  email: string;
  password?: string;  // no siempre se enviará al frontend
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
