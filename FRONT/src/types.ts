// ----------------- NOTES -----------------
export interface Note {
  id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string; // <- nuevo
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
  message?: string;
}
