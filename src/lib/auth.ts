// src/lib/auth.ts
export interface User {
  id: string;
  name: string;
  role?: "admin" | "user";
}

// Hardcoded demo user
export function getCurrentUser(): User | null {
  return {
    id: "demo-user-id", // this will be the ownerId for demo purposes
    name: "Demo User",
    role: "user", // can change to 'admin' to test admin privileges
  };
}
