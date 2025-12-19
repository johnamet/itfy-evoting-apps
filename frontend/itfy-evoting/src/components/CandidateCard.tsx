import React from 'react';

export default function CandidateCard() {
  return (
    <article className="border rounded p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div>
          <div className="font-medium">Candidate Name</div>
          <div className="text-sm text-gray-600">Affiliation / party</div>
        </div>
      </div>
    </article>
  );
}
