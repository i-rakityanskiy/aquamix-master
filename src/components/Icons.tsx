import React from 'react';

export const AquaIcon: React.FC = () => {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  )
};

export const LeafIcon: React.FC = () => {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Active Dark Line: The primary leaf structure and stem */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 21.5C12 21.5 12 18 12 15C12 12 10.5 9.5 8 7C5.5 4.5 4.5 2.5 4.5 2.5C4.5 2.5 6.5 3.5 9 6C11.5 8.5 12 11 12 14"
      />

      {/* Accent White Line: The smaller leaf and a vein detail */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="opacity-90"
        d="M13 13C13 13 15 11.5 17 11C19 10.5 20.5 11 20.5 11C20.5 11 19 12 18 14C17 16 15.5 16.5 13 16"
      />
    </svg>
  )
};
