/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SupportProject } from '../types';
import { HeartHandshake, CheckCircle, ShieldCheck, DollarSign, Award, Sparkles, Send, Sparkle, Smile } from 'lucide-react';

interface ProjectsSupportProps {
  projects: SupportProject[];
  onDonate: (id: string, amount: number) => void;
}

export default function ProjectsSupport({ projects, onDonate }: ProjectsSupportProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [pledgeAmount, setPledgeAmount] = useState<string>('50');
  const [pledgeName, setPledgeName] = useState('');
  const [pledgeNote, setPledgeNote] = useState('');
  
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratedAmount, setCelebratedAmount] = useState(0);

  // Form contact states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [showContactSuccess, setShowContactSuccess] = useState(false);

  const activeProject = projects.find(p => p.id === selectedProjectId);

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(pledgeAmount);

    if (isNaN(amount) || amount <= 0) {
      alert('Kindly enter a valid donation pledge amount.');
      return;
    }

    onDonate(selectedProjectId, amount);
    setCelebratedAmount(amount);
    setShowCelebration(true);

    // Reset pledge
    setPledgeName('');
    setPledgeNote('');
    setPledgeAmount('50');

    setTimeout(() => {
      setShowCelebration(false);
    }, 4500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    setShowContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactMsg('');

    setTimeout(() => {
      setShowContactSuccess(false);
    }, 3500);
  };

  return (
    <section className="space-y-12 animate-fade-in text-xs sm:text-sm">
      {/* Dynamic Celebration Pop-up Banner */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-2 border-amber-400 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative animate-scale-up">
            <div className="mx-auto w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4 border border-amber-100 animate-spin-slow">
              <Sparkles className="w-8 h-8 fill-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-950">Praise the Lord for your Generosity!</h3>
            <p className="text-sm text-slate-600 mt-2">
              Your community support pledge of <strong className="text-emerald-600">${celebratedAmount}</strong> has been received. 
              The project's progress bar has been updated in real time. Thank you for blessing ES Saint Esprit Nyanza.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowCelebration(false)}
                className="px-6 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg text-xs"
              >
                Amen, keep serving
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <HeartHandshake className="w-12 h-12 text-blue-950 mx-auto" />
        <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Active Alumni Giving & School Revitalization Projects</h2>
        <p className="text-slate-500 leading-relaxed text-sm">
          "Do not forget to do good and to share with others, for with such sacrifices God is pleased." — Hebrews 13:16. 
          Through SEPAC, we coordinate direct, transparent financial sponsorships and volunteer labor to maintain our alma mater's high educational standards and spiritual campus.
        </p>
      </div>

      {/* Projects Grid Grid layout with progress bars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((proj) => {
          const percent = Math.min(Math.round((proj.currentAmount / proj.goalAmount) * 100), 100);
          return (
            <div
              key={proj.id}
              className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-900 rounded-full text-[9px] font-bold uppercase tracking-wider border border-blue-100/50">
                  {proj.category}
                </span>

                <h3 className="font-bold text-slate-900 text-lg leading-tight">
                  {proj.title}
                </h3>

                <p className="text-slate-500 text-xs leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {/* Math values */}
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Pledged: ${proj.currentAmount}</span>
                  <span className="text-amber-600">{percent}% of ${proj.goalAmount}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${percent}%` }}
                    className="h-full bg-gradient-to-r from-blue-900 to-amber-500 transition-all duration-1000"
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>{percent === 100 ? '🎉 Supported' : 'Still fundraising'}</span>
                  <span>Target: ES Saint Esprit Nyanza</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Donate/Pledge Interactive Panel */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 font-bold text-amber-600 tracking-wider text-xs uppercase">
            <Sparkle className="w-4 h-4 text-amber-500 fill-amber-500" />
            Active Sower's Pledging
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Sponsor a School Project Today
          </h3>
          <p className="text-slate-500 leading-relaxed text-xs sm:text-sm">
            Select an active campus improvement campaign. Specify your supportive contribution. 
            Your simulated pledge will instantly increase the live, client-held metrics, proving your active commitment to our school's Protestant spiritual foundation.
          </p>

          <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-xs">
            <p className="text-xs text-slate-500">
              "He who supplies seed to the sower and bread for food will also supply and increase your store of seed and will enlarge the harvest of your righteousness." — 2 Cor 9:10
            </p>
          </div>
        </div>

        {/* Pledge Form */}
        <form onSubmit={handlePledgeSubmit} className="bg-white p-6 rounded-xl border border-slate-200/50 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Choose Project to Champion *</label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-700 text-xs"
            >
              {projects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Name (or Anonymous)</label>
              <input
                type="text"
                placeholder="e.g. Christian Sower (Optional)"
                value={pledgeName}
                onChange={(e) => setPledgeName(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Support Contribution ($ USD) *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <DollarSign className="w-3.5 h-3.5" />
                </span>
                <input
                  type="number"
                  min="5"
                  max="10000"
                  value={pledgeAmount}
                  onChange={(e) => setPledgeAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Short Encouraging Note to Current Students</label>
            <input
              type="text"
              placeholder="e.g. Praying for your studies and chapel leadership! (Optional)"
              value={pledgeNote}
              onChange={(e) => setPledgeNote(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-slate-950 font-bold rounded-lg shadow-md transition-all text-xs flex items-center justify-center gap-1"
          >
            <HeartHandshake className="w-4 h-4 text-slate-950" />
            Submit Mock Giving Pledge
          </button>
        </form>
      </div>

      {/* Leadership Contact Panel */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-center relative">
          
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Reach the SEPAC Alumni Council</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Have proposals for regional reunions, recommendations on student fellowships at ES Saint Esprit Nyanza, or want to coordinate custom scholarships? Our leadership committee is ready to correspond with you.
            </p>
            <div className="text-xs text-slate-400 font-mono space-y-1 pt-1">
              <p>📍 Ecole Secondaire Saint Esprit, Nyanza, Southern Province</p>
              <p>✉️ council@sepac-nyanza.org</p>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="md:col-span-3 bg-white/10 p-6 rounded-xl border border-white/10 space-y-4 text-xs">
            {showContactSuccess && (
              <div className="p-3 bg-emerald-500/20 text-emerald-200 rounded-lg border border-emerald-500/30 flex items-center gap-2 font-semibold">
                <Smile className="w-5 h-5 text-emerald-400" />
                Thank you! Your suggestion has been channeled to the SEPAC Board. We will correspond via email.
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="Jean Pierre"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 text-white p-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="jp@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 text-white p-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Proposals or Suggestions</label>
              <textarea
                rows={3}
                placeholder="Suggest campus initiatives, prayer chains, or fellowship meetups..."
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 text-white p-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 rounded transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Send Council Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
