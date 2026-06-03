/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CommunityPost, AlumniProfile } from '../types';
import { Plus, Flame, Heart, MessageSquare, Sparkles, Send, Library, BookOpen, UserCheck, Eye, Lock } from 'lucide-react';

interface PrayerWallProps {
  posts: CommunityPost[];
  onAddPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'prayersCount'>) => void;
  onIncrementPrayers: (id: string) => void;
  currentUser: AlumniProfile | null;
  onOpenLogin: () => void;
}

export const CATEGORIES = [
  'Thanksgiving',
  'Spiritual Growth',
  'Career Guide',
  'Family Support',
  'School Revitalization',
  'Encouragement',
] as const;

export default function PrayerWall({ 
  posts, 
  onAddPost, 
  onIncrementPrayers,
  currentUser,
  onOpenLogin
}: PrayerWallProps) {
  const [filterType, setFilterType] = useState<'all' | 'prayer' | 'testimony'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [authorYear, setAuthorYear] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('Thanksgiving');
  const [itemType, setItemType] = useState<'prayer' | 'testimony'>('prayer');
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-populate author information if user is logged in
  useEffect(() => {
    if (currentUser) {
      setAuthorName(currentUser.name);
      setAuthorYear(String(currentUser.graduationYear));
    } else {
      setAuthorName('');
      setAuthorYear('');
    }
  }, [currentUser]);

  // Filtering posts
  const filteredPosts = posts.filter((post) => {
    const matchesType = filterType === 'all' || post.type === filterType;
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesType && matchesCategory;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (!currentUser) {
    return (
      <section className="space-y-8 animate-fade-in text-xs sm:text-sm">
        {/* Decorative Intro Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl p-6 border-l-4 border-amber-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 transform translate-x-12 -translate-y-12 select-none pointer-events-none text-amber-500/5 font-serif text-9xl">
            ✝
          </div>
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-700 tracking-wider text-xs uppercase">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              Galatians 6:2 — Share One Another’s Burdens
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Interactive Fellowship Prayer Wall & Testimonies</h2>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              This space is our digital chapel altar. Share the mighty work God is performing in your career, family, and spiritual devotion, or put forward your prayer requests.
            </p>
          </div>
        </div>

        {/* Lock Screen Panel */}
        <div className="max-w-md mx-auto bg-white border border-slate-150 rounded-2xl p-8 text-center shadow-lg space-y-6">
          <div className="mx-auto w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center border border-amber-200 text-amber-600 font-extrabold shadow-sm">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black text-slate-950 tracking-tight">Members-Only Fellowship Space</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              To respect the privacy of our graduates' prayer requests, personal family situations, and testimonies of faith, the active prayer wall is restricted.
            </p>
            <p className="text-blue-900/90 font-bold italic text-xs">
              "Where two or three gather in my name, there am I with them." — Matthew 18:20
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={onOpenLogin}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-extrabold rounded-lg shadow-sm transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign In with Alumnus Account ✝
            </button>
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
              Don't have an account or password? Register a new member profile in the <strong className="text-blue-900">Alumni Connection</strong> tab to get setup!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!authorName || !authorYear || !title || !content) {
      setErrorMsg('Kindly complete all questions so we can publish your post in the fellowship feed.');
      return;
    }

    const yearNum = parseInt(authorYear, 10);
    if (isNaN(yearNum) || yearNum < 1990 || yearNum > 2026) {
      setErrorMsg('Please enter a valid class year (1990 - 2026).');
      return;
    }

    onAddPost({
      type: itemType,
      authorName,
      authorYear: yearNum,
      title,
      content,
      category,
    });

    // Reset Form
    setAuthorName('');
    setAuthorYear('');
    setTitle('');
    setContent('');
    setIsFormOpen(false);
  };

  return (
    <section className="space-y-8 animate-fade-in text-xs sm:text-sm">
      {/* Decorative Intro Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl p-6 border-l-4 border-amber-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 transform translate-x-12 -translate-y-12 select-none pointer-events-none text-amber-500/5 font-serif text-9xl">
          ✝
        </div>
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-amber-700 tracking-wider text-xs uppercase">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            Galatians 6:2 — Share One Another’s Burdens
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Interactive Fellowship Prayer Wall & Testimonies</h2>
          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
            This space is our digital chapel altar. Share the mighty work God is performing in your career, family, and spiritual devotion, or put forward your prayer requests. Reach out to pray for outstanding requests using the <strong>"Amen / Praying 🕯"</strong> indicator.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg shadow-sm active:scale-95 transition-all text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Post Prayer / Testimony
            </button>
          </div>
        </div>
      </div>

      {/* Input submission board */}
      {isFormOpen && (
        <div className="bg-white border-2 border-amber-300 rounded-2xl p-5 sm:p-7 shadow-lg max-w-2xl mx-auto animate-slide-up relative">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
            Publish on the Fellowship board
          </h3>
          <p className="text-slate-500 text-xs mt-0.5">
            Feel free to post as Thanksgiving, Spiritual Growth direction, or prayer requests for current ES Saint Esprit issues.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {errorMsg}
              </div>
            )}

            <div className="flex bg-slate-100 p-1 rounded-lg w-full max-w-sm">
              <button
                type="button"
                onClick={() => setItemType('prayer')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                  itemType === 'prayer' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Prayer Request 🕯
              </button>
              <button
                type="button"
                onClick={() => setItemType('testimony')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                  itemType === 'testimony' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Praise Testimony 🌟
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Jean Habimana"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className={`w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${currentUser ? 'bg-slate-100 text-slate-500 select-none cursor-not-allowed border-dashed' : ''}`}
                  disabled={!!currentUser}
                  required
                />
                {currentUser && (
                  <span className="text-[10px] text-blue-900/80 font-semibold mt-1 block">✓ Autocompleted from active session</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ES Saint Esprit Class Year *</label>
                <input
                  type="number"
                  placeholder="e.g. 2012"
                  value={authorYear}
                  onChange={(e) => setAuthorYear(e.target.value)}
                  className={`w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${currentUser ? 'bg-slate-100 text-slate-500 select-none cursor-not-allowed border-dashed' : ''}`}
                  disabled={!!currentUser}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Header *</label>
                <input
                  type="text"
                  placeholder="e.g. Healing of family member"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Altar Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as typeof CATEGORIES[number])}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-700 bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message Content *</label>
              <textarea
                rows={4}
                placeholder={
                  itemType === 'prayer'
                    ? 'State your prayer point clearly, referencing how we can intercede for you or your local chapel fellowship...'
                    : 'Describe God’s marvelous work of answer, guidance, or salvation...'
                }
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg text-xs"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5 text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                Publish to Altar Feed
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Category Sorters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50 px-4 py-4 sm:p-5 rounded-xl border border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
              filterType === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Shared Posts
          </button>
          <button
            onClick={() => setFilterType('prayer')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
              filterType === 'prayer'
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-white text-amber-600 border-slate-200 hover:bg-amber-50/50'
            }`}
          >
            Prayer Requests 🕯
          </button>
          <button
            onClick={() => setFilterType('testimony')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
              filterType === 'testimony'
                ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                : 'bg-white text-blue-900 border-slate-200 hover:bg-blue-50/40'
            }`}
          >
            Testimonies 🌟
          </button>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Filter by Topic:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-48 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
          >
            <option value="all">Every Christian Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Feed Stream */}
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <p className="text-slate-400 font-medium">No prayer posts or testimonies matching this filter yet.</p>
          <button
            onClick={() => {
              setFilterType('all');
              setSelectedCategory('all');
            }}
            className="mt-2 text-blue-900 font-bold hover:underline text-xs"
          >
            Clear Search Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => {
            const isPrayer = post.type === 'prayer';
            return (
              <div
                key={post.id}
                className={`bg-white rounded-xl p-5 border shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative ${
                  isPrayer ? 'border-amber-100 hover:border-amber-300' : 'border-blue-50 hover:border-blue-200'
                }`}
              >
                <div>
                  {/* Badge & Category */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        isPrayer
                          ? 'bg-amber-100 text-amber-800 border border-amber-200/50'
                          : 'bg-blue-100 text-blue-800 border border-blue-200/50'
                      }`}
                    >
                      {isPrayer ? '🕯 Prayer Request' : '🌟 Praise Testimony'}
                    </span>

                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold font-mono">
                      {post.category}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2 leading-snug">
                    {post.title}
                  </h4>

                  <p className="text-slate-600 text-xs leading-relaxed italic line-clamp-6 mb-4 whitespace-pre-wrap">
                    "{post.content}"
                  </p>
                </div>

                {/* Author Credentials & "I am Praying" Interactions */}
                <div className="pt-3 border-t border-slate-50 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-50 text-blue-900 font-extrabold rounded-full flex items-center justify-center text-[10px] border border-blue-100 uppercase">
                      {post.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-xs leading-none">{post.authorName}</p>
                      <p className="text-[10px] text-slate-400 mt-1">Class of {post.authorYear}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onIncrementPrayers(post.id)}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all text-[10px] sm:text-xs relative active:scale-90 select-none ${
                      isPrayer
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-800'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-900'
                    }`}
                  >
                    {isPrayer ? (
                      <>
                        <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
                        <span>Amen, I Pray 🌲</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                        <span>Amen, Praise God 🙌🏼</span>
                      </>
                    )}
                    <span className="bg-white/80 px-1.5 py-0.5 rounded-md border text-[9px] font-black">
                      {post.prayersCount}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
