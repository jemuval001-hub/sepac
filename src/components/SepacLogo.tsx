/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SepacLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function SepacLogo({ className = '', size = 200, showText = true }: SepacLogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Dynamic SVG recreating the SEPAC circular emblem with precision */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md hover:scale-[1.02] transition-transform duration-300"
      >
        {/* Shadow Drop Effect */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFB15B" />
            <stop offset="50%" stopColor="#F9D98C" />
            <stop offset="100%" stopColor="#B3893C" />
          </linearGradient>
          <linearGradient id="navyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0B1330" />
          </linearGradient>
        </defs>

        {/* Outer Gold Boundary Circle */}
        <circle cx="250" cy="250" r="235" stroke="url(#goldGradient)" strokeWidth="6" />

        {/* Inner Navy Text Track Circle */}
        <circle cx="250" cy="250" r="225" stroke="#1E3A8A" strokeWidth="2" strokeDasharray="5,5" />
        <circle cx="250" cy="250" r="217" stroke="url(#goldGradient)" strokeWidth="3" />

        {/* Dynamic Curved Path for Top Text */}
        <path
          id="textPathTop"
          d="M 65 250 A 185 185 0 0 1 435 250"
          fill="none"
        />
        {/* Top Circular Text: SAINT ESPRIT PROTESTANT ALUMNI COMMUNITY */}
        <text className="font-sans font-bold text-[18px]" fill="#0B1330" letterSpacing="4">
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            SAINT ESPRIT PROTESTANT ALUMNI COMMUNITY
          </textPath>
        </text>

        {/* Outer Background of center core */}
        <circle cx="250" cy="250" r="175" fill="#FFFFFF" />
        <circle cx="250" cy="250" r="175" stroke="#1E3A8A" strokeWidth="2" />

        {/* --- CENTRAL SYMBOLIC GRAPHICS --- */}

        {/* Solar Rays/Sunburst behind the Cross */}
        <g opacity="0.45">
          <line x1="250" y1="210" x2="250" y2="70" stroke="#DFB15B" strokeWidth="2" />
          <line x1="250" y1="210" x2="350" y2="110" stroke="#DFB15B" strokeWidth="2" />
          <line x1="250" y1="210" x2="390" y2="210" stroke="#DFB15B" strokeWidth="2" />
          <line x1="250" y1="210" x2="350" y2="290" stroke="#DFB15B" strokeWidth="2" />
          <line x1="250" y1="210" x2="250" y2="330" stroke="#DFB15B" strokeWidth="2" />
          <line x1="250" y1="210" x2="150" y2="290" stroke="#DFB15B" strokeWidth="2" />
          <line x1="250" y1="210" x2="110" y2="210" stroke="#DFB15B" strokeWidth="2" />
          <line x1="250" y1="210" x2="150" y2="110" stroke="#DFB15B" strokeWidth="2" />

          {/* Micro Intermediate Rays */}
          <line x1="250" y1="210" x2="300" y2="90" stroke="#DFB15B" strokeWidth="1" />
          <line x1="250" y1="210" x2="380" y2="160" stroke="#DFB15B" strokeWidth="1" />
          <line x1="250" y1="210" x2="380" y2="260" stroke="#DFB15B" strokeWidth="1" />
          <line x1="250" y1="210" x2="300" y2="320" stroke="#DFB15B" strokeWidth="1" />
          <line x1="250" y1="210" x2="200" y2="320" stroke="#DFB15B" strokeWidth="1" />
          <line x1="250" y1="210" x2="120" y2="260" stroke="#DFB15B" strokeWidth="1" />
          <line x1="250" y1="210" x2="120" y2="160" stroke="#DFB15B" strokeWidth="1" />
          <line x1="250" y1="210" x2="200" y2="90" stroke="#DFB15B" strokeWidth="1" />
        </g>

        {/* Christian Holy Cross (Navy Blue) */}
        <path
          d="M 238 90 H 262 V 250 H 238 Z"
          fill="#1E3A8A"
        />
        <path
          d="M 210 125 H 290 V 145 H 210 Z"
          fill="#1E3A8A"
        />

        {/* Silhouettes of Four Alumni standing in fellowship, raising hands */}
        {/* Person 1 (Far Left) */}
        <g fill="#0B1330">
          <circle cx="165" cy="180" r="12" />
          <path d="M 165 195 C 150 210 135 200 125 210 C 135 220 145 235 155 255 L 175 255 Z" />
        </g>
        {/* Person 2 (Mid Left) */}
        <g fill="#0B1330">
          <circle cx="215" cy="180" r="12" />
          <path d="M 215 195 C 205 210 195 195 185 205 C 195 215 202 235 208 255 L 222 255 Z" />
        </g>
        {/* Person 3 (Mid Right) */}
        <g fill="#0B1330">
          <circle cx="285" cy="180" r="12" />
          <path d="M 285 195 C 295 210 305 195 315 205 C 305 215 298 235 292 255 L 278 255 Z" />
        </g>
        {/* Person 4 (Far Right) */}
        <g fill="#0B1330">
          <circle cx="335" cy="180" r="12" />
          <path d="M 335 195 C 350 210 365 200 375 210 C 365 220 355 235 345 255 L 325 255 Z" />
        </g>

        {/* Open Holy Bible in the Foreground */}
        <g id="bible">
          {/* Base shadow / spine */}
          <path d="M 250 245 C 250 245 250 280 250 282" stroke="#B3893C" strokeWidth="4" />
          <path d="M 250 282 L 254 295 L 250 295 L 246 295 Z" fill="#B3893C" />

          {/* Left Pages */}
          <path
            d="M 250 245 Q 210 235 140 250 V 278 Q 210 263 250 273 Z"
            fill="#FFFFFF"
            stroke="#1E3A8A"
            strokeWidth="3.5"
          />
          {/* Left Pages lines representing text */}
          <line x1="160" y1="256" x2="230" y2="252" stroke="#1E3A8A" strokeOpacity="0.45" strokeWidth="1.5" />
          <line x1="160" y1="262" x2="230" y2="258" stroke="#1E3A8A" strokeOpacity="0.45" strokeWidth="1.5" />
          <line x1="160" y1="268" x2="230" y2="264" stroke="#1E3A8A" strokeOpacity="0.45" strokeWidth="1.5" />

          {/* Right Pages */}
          <path
            d="M 250 245 Q 290 235 360 250 V 278 Q 290 263 250 273 Z"
            fill="#FFFFFF"
            stroke="#1E3A8A"
            strokeWidth="3.5"
          />
          {/* Right Pages lines representing text */}
          <line x1="270" y1="252" x2="340" y2="256" stroke="#1E3A8A" strokeOpacity="0.45" strokeWidth="1.5" />
          <line x1="270" y1="258" x2="340" y2="262" stroke="#1E3A8A" strokeOpacity="0.45" strokeWidth="1.5" />
          <line x1="270" y1="264" x2="340" y2="268" stroke="#1E3A8A" strokeOpacity="0.45" strokeWidth="1.5" />

          {/* Gold Bible Marker Ribbon hanging down */}
          <path d="M 248 272 V 292 L 252 288 L 256 292 V 272 Z" fill="#DFB15B" />
        </g>

        {/* Olive Branch (Left Side) */}
        <g id="olive-branch" stroke="url(#goldGradient)" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M 100 280 Q 80 230 110 180" />
          {/* Leaves */}
          <path d="M 87 252 Q 77 245 84 238 Q 94 245 87 252" fill="#B3893C" />
          <path d="M 94 225 Q 84 218 91 211 Q 101 218 94 225" fill="#B3893C" />
          <path d="M 104 200 Q 94 193 101 186 Q 111 193 104 200" fill="#B3893C" />
        </g>

        {/* Peace Dove (Right Side) */}
        <g id="peace-dove" fill="#B3893C">
          {/* Dove Body Vector */}
          <path
            d="M 370 240 C 375 235 385 220 395 225 C 405 230 408 245 390 255 C 375 263 365 260 360 255 L 358 244 L 364 242 Z"
            fill="url(#goldGradient)"
          />
          {/* Wings */}
          <path
            d="M 388 238 C 392 215 410 220 415 225 C 408 235 395 242 388 238 Z"
            fill="url(#goldGradient)"
          />
          {/* Tail */}
          <path
            d="M 360 255 C 352 263 348 270 348 275 C 355 272 361 264 360 255 Z"
            fill="url(#goldGradient)"
          />
          {/* Olive branch in mouth */}
          <path d="M 390 226 L 398 221" stroke="#1E3A8A" strokeWidth="1.5" />
          <circle cx="399" cy="220" r="2.5" fill="#DFB15B" />
        </g>

        {/* --- BRAND NAME & VALUES BOTTOM LAYOUT --- */}

        {/* SEPAC Logo Name */}
        <text
          x="250"
          y="350"
          textAnchor="middle"
          className="font-serif font-black text-[54px]"
          fill="#0B1330"
          letterSpacing="2"
        >
          SEPAC
        </text>

        {/* Dividers and Motto */}
        <line x1="120" y1="372" x2="380" y2="372" stroke="url(#goldGradient)" strokeWidth="2.5" />
        
        {/* Diamond bullet helpers */}
        <polygon points="120,372 124,368 128,372 124,376" fill="#1E3A8A" />
        <polygon points="380,372 376,368 372,372 376,376" fill="#1E3A8A" />

        <text
          x="250"
          y="390"
          textAnchor="middle"
          className="font-sans font-bold text-[12px]"
          fill="#1E3A8A"
          letterSpacing="2.5"
        >
          UNITY  •  FAITH  •  FELLOWSHIP  •  SERVICE
        </text>

        {/* Curved Path for Bottom Text (Scripture / Hebrews 10:24-25) */}
        <path
          id="textPathBottom"
          d="M 100 395 Q 250 490 400 395"
          fill="none"
        />

        <text className="font-sans font-bold text-[12px]" fill="#1E3A8A" letterSpacing="1.5">
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            HEB 10:24-25  —  TOGETHER IN CHRIST, STRONGER IN PURPOSE
          </textPath>
        </text>

        {/* Tiny Decorative Stars */}
        <g fill="url(#goldGradient)">
          {/* Star Top-Left */}
          <path d="M 120 160 L 123 163 L 126 160 L 123 157 Z" />
          {/* Star Top-Right */}
          <path d="M 380 160 L 383 163 L 386 160 L 383 157 Z" />
        </g>
      </svg>

      {/* Optional Beautiful Text Block Below Vector */}
      {showText && (
        <div className="mt-4">
          <p className="font-mono text-xs tracking-widest text-amber-600 font-bold uppercase">
            Ecole Secondaire Saint Esprit Nyanza Alumni
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="h-1 w-12 bg-gradient-to-r from-transparent to-amber-500 rounded-full" />
            <span className="text-sm font-semibold text-slate-900 tracking-wider">Est. 1996</span>
            <span className="h-1 w-12 bg-gradient-to-l from-transparent to-amber-500 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}
