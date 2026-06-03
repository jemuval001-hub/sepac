/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AlumniProfile {
  id: string;
  name: string;
  graduationYear: number;
  profession: string;
  location: string;
  testimony: string;
  avatarUrl: string;
  email?: string;
  linkedin?: string;
  createdAt: string;
  password?: string;
}

export interface CommunityPost {
  id: string;
  type: 'prayer' | 'testimony';
  authorName: string;
  authorYear: number;
  title: string;
  content: string;
  prayersCount: number;
  category: 'Thanksgiving' | 'Spiritual Growth' | 'Career Guide' | 'Family Support' | 'School Revitalization' | 'Encouragement';
  createdAt: string;
}

export interface SupportProject {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  category: 'Chapel Renovation' | 'Student Scholarship' | 'Library & Lab' | 'Spiritual Retreats';
}

export interface ScriptureVerse {
  reference: string;
  text: string;
  context: string;
}
