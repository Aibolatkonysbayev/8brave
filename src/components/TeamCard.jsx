import React from 'react';

function getBasePath(){
  // CRA: process.env.PUBLIC_URL, Vite: import.meta.env.BASE_URL
  const publicUrl = typeof process !== 'undefined' && process.env && process.env.PUBLIC_URL;
  const baseUrl = (typeof import !== 'undefined' && typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : undefined;
  const raw = publicUrl || baseUrl || '/';
  return raw.replace(/\/$/, '') + '/';
}

export default function TeamCard(){ 
  const base = getBasePath();

  return (
    <div className="team-row">
      <div className="card">
        <img src={`${base}images/avatars/founder.jpg`} alt="Aibolat Konysbayev — Founder" className="avatar avatar-lg"/>
        <h4>Aibolat Konysbayev</h4>
        <p>Founder — 14 years in Oil & Gas</p>
      </div>
      <div className="card">
        <img src={`${base}images/avatars/armeta.png`} alt="Armeta AI — Strategic partner" className="avatar avatar-lg"/>
        <h4>Armeta AI</h4>
        <p>Strategic partner — adaptive testing & analytics</p>
      </div>
    </div>
  );
}