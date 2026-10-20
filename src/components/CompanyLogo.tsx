/**
 * Copyright 2026 LJ Global Service
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface CompanyLogoProps {
  className?: string;
  theme?: 'dark' | 'light';
  showTagline?: boolean;
  taglineText?: string;
  iconOnly?: boolean;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  className = 'h-10 w-auto',
  theme = 'dark',
  showTagline = true,
  taglineText = 'Your Reliable Partner',
  iconOnly = false,
}) => {
  // Theme colors matching official LJ Global Service branding
  const globalColor = theme === 'dark' ? '#00AEEF' : '#0B3C7B';
  const serviceColor = theme === 'dark' ? '#38BDF8' : '#0B3C7B';
  const taglineColor = theme === 'dark' ? '#CBD5E1' : '#1E293B';
  const lineStroke = theme === 'dark' ? '#00AEEF' : '#0B3C7B';

  if (iconOnly) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130 130"
        className={className}
        aria-label="LJ Global Service Icon"
      >
        <defs>
          <linearGradient id="globeGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066E5" />
            <stop offset="50%" stopColor="#003B96" />
            <stop offset="100%" stopColor="#001F5C" />
          </linearGradient>
          <linearGradient id="silverGradIcon" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#CBD5E1" />
            <stop offset="80%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="orbitShadowIcon" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <clipPath id="globeClipIcon">
            <circle cx="65" cy="62" r="46" />
          </clipPath>
          <filter id="logoShadowIcon" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#logoShadowIcon)">
          {/* Globe Circle */}
          <circle cx="65" cy="62" r="46" fill="url(#globeGradIcon)" />

          {/* Globe Grid Lines */}
          <g clipPath="url(#globeClipIcon)" stroke="#FFFFFF" fill="none">
            <path d="M 19,62 Q 65,70 111,62" strokeWidth="2" opacity="0.9" />
            <path d="M 25,38 Q 65,47 105,38" strokeWidth="1.6" opacity="0.8" />
            <path d="M 25,86 Q 65,77 105,86" strokeWidth="1.6" opacity="0.8" />
            <path d="M 36,22 Q 65,28 94,22" strokeWidth="1.2" opacity="0.7" />
            <path d="M 36,102 Q 65,96 94,102" strokeWidth="1.2" opacity="0.7" />
            {/* Longitudes */}
            <path d="M 65,16 C 61,38 61,86 65,108" strokeWidth="2" opacity="0.9" />
            <path d="M 41,20 C 26,40 26,84 41,104" strokeWidth="1.6" opacity="0.8" />
            <path d="M 89,20 C 104,40 104,84 89,104" strokeWidth="1.6" opacity="0.8" />
            <circle cx="65" cy="62" r="45" stroke="#60A5FA" strokeWidth="1" opacity="0.4" />
          </g>

          {/* Orbit Swoosh */}
          <path d="M 12,98 C 25,120 85,122 120,60 C 105,90 48,110 12,98 Z" fill="url(#orbitShadowIcon)" opacity="0.85" />
          <path d="M 10,90 C 22,114 86,116 122,46 C 114,58 98,80 65,92 C 38,101 18,96 10,90 Z" fill="url(#silverGradIcon)" />
          <path d="M 14,93 C 36,105 88,106 118,50" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.7" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={showTagline ? '0 0 520 130' : '0 0 520 105'}
      className={className}
      aria-label="LJ Global Service Logo"
    >
      <defs>
        {/* Globe Gradient */}
        <linearGradient id={`globeGrad-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066E5" />
          <stop offset="50%" stopColor="#003B96" />
          <stop offset="100%" stopColor="#001F5C" />
        </linearGradient>

        {/* Silver Metallic Orbit Gradients */}
        <linearGradient id={`silverGrad-${theme}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={theme === 'dark' ? '#FFFFFF' : '#64748B'} />
          <stop offset="40%" stopColor={theme === 'dark' ? '#CBD5E1' : '#475569'} />
          <stop offset="80%" stopColor={theme === 'dark' ? '#94A3B8' : '#334155'} />
          <stop offset="100%" stopColor={theme === 'dark' ? '#475569' : '#1E293B'} />
        </linearGradient>
        <linearGradient id={`orbitShadow-${theme}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* L and J Gradients */}
        <linearGradient id={`blueL-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme === 'dark' ? '#60A5FA' : '#738BA6'} />
          <stop offset="50%" stopColor={theme === 'dark' ? '#3B82F6' : '#4A6585'} />
          <stop offset="100%" stopColor={theme === 'dark' ? '#1D4ED8' : '#2D4361'} />
        </linearGradient>
        <linearGradient id={`silverJ-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme === 'dark' ? '#F8FAFC' : '#94A3B8'} />
          <stop offset="40%" stopColor={theme === 'dark' ? '#CBD5E1' : '#64748B'} />
          <stop offset="100%" stopColor={theme === 'dark' ? '#64748B' : '#334155'} />
        </linearGradient>

        {/* Clip Path for Globe Grid */}
        <clipPath id={`globeClip-${theme}`}>
          <circle cx="65" cy="60" r="46" />
        </clipPath>

        {/* Drop Shadow */}
        <filter id={`logoShadow-${theme}`} x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.2" />
        </filter>
      </defs>

      <g filter={`url(#logoShadow-${theme})`}>
        {/* ================= GLOBE ICON ================= */}
        <circle cx="65" cy="60" r="46" fill={`url(#globeGrad-${theme})`} />

        {/* Globe Grid Lines */}
        <g clipPath={`url(#globeClip-${theme})`} stroke="#FFFFFF" fill="none">
          <path d="M 19,60 Q 65,68 111,60" strokeWidth="2" opacity="0.9" />
          <path d="M 25,36 Q 65,45 105,36" strokeWidth="1.6" opacity="0.8" />
          <path d="M 25,84 Q 65,75 105,84" strokeWidth="1.6" opacity="0.8" />
          <path d="M 36,20 Q 65,26 94,20" strokeWidth="1.2" opacity="0.7" />
          <path d="M 36,100 Q 65,94 94,100" strokeWidth="1.2" opacity="0.7" />
          {/* Longitudes */}
          <path d="M 65,14 C 61,36 61,84 65,106" strokeWidth="2" opacity="0.9" />
          <path d="M 41,18 C 26,38 26,82 41,102" strokeWidth="1.6" opacity="0.8" />
          <path d="M 89,18 C 104,38 104,82 89,102" strokeWidth="1.6" opacity="0.8" />
          <circle cx="65" cy="60" r="45" stroke="#60A5FA" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Silver Orbit Swoosh Around Globe */}
        <path d="M 12,96 C 25,118 85,120 120,58 C 105,88 48,108 12,96 Z" fill={`url(#orbitShadow-${theme})`} opacity="0.85" />
        <path d="M 10,88 C 22,112 86,114 122,44 C 114,56 98,78 65,90 C 38,99 18,94 10,88 Z" fill={`url(#silverGrad-${theme})`} />
        <path d="M 14,91 C 36,103 88,104 118,48" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.7" />

        {/* ================= "LJ" MONOGRAM ================= */}
        {/* L Letter (Serif Metallic) */}
        <path d="M 140,24 L 158,24 L 158,28 L 151,28 L 151,82 L 174,82 L 174,76 L 180,76 L 180,87 L 140,87 L 140,83 L 147,83 L 147,28 L 140,28 Z" fill={`url(#blueL-${theme})`} />

        {/* J Letter (Serif Curved) */}
        <path d="M 182,24 L 204,24 L 204,28 L 195,28 L 195,78 C 195,93 180,101 163,99 C 154,98 148,94 146,90 L 151,86 C 153,89 159,92 165,92 C 178,92 186,87 186,76 L 186,28 L 182,28 Z" fill={`url(#silverJ-${theme})`} stroke={theme === 'dark' ? '#E2E8F0' : '#475569'} strokeWidth="0.5" />

        {/* ================= WORDMARK: GLOBAL SERVICE ================= */}
        {/* GLOBAL */}
        <text
          x="222"
          y="56"
          fontFamily="'Montserrat', 'Arial Black', 'Inter', sans-serif"
          fontSize="40"
          fontWeight="900"
          letterSpacing="1.8"
          fill={globalColor}
        >
          GLOBAL
        </text>
        {/* SERVICE */}
        <text
          x="222"
          y="90"
          fontFamily="'Montserrat', 'Arial Black', 'Inter', sans-serif"
          fontSize="37"
          fontWeight="900"
          letterSpacing="1.2"
          fill={serviceColor}
        >
          SERVICE
        </text>

        {/* ================= TAGLINE: Your Reliable Partner ================= */}
        {showTagline && (
          <g>
            <line x1="120" y1="112" x2="215" y2="112" stroke={lineStroke} strokeWidth="1.2" strokeOpacity="0.5" />
            <text
              x="315"
              y="116"
              textAnchor="middle"
              fontFamily="'Inter', 'Segoe UI', sans-serif"
              fontSize="13"
              fontWeight="700"
              letterSpacing="0.8"
              fill={taglineColor}
            >
              {taglineText}
            </text>
            <line x1="415" y1="112" x2="510" y2="112" stroke={lineStroke} strokeWidth="1.2" strokeOpacity="0.5" />
          </g>
        )}
      </g>
    </svg>
  );
};

