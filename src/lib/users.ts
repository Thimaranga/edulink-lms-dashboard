import "server-only";
import bcrypt from "bcryptjs";
import type { Role } from "@/lib/roles";

export type AccountRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  title: string;
  image?: string | null;
};

/**
 * Seed accounts. Swap the two exported functions below for Prisma/Drizzle
 * queries and nothing else in the auth layer needs to change.
 *
 * All demo passwords are "Password123!".
 */
const DEMO_HASH = "$2b$10$nArJTYhHXeZ7qNeiwLAhYuppYOv4CSDq24GK39RqkMm38Lb3jZKou";

const ACCOUNTS: AccountRecord[] = [
  {
    id: "usr_01",
    name: "Amara Okafor",
    email: "admin@edulink.io",
    passwordHash: DEMO_HASH,
    role: "admin",
    title: "Head of Learning Operations",
  },
  {
    id: "usr_02",
    name: "Daniel Reyes",
    email: "instructor@edulink.io",
    passwordHash: DEMO_HASH,
    role: "instructor",
    title: "Senior Instructor, Data Science",
  },
  {
    id: "usr_03",
    name: "Leila Hassan",
    email: "student@edulink.io",
    passwordHash: DEMO_HASH,
    role: "student",
    title: "Cohort 24 — Applied Analytics",
  },
];

export async function findAccountByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return ACCOUNTS.find((a) => a.email === normalized) ?? null;
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}
