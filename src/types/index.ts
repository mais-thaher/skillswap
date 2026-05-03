// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface SkillExchange {
  id: string;
  giver: User;
  receiver: User;
  skillGiven: Skill;
  skillReceived: Skill;
  status: 'pending' | 'completed' | 'cancelled';
  date: Date;
}