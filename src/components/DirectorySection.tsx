/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlumniProfile } from '../types';
import { Search, UserPlus, MapPin, Briefcase, Mail, Linkedin, GraduationCap, Sparkles, Filter, ShieldCheck, Heart } from 'lucide-react';

interface DirectorySectionProps {
  alumniList: AlumniProfile[];
  onAddAlumni: (profile: Omit<AlumniProfile, 'id' | 'createdAt'>) => void;
}

export default function DirectorySection({ alumniList, onAddAlumni }: DirectorySectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGradYear, setSelectedGradYear] = useState<string>('all');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const [testimony, setTestimony] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filtering
  const filteredAlumni = alumniList.filter((alumnus) => {
    const matchesSearch =
      alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear =
      selectedGradYear === 'all' || alumnus.graduationYear.toString() === selectedGradYear;

    return matchesSearch && matchesYear;
  });

  // Extract all unique graduation years
  const uniqueYears = Array.from(new Set(alumniList.map((a) => a.graduationYear))).sort((a, b) => b - a);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name || !gradYear || !profession || !location || !testimony || !email || !password) {
      setErrorMsg('Please assist us by filling out all required fields marked with * (including email and password).');
      return;
    }

    const yearNum = parseInt(gradYear, 10);
    if (isNaN(yearNum) || yearNum < 1990 || yearNum > 2026) {
      setErrorMsg('Please enter a valid graduation year between 1990 and 2026.');
      return;
    }

    onAddAlumni({
      name,
      graduationYear: yearNum,
      profession,
      location,
      testimony,
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?auto=format&fit=crop&w=150&h=150&q=80`,
      email,
      linkedin: linkedin || undefined,
      password,
    });

    setSuccessMsg('Praise God! Your profile has been added to the fellowship registry successfully. You can now Sign In!');
    
    // Reset form
    setName('');
    setGradYear('');
    setProfession('');
    setLocation('');
    setTestimony('');
    setEmail('');
    setLinkedin('');
    setPassword('');

    setTimeout(() => {
      setIsRegisterOpen(false);
      setSuccessMsg('');
    }, 2500);
  };

  return (
    <section className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-10 shadow-lg text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-16 -mb-16" />

        <div className="relative max-w-2xl mx-auto space-y-4">
          <GraduationCap className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
          <h2 className="text-3xl font-extrabold tracking-tight">Alumni Registry & Connection</h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            "Though they have scattered into different places and professions, the bond forged on the hill of ES Saint Esprit Nyanza keeps us unified. Connect with fellow graduates, and inspire one another in service to the Lord."
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => setIsRegisterOpen(!isRegisterOpen)}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              Register Your Profile
            </button>
          </div>
        </div>
      </div>

      {/* Registration Form Panel */}
      {isRegisterOpen && (
        <div className="bg-white border-2 border-amber-300/60 rounded-2xl p-6 sm:p-8 shadow-md relative animate-slide-up max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
            Connect & Join SEPAC Directory
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            Ensure your email and LinkedIn values are up to date so your colleagues can easily communicate with you.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs sm:text-sm">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                {successMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Marie-Rose Niyomugabo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Graduation Year *</label>
                <input
                  type="number"
                  placeholder="e.g. 2014"
                  min="1990"
                  max="2026"
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Profession / Sector *</label>
                <input
                  type="text"
                  placeholder="e.g. High School Teacher, Medical Doctor"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Residence Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Kigali, Rwanda or Boston, USA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Christian Faith Journey & Alma Mater Memories *</label>
              <textarea
                rows={3}
                placeholder="Share how your Christian path grew during ES Saint Esprit Nyanza and what you are doing in ministry or work today..."
                value={testimony}
                onChange={(e) => setTestimony(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email *</label>
                <input
                  type="email"
                  placeholder="e.g. marierose@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Account Password *</label>
                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn URL (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. linkedin.com/in/marierose"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsRegisterOpen(false)}
                className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all text-xs"
              >
                Submit Profile Registration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Directory Searches and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-100">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search alumni by name, role, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <select
            value={selectedGradYear}
            onChange={(e) => setSelectedGradYear(e.target.value)}
            className="w-full sm:w-48 px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
          >
            <option value="all">All Graduation Years</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                Class of {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Profile Collections List */}
      {filteredAlumni.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-100">
          <p className="text-slate-500 text-lg">No alumni matched your current filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGradYear('all');
            }}
            className="mt-3 text-blue-900 hover:text-amber-600 font-bold transition-colors text-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAlumni.map((alumnus) => (
            <div
              key={alumnus.id}
              className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:border-amber-300 relative group"
            >
              <div className="absolute top-4 right-4 bg-blue-50 text-blue-900 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-100 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                Class of {alumnus.graduationYear}
              </div>

              <div>
                <div className="flex items-start gap-4">
                  <img
                    src={alumnus.avatarUrl}
                    alt={alumnus.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/75 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-900 transition-colors">
                      {alumnus.name}
                    </h4>
                    
                    <div className="flex items-center gap-1.5 text-slate-500 mt-1.5 text-xs">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-600">{alumnus.profession}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500 mt-1 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{alumnus.location}</span>
                    </div>
                  </div>
                </div>

                {/* Christian Testimony */}
                <div className="mt-4 p-3 bg-slate-50/70 border-l-2 border-amber-400 rounded-r-lg relative">
                  <span className="absolute -top-3 left-3 text-2xl text-amber-500 font-serif leading-none select-none">“</span>
                  <p className="text-slate-600 text-xs leading-relaxed italic pr-2">
                    {alumnus.testimony}
                  </p>
                </div>
              </div>

              {/* Social Channels / Actions */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[10px] text-slate-400">
                  Registered {new Date(alumnus.createdAt).toLocaleDateString()}
                </span>
                
                <div className="flex items-center gap-3">
                  {alumnus.email && (
                    <a
                      href={`mailto:${alumnus.email}`}
                      title={`Send email to ${alumnus.name}`}
                      className="p-1.5 bg-slate-50 hover:bg-slate-100 hover:text-blue-900 rounded-md transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {alumnus.linkedin && (
                    <a
                      href={`https://${alumnus.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn Profile"
                      className="p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-all"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
