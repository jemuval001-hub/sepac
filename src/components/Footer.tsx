/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SepacLogo from './SepacLogo';
import { Flame, Shield, HeartHandshake, Award } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Core Corporate Branding */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-3">
              <SepacLogo size={52} showText={false} className="bg-white rounded-full p-0.5" />
              <div>
                <h4 className="font-extrabold text-white tracking-widest text-[15px] uppercase flex items-center gap-1">
                  SEPAC
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </h4>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Saint Esprit Protestant Alumni Community
                </p>
              </div>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An interactive spiritual platform connecting former students of Ecole Secondaire Saint Esprit Nyanza, nurturing ongoing Christian fellowship, professional integration, and alma mater development.
            </p>

            {/* Foundational Scripture Badge */}
            <div className="p-3 bg-white/5 border border-white/15 rounded-lg max-w-sm">
              <span className="block text-[8px] uppercase font-bold text-amber-500 tracking-widest mb-1">Foundational Scripture Address</span>
              <p className="text-[11px] text-slate-300 italic">
                "Let us consider how we may spur one another on toward love and good deeds... encouraging one another."
              </p>
              <span className="block text-[9px] font-bold text-slate-400 mt-1">— Hebrews 10:24-25</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-slate-200 uppercase text-xs tracking-wider">Community Directions</h5>
            <ul className="space-y-2 text-slate-400 font-semibold text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors">
                  Our Mission & Vision
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('directory')} className="hover:text-amber-400 transition-colors">
                  Alumni Connection Register
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('prayer-wall')} className="hover:text-amber-400 transition-colors">
                  Prayer Request & Testimonies
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('giving')} className="hover:text-amber-400 transition-colors">
                  Active Support Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Virtues */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-slate-200 uppercase text-xs tracking-wider">Our Core Virtues</h5>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                <span><strong>Unity</strong>: Together in Christ</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                <span><strong>Faith</strong>: Rooted in Protestant values</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                <span><strong>Fellowship</strong>: Carrying each other's burdens</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                <span><strong>Service</strong>: Shining our light globally</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright declaration block */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-[10px] text-slate-500 font-bold tracking-wider flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {currentYear} SEPAC (Saint Esprit Protestant Alumni Community). Together in Christ, Stronger in Purpose.
          </p>
          <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-slate-600">
            <span>Ecole Secondaire Saint Esprit Nyanza</span>
            <span>•</span>
            <span>Southern Province, Rwanda</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
