import axios from "axios";
import type { Note,  AuthResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL as string;

// ----------------- AUTH -----------------

export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json() as Promise<AuthResponse>;
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json() as Promise<AuthResponse>;
}

// ----------------- NOTES -----------------

export async function getNotes(): Promise<Note[]> {
  const { data } = await axios.get<Note[]>(`${API_URL}/notes`);
  return data;
}

export async function getNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`${API_URL}/notes/${id}`);
  return data;
}

export async function createNote(payload: {
  title: string;
  content: string;
}): Promise<Note> {
  const { data } = await axios.post<Note>(`${API_URL}/notes`, payload);
  return data;
}

export async function updateNote(
  id: string,
  payload: { title: string; content: string }
): Promise<Note> {
  const { data } = await axios.put<Note>(`${API_URL}/notes/${id}`, payload);
  return data;
}

export async function deleteNote(id: string): Promise<{ message: string }> {
  const { data } = await axios.delete<{ message: string }>(
    `${API_URL}/notes/${id}`
  );
  return data;
}
