/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SepacLogo from './SepacLogo';
import { Menu, X, Flame, Heart, Sparkles, LogOut, User, LockOpen } from 'lucide-react';
import { AlumniProfile } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stats: {
    alumniCount: number;
    prayersCount: number;
    projectSupportPercent: number;
  };
  currentUser: AlumniProfile | null;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  stats, 
  currentUser, 
  onLogout, 
  onOpenLogin 
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Mission & Vision' },
    { id: 'directory', label: 'Alumni Connection' },
    { id: 'prayer-wall', label: 'Prayer & Testimony' },
    { id: 'giving', label: 'Alma Mater Support' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo & Brand Details */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => setActiveTab('home')}>
              <SepacLogo size={58} showText={false} />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold text-slate-950 tracking-wider">SEPAC</span>
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              </div>
              <p className="hidden md:block text-[10px] font-semibold text-slate-500 tracking-widest uppercase">
                Saint Esprit Protestant Alumni Community
              </p>
              <p className="block md:hidden text-[9px] font-semibold text-slate-400 tracking-wider">
                ES Saint Esprit Nyanza Alumni
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-900 shadow-sm border border-blue-100/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Quick Real-Time Faith & Session Metrics Bar */}
          <div className="hidden lg:flex items-center gap-6 border-l border-slate-100 pl-6 text-xs">
            <div className="text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Connected Graduates</span>
              <span className="text-sm font-bold text-blue-950 tracking-wide">{stats.alumniCount} alumni</span>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-3 bg-blue-50/70 p-1.5 rounded-xl border border-blue-100 transition-all pl-3">
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-black text-blue-900 leading-tight">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold block leading-none">
                    Class of {currentUser.graduationYear}
                  </span>
                </div>
                <img
                  src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full border border-amber-400 object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1 px-1.5 hover:bg-red-55 hover:text-red-700 text-slate-500 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold rounded-lg shadow-sm transition-all text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-900" />
                Sign In ✝
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-slate-100 absolute top-20 left-0 w-full px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-bold ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-900 border-l-4 border-amber-500'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              {item.label}
            </button>
          ))}
          {/* Mobile stats & Active Auth status */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-50 p-2.5 rounded-lg">
                <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Alumni Base</span>
                <span className="text-sm font-bold text-slate-900">{stats.alumniCount} Connected</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg">
                <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Intercessions</span>
                <span className="text-sm font-bold text-amber-600">{stats.prayersCount} Lifted</span>
              </div>
            </div>

            <div className="pt-2">
              {currentUser ? (
                <div className="flex items-center justify-between bg-blue-50/70 p-2.5 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full border border-amber-400 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="block text-xs font-bold text-slate-900 leading-tight">
                        {currentUser.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold block">
                        Class of {currentUser.graduationYear}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 font-bold rounded-lg shadow-sm transition-all text-sm flex items-center justify-center gap-1.5 cursor-pointer text-slate-950"
                >
                  <User className="w-4 h-4 text-slate-900" />
                  Resident Sign In ✝
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
