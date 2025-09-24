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

export const getNotes = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export async function getNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`${API_URL}/notes/${id}`);
  return data;
}

export const createNote = async (note: { title: string; content: string }) => {
  const token = localStorage.getItem("token");
  console.log("Enviando nota:", note, "con token:", token);

  const res = await axios.post(`${API_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

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
