/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SepacLogo from './SepacLogo';
import { ScriptureVerse } from '../types';
import { BIBLE_VERSES } from '../data';
import { Flame, Star, BookOpen, Compass, Award, Calendar, ChevronRight, Music, Volume2, Sparkles, Heart } from 'lucide-react';

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
}

export default function HomeSection({ setActiveTab }: HomeSectionProps) {
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number>(1996);
  const [playingHymn, setPlayingHymn] = useState<string | null>(null);

  const schoolHistory = [
    {
      year: 1996,
      title: 'Foundation by Protestant Missions',
      desc: 'Following the devastating events of 1994, Protestant church leaders established Ecole Secondaire Saint Esprit in Nyanza with a dual goal: rebuilding intellectual excellence and healing hearts through Christian education.'
    },
    {
      year: 2005,
      title: 'Chapel Expansion & Spiritual Revival',
      desc: 'The school built a dedicated sanctuary hall. The first official Scripture Union retreat took place, molding hundreds of students into active choir groups, praise ensembles, and prayer pillars.'
    },
    {
      year: 2014,
      title: 'Dawn of SEPAC Association',
      desc: 'Realizing their shared Christian values, the first generation of graduates convened in Kigali to establish the Saint Esprit Protestant Alumni Community (SEPAC), seeking to stay connected and support current candidates.'
    },
    {
      year: 2026,
      title: 'A Global Connected Brotherhood',
      desc: 'Today, SEPAC alumni work as leaders in medicine, software engineering, pastoral ministries, and public administration globally, carrying the "Saint Esprit Lamp of Integrity" wherever they go.'
    }
  ];

  const nostalgicHymns = [
    {
      title: 'Gusenga ni uguhura n’Imana',
      kannadaLabel: 'Prayer Is Meeting with God',
      lyrics: 'Gusenga ni uguhura n’Imana, tuyibwire ibyo mur’iyi si... (Prayer is connecting with God, bringing our earthly affairs before Him). The sweet anthem that echoed during evening chapel gatherings.',
      audioTone: 'sine'
    },
    {
      title: 'Nshuti nziza mu bigeragezo',
      kannadaLabel: 'A Friend in Times of Testing',
      lyrics: 'Yesu ni we nshuti y’ukuri, ntabwo ajya adutererana na hato... (Jesus is our true companion, He will never leave nor forsake us). Sung during exam candidate commissioning services.',
      audioTone: 'triangle'
    },
    {
      title: 'Oh, Umwuka Wera, Urusange',
      kannadaLabel: 'The Fellowship of the Holy Spirit',
      lyrics: 'Uzura imitima, utuzanire ubuyanja bw’ijuru... (Fill our hearts, bring us the refreshment of heaven). Dedicated specifically to the school’s namesake (Saint Esprit).',
      audioTone: 'sawtooth'
    }
  ];

  // Synthesis tone generator for a classic church organ simulation!
  const triggerHymnMidiSim = (hymnTitle: string, waveType: OscillatorType) => {
    if (playingHymn === hymnTitle) {
      setPlayingHymn(null);
      return;
    }

    setPlayingHymn(hymnTitle);

    // Simple nostalgic Web Audio single-channel note progressions (safe & isolated inside iframe)
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = waveType;
      osc.connect(gain);
      gain.connect(ctx.destination);

      // Play a quick 4-note spiritual arpeggio: C4 -> E4 -> G4 -> C5
      const notes = [261.63, 329.63, 392.00, 523.25];
      const noteTime = 0.35;

      notes.forEach((freq, idx) => {
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * noteTime);
      });

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + notes.length * noteTime);

      osc.start();
      osc.stop(ctx.currentTime + notes.length * noteTime);

      setTimeout(() => {
        setPlayingHymn(null);
      }, notes.length * noteTime * 1000);
    } catch (_) {
      // Gracefully capture constraints in restrictive environments
      setTimeout(() => setPlayingHymn(null), 1200);
    }
  };

  return (
    <section className="space-y-14 animate-fade-in text-xs sm:text-sm">
      
      {/* 1. HERO SECTION WITH SEPAC EMBLEM */}
      <div className="bg-gradient-to-b from-blue-50/55 to-white rounded-3xl p-6 sm:p-12 border border-blue-100/30 shadow-xs grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        
        <div className="lg:col-span-2 flex justify-center">
          <SepacLogo size={270} showText={true} />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-700 font-bold rounded-full text-[10px] tracking-widest uppercase">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            Together in Christ, Stronger in Purpose
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            Connect. Pray. Advance. 
            <span className="block text-blue-900 mt-1 font-serif">A Brotherhood of Faith & Integrity</span>
          </h1>

          <p className="text-slate-500 leading-relaxed text-xs sm:text-sm">
            Welcome to the digital home of the <strong>Saint Esprit Protestant Alumni Community (SEPAC)</strong>. 
            We connect graduates of <strong>Ecole Secondaire Saint Esprit Nyanza</strong> to lift daily intercessions, sponsor current students, check directories, and model biblical standards across global borders.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('directory')}
              className="px-6 py-2.5 bg-blue-900 hover:bg-blue-950 active:scale-95 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Search Alumni Directory
            </button>
            <button
              onClick={() => setActiveTab('prayer-wall')}
              className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 font-bold rounded-lg shadow-xs transition-all"
            >
              Interactive Prayer Wall
            </button>
          </div>
        </div>

      </div>

      {/* 2. MISSION & VISION BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-950 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Compass className="w-32 h-32" />
          </div>
          <div className="space-y-4">
            <div className="w-10 h-10 bg-white/10 text-amber-400 rounded-lg flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Our Divine Mission</h3>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm font-medium">
              "To gather the graduates of Ecole Secondaire Saint Esprit Nyanza into an active, prayer-driven alumni brotherhood that nurtures continuous spiritual growth, supports young graduates during their transition to profession, and pools resources to strengthen our alma mater's Protestant faith foundations."
            </p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Star className="w-32 h-32 fill-current" />
          </div>
          <div className="space-y-4">
            <div className="w-10 h-10 bg-slate-950/10 text-slate-950 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 fill-slate-950" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-950">Our Blessed Vision</h3>
            <p className="text-slate-900 leading-relaxed text-xs sm:text-sm font-semibold">
              "To see a vibrant, global network of alumni firmly anchored in Christ, manifesting exemplary spiritual stewardship and integrity in their various domains of leadership, and demonstrating active Christian giving that renews society and builds current students."
            </p>
          </div>
        </div>

      </div>

      {/* 3. INTERACTIVE BIBLE VERSE ROTATOR */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-10 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">Daily Fellowship Bread</span>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Faith-Rooted Anchors of SEPAC</h3>
          </div>
          <div className="flex gap-1.5">
            {BIBLE_VERSES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveVerseIndex(idx)}
                className={`w-6 h-6 rounded-md font-bold text-xs transition-all ${
                  activeVerseIndex === idx
                    ? 'bg-blue-905 bg-blue-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Active Scripture Verse Box */}
        <div className="mt-6 space-y-4 min-h-[140px] flex flex-col justify-between animate-fade-in" key={activeVerseIndex}>
          <div className="space-y-2">
            <p className="text-base sm:text-lg font-serif text-slate-800 leading-relaxed font-bold">
              "{BIBLE_VERSES[activeVerseIndex].text}"
            </p>
            <p className="text-xs text-amber-600 font-bold tracking-widest flex items-center gap-1.5 uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              {BIBLE_VERSES[activeVerseIndex].reference}
            </p>
          </div>
          
          <div className="p-3 bg-white border border-slate-100 rounded-lg text-slate-500 text-xs">
            <strong>SEPAC Reflection:</strong> {BIBLE_VERSES[activeVerseIndex].context}
          </div>
        </div>
      </div>

      {/* 4. CAMPUS TIMELINE & HISTORICAL DEVELOPMENT */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Award className="w-8 h-8 text-blue-900 mx-auto" strokeWidth={1.5} />
          <h3 className="text-2xl font-black text-slate-950 tracking-tight">Our Sacred Heritage: ES Saint Esprit</h3>
          <p className="text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm">
            Based in Nyanza, Ecole Secondaire Saint Esprit has nurtured thousands of graduates. Explore our history timeline:
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-xs flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Year Selectors */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 lg:w-48 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 pr-0 lg:pr-4">
            {schoolHistory.map((item) => (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`px-4 py-2.5 rounded-lg text-left font-bold text-xs whitespace-nowrap lg:whitespace-normal transition-all duration-200 border flex items-center justify-between ${
                  selectedYear === item.year
                    ? 'bg-blue-50 text-blue-900 border-blue-200 shadow-xs'
                    : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
                }`}
              >
                <span>Class Year {item.year}</span>
                <ChevronRight className={`hidden lg:block w-3.5 h-3.5 transition-transform ${selectedYear === item.year ? 'rotate-90 lg:rotate-0' : ''}`} />
              </button>
            ))}
          </div>

          {/* Timeline Details panel */}
          <div className="flex-1 flex flex-col justify-center bg-slate-50/50 p-6 rounded-lg border border-slate-100">
            {schoolHistory.map((item) => {
              if (item.year !== selectedYear) return null;
              return (
                <div key={item.year} className="space-y-4 animate-fade-in">
                  <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-black rounded text-[10px] tracking-widest font-mono">
                    HISTORIC MILESTONE • YEAR {item.year}
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-slate-950">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* 5. INTERACTIVE SCRIPTURE UNION MEMORIES (CHORUS RETRO ROOM) */}
      <div className="bg-gradient-to-r from-blue-900/5 to-amber-500/5 rounded-2xl p-6 sm:p-8 border border-slate-200/60">
        <div className="flex items-center gap-2 mb-4">
          <Music className="w-5 h-5 text-amber-600" />
          <h4 className="text-lg font-bold text-slate-950">Scripture Union Memory Corner</h4>
        </div>
        
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
          Do you remember standing in unison in the old chapel, singing those heart-stirring Protestant choruses under the stars? Click to trigger the <strong>synthetic organ simulation 🎹</strong> and relive the nostalgic verses below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nostalgicHymns.map((hymn, idx) => {
            const isPlaying = playingHymn === hymn.title;
            return (
              <div
                key={idx}
                className={`p-5 rounded-xl bg-white border shadow-xs flex flex-col justify-between hover:border-amber-300 transition-all ${
                  isPlaying ? 'border-amber-400 ring-4 ring-amber-400/10' : 'border-slate-100'
                }`}
              >
                <div>
                  <h5 className="font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors text-xs select-none">
                    {hymn.title}
                  </h5>
                  <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{hymn.kannadaLabel}</span>
                  
                  <p className="text-[11px] text-slate-600 mt-4 italic leading-relaxed bg-slate-50/50 p-2.5 rounded-md border-l-2 border-slate-200 font-mono select-none">
                    {hymn.lyrics}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex justify-end">
                  <button
                    onClick={() => triggerHymnMidiSim(hymn.title, hymn.audioTone as OscillatorType)}
                    className={`px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 font-bold text-[10px] transition-all relative ${
                      isPlaying
                        ? 'bg-amber-500 text-slate-950 animate-pulse'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-900'
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
                    <span>{isPlaying ? 'Synthesizing Organ Note...' : 'Relive Melody'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
