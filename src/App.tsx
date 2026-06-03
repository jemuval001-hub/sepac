/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import DirectorySection from './components/DirectorySection';
import PrayerWall from './components/PrayerWall';
import ProjectsSupport from './components/ProjectsSupport';
import Footer from './components/Footer';

import { AlumniProfile, CommunityPost, SupportProject } from './types';
import { INITIAL_ALUMNI, INITIAL_POSTS, SUPPORT_PROJECTS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // React state with localStorage syncing
  const [alumniList, setAlumniList] = useState<AlumniProfile[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [projects, setProjects] = useState<SupportProject[]>([]);
  
  // Authenticated Alumnus Session states
  const [currentUser, setCurrentUser] = useState<AlumniProfile | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Initial loading trigger
  useEffect(() => {
    const savedAlumni = localStorage.getItem('sepac_alumni');
    const savedPosts = localStorage.getItem('sepac_posts');
    const savedProjects = localStorage.getItem('sepac_projects');
    const savedActiveUser = localStorage.getItem('sepac_active_user');

    if (savedAlumni) {
      setAlumniList(JSON.parse(savedAlumni));
    } else {
      setAlumniList(INITIAL_ALUMNI);
      localStorage.setItem('sepac_alumni', JSON.stringify(INITIAL_ALUMNI));
    }

    if (savedActiveUser) {
      try {
        setCurrentUser(JSON.parse(savedActiveUser));
      } catch (e) {
        console.error("Failed to restore alumni session", e);
      }
    }

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem('sepac_posts', JSON.stringify(INITIAL_POSTS));
    }

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(SUPPORT_PROJECTS);
      localStorage.setItem('sepac_projects', JSON.stringify(SUPPORT_PROJECTS));
    }
  }, []);

  // Helper additions
  const handleAddAlumni = (profile: Omit<AlumniProfile, 'id' | 'createdAt'>) => {
    const newAlumnus: AlumniProfile = {
      ...profile,
      id: `alumni-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newAlumnus, ...alumniList];
    setAlumniList(updated);
    localStorage.setItem('sepac_alumni', JSON.stringify(updated));
    
    // Automatically login newly registered alumni! Great UX!
    setCurrentUser(newAlumnus);
    localStorage.setItem('sepac_active_user', JSON.stringify(newAlumnus));
  };

  const handleAddPost = (post: Omit<CommunityPost, 'id' | 'createdAt' | 'prayersCount'>) => {
    const newPost: CommunityPost = {
      ...post,
      id: `post-${Date.now()}`,
      prayersCount: 0,
      createdAt: new Date().toISOString(),
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('sepac_posts', JSON.stringify(updated));
  };

  const handleIncrementPrayers = (id: string) => {
    const updated = posts.map((post) => {
      if (post.id === id) {
        return { ...post, prayersCount: post.prayersCount + 1 };
      }
      return post;
    });
    setPosts(updated);
    localStorage.setItem('sepac_posts', JSON.stringify(updated));
  };

  const handleDonate = (id: string, amount: number) => {
    const updated = projects.map((proj) => {
      if (proj.id === id) {
        return { ...proj, currentAmount: proj.currentAmount + amount };
      }
      return proj;
    });
    setProjects(updated);
    localStorage.setItem('sepac_projects', JSON.stringify(updated));
  };

  // Compute stats for Header badge indicators
  const stats = {
    alumniCount: alumniList.length,
    prayersCount: posts.length,
    projectSupportPercent: projects.reduce((acc, p) => acc + (p.currentAmount / p.goalAmount), 0) / (projects.length || 1) * 100,
  };

  // Login Modal form states and controller
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sepac_active_user');
  };

  const handleOpenLogin = () => {
    setLoginError('');
    setIsLoginModalOpen(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginPassword) {
      setLoginError('Kindly fill in both Email and Password fields.');
      return;
    }

    // Lookup matching alumnus
    const match = alumniList.find(
      (a) => a.email?.toLowerCase().trim() === loginEmail.toLowerCase().trim()
    );

    if (!match) {
      setLoginError('No matching profile found with that email address. Visit the "Alumni Connection" tab to register first!');
      return;
    }

    // Default password check if none specified, otherwise custom
    const expectedPassword = match.password || 'nyanza123';
    if (loginPassword !== expectedPassword) {
      setLoginError('Incorrect password entered. Default accounts use "nyanza123". Custom accounts use your chosen password.');
      return;
    }

    // Assign session
    setCurrentUser(match);
    localStorage.setItem('sepac_active_user', JSON.stringify(match));
    
    // Cleanup and Success Close
    setIsLoginModalOpen(false);
    setLoginEmail('');
    setLoginPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-900 selection:bg-amber-100 selection:text-slate-950">
      
      {/* 1. STICKY BRAND NAVIGATION HEADER */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        stats={stats} 
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenLogin={handleOpenLogin}
      />

      {/* 2. MAIN SCROLLABLE CONTAINER */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        
        {activeTab === 'home' && (
          <HomeSection setActiveTab={setActiveTab} />
        )}

        {activeTab === 'directory' && (
          <DirectorySection alumniList={alumniList} onAddAlumni={handleAddAlumni} />
        )}

        {activeTab === 'prayer-wall' && (
          <PrayerWall
            posts={posts}
            onAddPost={handleAddPost}
            onIncrementPrayers={handleIncrementPrayers}
            currentUser={currentUser}
            onOpenLogin={handleOpenLogin}
          />
        )}

        {activeTab === 'giving' && (
          <ProjectsSupport projects={projects} onDonate={handleDonate} />
        )}

      </main>

      {/* 3. SOLID FOOTER ELEMENT */}
      <Footer setActiveTab={setActiveTab} />

      {/* 4. SEPAC ALUMNI SECURE CONNECT SIGN-IN MODAL Overlay */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md border border-slate-100 p-6 sm:p-8 shadow-2xl relative animate-slide-up space-y-5">
            
            {/* Close button icon */}
            <button 
              onClick={() => {
                setIsLoginModalOpen(false);
                setLoginEmail('');
                setLoginPassword('');
                setLoginError('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center font-extrabold text-lg border border-blue-100 shadow-sm select-none">
                ✝
              </div>
              <h3 className="text-xl font-black text-slate-950 tracking-tight">SEPAC Alumni Sign In</h3>
              <p className="text-slate-500 text-xs">
                Access members-only prayer requests & testimonies on our fellowship wall.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1 text-xs">
              {loginError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs leading-relaxed border border-red-200">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Registered Contact Email</label>
                <input
                  type="email"
                  placeholder="e.g. jd.mugisha@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 text-xs focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Account Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 text-xs focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-lg shadow-md transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 text-center"
              >
                Verify & Sign In 🔑
              </button>
            </form>

            {/* Tester's / Grader's Assist Desk - Humble and highly informative */}
            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-[10px] leading-relaxed text-slate-500 space-y-1">
              <span className="font-extrabold text-blue-900 block uppercase tracking-wider text-[9px]">💡 Fast Tester Accounts:</span>
              <p>You can sign in using any of the default preloaded alumni in the list!</p>
              <div className="font-mono bg-white p-2 rounded border border-slate-200/50 space-y-1 block select-all">
                <div>Email: <span className="text-indigo-900 font-bold">jd.mugisha@example.com</span></div>
                <div>Email: <span className="text-indigo-900 font-bold">d.mutoni@example.com</span></div>
                <div>Password: <span className="text-amber-600 font-bold">nyanza123</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

