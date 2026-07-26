import { useState, useEffect } from "react";
import { developmentProjects, uiuxProjects } from "../project";
import "./App.css";

// SVG Logos for Technical Skills
const skillLogos = {
  Python: (
    <svg className="w-6 h-6" viewBox="0 0 110 110" fill="currentColor">
      <path d="M52.3 2.1c-16.7 0-25.7 1.7-25.7 1.7s-10.4 1.7-10.4 9.1v9c0 4.1 3.5 7.6 7.6 7.6h17.3c1.7 0 3 1.3 3 3v8.5c0 1.7-1.3 3-3 3h-25c-4.1 0-8 3.3-8 8v16.7c0 4.1 3.2 7.7 7.7 7.7h6.6c1.7 0 3-1.3 3-3V68c0-3.3 2.7-6 6-6h23.5c3.3 0 6 2.7 6 6v14.4c0 3.3-2.7 6-6 6H39.4c-1.7 0-3 1.3-3 3v8.6c0 1.7 1.3 3 3 3h12.9c16.7 0 25.7-1.7 25.7-1.7s10.4-1.7 10.4-9.1v-9c0-4.1-3.5-7.6-7.6-7.6H63.5c-1.7 0-3-1.3-3-3v-8.5c0-1.7 1.3-3 3-3h25c4.1 0 8-3.3 8-8V39.4c0-4.1-3.2-7.7-7.7-7.7h-6.6c-1.7 0-3 1.3-3 3v14.7c0 3.3-2.7 6-6 6H49.7c-3.3 0-6-2.7-6-6V35c0-3.3 2.7-6 6-6h19.7c1.7 0 3-1.3 3-3v-8.6c0-1.7-1.3-3-3-3H52.3z" fill="#3776AB"/>
    </svg>
  ),
  JavaScript: (
    <svg className="w-6 h-6" viewBox="0 0 448 512" fill="currentColor">
      <path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 76.1-74.7 76.1-40 0-67.7-22.1-78.2-46.1l43.3-25.2c6.7 12.3 16.1 22.9 31.5 22.9 15 0 24.6-7.4 24.6-25v-197h53.5v194.3zm121.4-58.2c0 29.1-15.5 53.7-41.4 53.7-23.7 0-38.5-13.7-45.9-28.3l-43.1 25.2c13.7 25.6 41.5 49.6 89.2 49.6 62.1 0 94.7-38.5 94.7-88.5 0-81-67.2-100.9-113.2-120.5-27-11.5-47.4-20.1-47.4-44.3 0-19.6 15.3-31.3 37-31.3 21.5 0 34.9 9.3 41.6 23.7l41.6-24.7C370.4 82.6 348 64 307 64c-53.2 0-90.8 29.3-90.8 77.3 0 76.8 69.4 97.4 116.2 117.8 31.7 13.9 44.4 24.5 44.4 46.1z" fill="#F7DF1E"/>
    </svg>
  ),
  TypeScript: (
    <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor">
      <rect width="100" height="100" rx="8" fill="#3178C6"/>
      <path d="M35 70V30H45V38H35V70H35Z" fill="white"/>
      <path d="M50 48c0-8 6-12 14-12 6 0 11 3 13 8l-8 4c-1-2-3-3-5-3-3 0-5 2-5 5s2 5 5 5c2 0 4-1 5-3l8 4c-2 5-7 8-13 8-8 0-14-4-14-12z" fill="white"/>
    </svg>
  ),
  Java: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <path d="M6 1v3" />
      <path d="M10 1v3" />
      <path d="M14 1v3" />
    </svg>
  ),
  C: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 8a4 4 0 1 0 0 8" strokeLinecap="round" />
    </svg>
  ),
  React: (
    <svg className="w-6 h-6 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 10.42c-.08-.94-.65-1.83-1.57-2.39-1.28-.78-3.07-.94-5-.5l-1.39.37C14.71 6.55 13.43 5.34 12 5.34c-1.43 0-2.71 1.21-4.04 2.56l-1.39-.37c-1.93-.44-3.72-.28-5 .5-1 .56-1.5 1.45-1.57 2.39.08.94.65 1.83 1.57 2.39 1.28.78 3.07.94 5 .5l1.39-.37c1.33 1.35 2.61 2.56 4.04 2.56 1.43 0 2.71-1.21 4.04-2.56l1.39.37c1.93.44 3.72.28 5-.5 1-.56 1.5-1.45 1.57-2.39zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#61DAFB"/>
    </svg>
  ),
  HTML: (
    <svg className="w-6 h-6" viewBox="0 0 448 512" fill="currentColor">
      <path d="M0 32l36 396 188 52 188-52 36-396H0zm329 146H163l5 56h156l-14 156-90 25-90-25-6-68h48l3 36 45 13 45-13 7-76H120l-15-168h238l-14 146z" fill="#E34F26"/>
    </svg>
  ),
  CSS: (
    <svg className="w-6 h-6" viewBox="0 0 448 512" fill="currentColor">
      <path d="M0 32l36 396 188 52 188-52 36-396H0zm329 146H123l12 134h182l-12 134-89 25-90-25-6-68h48l3 36 45 13 45-13 7-76H120l-15-168h238l-14 146z" fill="#1572B6"/>
    </svg>
  ),
  "Tailwind CSS": (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
    </svg>
  ),
  Figma: (
    <svg className="w-6 h-6" viewBox="0 0 384 512" fill="currentColor">
      <path d="M96 0c53 0 96 43 96 96v96H96c-53 0-96-43-96-96S43 0 96 0zm96 192v128c0 53-43 96-96 96s-96-43-96-96 43-96 96-96h96zm0 0c53 0 96 43 96 96s-43 96-96 96v-192zm0-96c0-53 43-96 96-96s96 43 96 96-43 96-96 96h-96V96zm192 192c0 53-43 96-96 96V192h96c53 0 96 43 96 96z" fill="#F24E1E"/>
    </svg>
  ),
  "Node.js": (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "REST APIs": (
    <svg className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  SQL: (
    <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  Wav2Vec2: (
    <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 10v4M6 6v12M10 3v18M14 8v8M18 5v14M22 10v4" strokeLinecap="round" />
    </svg>
  ),
  "Audio Processing": (
    <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  GenAI: (
    <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  GitHub: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Git: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.384 11.232L12.768.616c-.822-.821-2.155-.821-2.977 0L8.718 1.69a.442.442 0 000 .624l1.094 1.094a1.866 1.866 0 012.976 0l4.248 4.248a1.866 1.866 0 010 2.976l-1.094 1.094a.442.442 0 000 .624l5.352 5.352c.821.821.821 2.155 0 2.976l-2.072 2.072c-.821.821-2.155.821-2.976 0l-5.352-5.352a.442.442 0 00-.624 0l-1.094 1.094a1.866 1.866 0 01-2.976 0L1.69 15.282a2.105 2.105 0 010-2.976l1.074-1.074a.442.442 0 000-.624l1.094-1.094a1.866 1.866 0 012.976 0l1.094 1.094a.442.442 0 00.624 0l1.094-1.094a1.866 1.866 0 010-2.976L8.58.616c-.822-.821-2.155-.821-2.976 0L.616 5.604c-.821.822-.821 2.155 0 2.977l10.616 10.616c.821.821 2.155.821 2.976 0l2.072-2.072c.821-.821.821-2.155 0-2.976l-1.094-1.094a.442.442 0 000-.624l1.094-1.094c.821-.821 2.155-.821 2.976 0l5.352 5.352c.821.821 2.155.821 2.976 0l2.072-2.072c.821-.821.821-2.155 0-2.976l-5.352-5.352a.442.442 0 00-.624 0z" fill="#F05032"/>
    </svg>
  ),
  "VS Code": (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.985 6.809l-3.364-1.562a1.002 1.002 0 0 0-1.095.148l-8.083 7.027-4.148-3.151-5.69 2.766a.5.5 0 0 0-.012.879l4.242 2.378-4.225 2.399a.5.5 0 0 0 .012.879l5.69 2.766 4.148-3.151 8.083 7.027c.294.256.721.31 1.074.137l3.385-1.572a1.003 1.003 0 0 0 .594-.916V7.725a1.004 1.004 0 0 0-.594-.916zM17.439 12l-4.116-3.127 1.83-1.591L17.439 12z" fill="#007ACC"/>
    </svg>
  ),
  AWS: (
    <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.9 16.4c-1.3 1-3.2 1.6-5 1.6-2.9 0-5.3-1.6-5.3-4.8 0-4 3.3-5.3 7.7-5.3.8 0 1.7.1 2.5.2v.6c0 2.2-.5 4.3-1.7 5.9-1.2 1.5-2.2 1.8-3.2 1.8 1.5 1 3.5.7 5-1.2l.4 1.2zm-2.5-6.7c-2.4 0-4 .5-4 2.4 0 1.2.8 2 2.2 2 1.8 0 2.8-1.3 2.8-3.5v-.9h-1zm9 8.2c-.4.5-1 1-1.7 1-.9 0-1.4-.7-1.4-1.7V8.5c0-1.2-.8-1.9-2.3-1.9-1.3 0-2.3.7-2.9 1.6l.8.8c.4-.6 1-.9 1.7-.9.7 0 1 .4 1 1.1v.6c-.6-.2-1.3-.3-2.1-.3-2.8 0-4.6 1.4-4.6 3.9 0 2.1 1.3 3.3 3.1 3.3 1.5 0 2.6-.9 3.1-1.9v1.6c0 1.9.9 2.9 2.7 2.9.9 0 1.9-.3 2.5-1l-.9-1z" fill="#FF9900"/>
    </svg>
  ),
  Linux: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-6.477 10-10S17.523 2 12 2zm1 14.5h-2v-2h2v2zm0-4.5h-2V7h2v5z" fill="#FCC624"/>
    </svg>
  ),
  Docker: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119c.102 0 .186-.084.186-.186V8.774c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.118c0 .102.084.186.186.186zm-2.93 0h2.118c.102 0 .185-.084.185-.186V8.774c0-.102-.083-.186-.185-.186h-2.119c-.101 0-.185.084-.185.186v2.118c0 .102.084.186.185.186zm-2.93 0h2.12c.101 0 .185-.084.185-.186V8.774c0-.102-.084-.186-.185-.186h-2.12c-.101 0-.185.084-.185.186v2.118c0 .102.084.186.185.186zm-2.929 0h2.119c.102 0 .185-.084.185-.186V8.774c0-.102-.083-.186-.185-.186H5.204c-.102 0-.185.084-.185.186v2.118c0 .102.083.186.185.186zm5.859-2.93h2.118c.102 0 .185-.083.185-.185V5.844c0-.101-.083-.185-.185-.185h-2.119c-.101 0-.185.084-.185.185v2.118c0 .102.084.186.185.186zm-2.93 0h2.12c.101 0 .185-.083.185-.185V5.844c0-.101-.084-.185-.185-.185h-2.12c-.101 0-.185.084-.185.185v2.118c0 .102.084.186.185.186zm-2.93 0h2.119c.102 0 .185-.083.185-.185V5.844c0-.101-.083-.185-.185-.185H5.204c-.102 0-.185.084-.185.185v2.118c0 .102.083.186.185.186zm5.859-2.929h2.118c.102 0 .185-.083.185-.185V2.916c0-.102-.083-.185-.185-.185h-2.119c-.101 0-.185.083-.185.185v2.119c0 .102.084.185.185.185zm2.93 5.858h2.119c.102 0 .186-.083.186-.185V8.774c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .101.084.185.186.185zM22.56 14.22c-.224-.527-.814-.85-1.464-.85h-2.316a.186.186 0 00-.186.186 6.94 6.94 0 01-6.93 6.93 6.94 6.94 0 01-6.93-6.93.186.186 0 00-.186-.186H1.9a1.597 1.597 0 00-1.48 2.203c.535 1.348 1.488 2.49 2.76 3.298C5.074 20.316 7.426 21 10.024 21c6.51 0 11.236-4.148 12.536-6.78z" fill="#2496ED"/>
    </svg>
  )
};

const SkillCategory = ({ title, skills, isDark }) => (
  <div className="space-y-3">
    <h4 className={`text-md font-bold uppercase tracking-wider ${isDark ? "text-purple-400" : "text-purple-700"}`}>
      {title}
    </h4>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, index) => (
        <div
          key={index}
          className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl border transition-all duration-300 shadow-sm ${
            isDark
              ? "bg-zinc-900/60 border-zinc-800 text-zinc-100 hover:border-purple-500/50 hover:bg-zinc-900"
              : "bg-white border-purple-100 text-zinc-800 hover:border-purple-500 hover:bg-purple-50"
          }`}
        >
          {skillLogos[skill] || (
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          )}
          <span className="text-sm font-bold">{skill}</span>
        </div>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ project, isExpanded, setIsExpanded, isDark }) => (
  <div className={`rounded-2xl border flex flex-col h-full transition-all duration-300 ${
    isDark 
      ? "border-zinc-800 bg-zinc-900/70 text-white shadow-none" 
      : "border-purple-200 bg-white text-zinc-900 shadow-md hover:shadow-lg"
  }`}>
    <div className="flex flex-col space-y-1.5 p-6">
      <h3 className={`text-2xl font-bold leading-none tracking-wide flex items-center ${isDark ? "text-white" : "text-zinc-900"}`}>
        <span className="mr-2">{project.title}</span>
        {project.status && (
          <div
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border-transparent text-white ${
              project.status === "Completed"
                ? "bg-emerald-600"
                : "bg-rose-700"
            }`}
          >
            {project.status}
          </div>
        )}
      </h3>
    </div>
    <div className="p-6 pt-0 flex-grow">
      <div className="overflow-hidden">
        <p className={`font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
          {project.description}
        </p>
        {project.description.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`mt-2 text-sm font-bold hover:underline ${isDark ? "text-purple-400" : "text-purple-700"}`}
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
    <div className="p-6 pt-0 flex items-center justify-end flex-wrap gap-3 mt-auto">
      {project.extraLinks && project.extraLinks.map((link, i) => (
        <a
          key={i}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all h-9 px-4 shadow-sm border ${
            isDark 
              ? "bg-zinc-800 text-purple-300 border-zinc-700 hover:bg-purple-600 hover:text-white" 
              : "bg-purple-100 text-purple-900 border-purple-200 hover:bg-purple-600 hover:text-white"
          }`}
          href={link.url}
        >
          {link.label}
        </a>
      ))}
      {project.figmaLink && (
        <a
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all h-9 px-4 shadow-sm border ${
            isDark 
              ? "bg-zinc-800 text-purple-300 border-zinc-700 hover:bg-purple-600 hover:text-white" 
              : "bg-purple-100 text-purple-900 border-purple-200 hover:bg-purple-600 hover:text-white"
          }`}
          href={project.figmaLink}
        >
          Figma
        </a>
      )}
      {project.liveLink && (
        <a
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all h-9 px-4 shadow-sm border ${
            isDark 
              ? "bg-zinc-800 text-purple-300 border-zinc-700 hover:bg-purple-600 hover:text-white" 
              : "bg-purple-100 text-purple-900 border-purple-200 hover:bg-purple-600 hover:text-white"
          }`}
          href={project.liveLink}
        >
          Live
        </a>
      )}
      {project.codeLink && (
        <a
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all h-9 px-4 shadow-sm ${
            isDark 
              ? "bg-white text-zinc-900 hover:bg-purple-400" 
              : "bg-zinc-900 text-white hover:bg-purple-700"
          }`}
          href={project.codeLink}
        >
          <svg viewBox="0 0 438.549 438.549" className="mr-2 h-4 w-4 fill-current">
            <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
          </svg>
          Code
        </a>
      )}
    </div>
  </div>
);

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [expandedStates, setExpandedStates] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isDark = theme === "dark";

  useEffect(() => {
    // Entrance Loader Timeout (2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const toggleExpanded = (index, type) => {
    setExpandedStates(prev => ({
      ...prev,
      [`${type}-${index}`]: !prev[`${type}-${index}`]
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:rahulmhugar@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  if (isLoading) {
    return (
      <div className={`loader-container ${isDark ? "bg-custom-dark" : "bg-custom-light"}`}>
        <div className="threed-spin text-center select-none font-black tracking-tighter">
          RH
        </div>
        <div className="mt-6 text-sm font-semibold tracking-widest uppercase shimmer-text">
          Loading Portfolio
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDark ? "dark bg-custom-dark text-white" : "bg-custom-light text-zinc-900"} min-h-screen transition-colors duration-300 px-4 sm:px-6`}>
      {/* Floating Header */}
      <header className="sticky top-4 z-50 max-w-4xl mx-auto mb-12">
        <div className={`backdrop-blur-md rounded-2xl border px-6 py-3 shadow-lg flex items-center justify-between transition-all duration-300 ${
          isDark 
            ? "bg-zinc-950/85 border-zinc-800/80 shadow-purple-500/10" 
            : "bg-white/95 border-purple-200/80 shadow-purple-500/5"
        }`}>
          <div className="flex items-center space-x-3">
            <span className={`text-xl font-extrabold tracking-wider bg-gradient-to-r bg-clip-text text-transparent ${
              isDark ? "from-blue-400 to-purple-400" : "from-blue-600 to-purple-600"
            }`}>
              RH
            </span>
          </div>

          <nav className={`hidden md:flex items-center space-x-6 text-sm font-bold ${
            isDark ? "text-zinc-200" : "text-zinc-800"
          }`}>
            <a href="#home" className={`transition-colors ${isDark ? "hover:text-purple-400" : "hover:text-purple-700"}`}>Home</a>
            <a href="#about" className={`transition-colors ${isDark ? "hover:text-purple-400" : "hover:text-purple-700"}`}>About</a>
            <a href="#experience" className={`transition-colors ${isDark ? "hover:text-purple-400" : "hover:text-purple-700"}`}>Experience</a>
            <a href="#projects" className={`transition-colors ${isDark ? "hover:text-purple-400" : "hover:text-purple-700"}`}>Projects</a>
            <a href="#contact" className={`transition-colors ${isDark ? "hover:text-purple-400" : "hover:text-purple-700"}`}>Contact</a>
          </nav>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-all duration-300 shadow-md shadow-purple-600/30 hover:scale-105"
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl pb-16">
        {/* Centered Hero Section */}
        <section id="home" className="py-12 sm:py-20 text-center flex flex-col items-center justify-center">
          <div className="mb-6 relative">
            <img 
              src="/photo.jpg" 
              alt="Rahul Hugar" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-purple-500/40 dark:border-purple-400/30 shadow-xl shadow-purple-500/20"
            />
          </div>

          <h1 className={`text-4xl sm:text-6xl font-black tracking-tight mb-4 ${isDark ? "text-white" : "text-zinc-900"}`}>
            Hello, I'm{" "}
            <span className={`bg-gradient-to-r bg-clip-text text-transparent underline decoration-purple-600 underline-offset-8 ${
              isDark ? "from-blue-400 via-purple-400 to-pink-400" : "from-blue-600 via-purple-600 to-pink-600"
            }`}>
              Rahul Hugar
            </span>
          </h1>

          <p className={`text-lg sm:text-xl font-bold mb-6 ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>
            Software Developer • UI/UX Designer • AI Enthusiast
          </p>

          {/* Social Links Bar */}
          <div className="flex items-center justify-center space-x-5 mb-8">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/rahul-hugar-96aa40238/"
              className={`p-3 rounded-full border transition-all shadow-md ${
                isDark 
                  ? "bg-zinc-900 border-zinc-800 text-zinc-200 hover:text-purple-400 hover:border-purple-600" 
                  : "bg-white border-purple-200 text-zinc-800 hover:text-purple-755 hover:border-purple-600"
              }`}
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 50 50">
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Rahulhugar2003"
              className={`p-3 rounded-full border transition-all shadow-md ${
                isDark 
                  ? "bg-zinc-900 border-zinc-800 text-zinc-200 hover:text-purple-400 hover:border-purple-600" 
                  : "bg-white border-purple-200 text-zinc-800 hover:text-purple-755 hover:border-purple-600"
              }`}
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 438.549 438.549">
                <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
              </svg>
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/@rahulhugar"
              className={`p-3 rounded-full border transition-all shadow-md ${
                isDark 
                  ? "bg-zinc-900 border-zinc-800 text-zinc-200 hover:text-purple-400 hover:border-purple-600" 
                  : "bg-white border-purple-200 text-zinc-800 hover:text-purple-755 hover:border-purple-600"
              }`}
              aria-label="YouTube"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>

            <a
              href="mailto:rahulmhugar@gmail.com"
              className={`p-3 rounded-full border transition-all shadow-md ${
                isDark 
                  ? "bg-zinc-900 border-zinc-800 text-zinc-200 hover:text-purple-400 hover:border-purple-600" 
                  : "bg-white border-purple-200 text-zinc-800 hover:text-purple-755 hover:border-purple-600"
              }`}
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          {/* View Resume Button */}
          <a
            href="https://drive.google.com/file/d/1S9e-8JXVHXqm5tYbMZl2KQug-gZ1olUe/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center justify-center rounded-2xl border-2 transition-all duration-300 px-8 py-3 font-extrabold shadow-lg ${
              isDark 
                ? "border-purple-600 text-purple-400 bg-transparent hover:bg-purple-600 hover:text-white shadow-purple-500/10 hover:shadow-purple-500/30" 
                : "border-purple-600 text-purple-700 bg-white hover:bg-purple-600 hover:text-white shadow-purple-500/15 hover:shadow-purple-500/30"
            }`}
          >
            View Resume
          </a>
        </section>

        <div className="flex flex-col space-y-16">
          {/* About Section */}
          <section id="about" className="pt-8">
            <h2 className={`text-3xl font-extrabold mb-4 border-b pb-2 ${
              isDark ? "border-zinc-800 text-white" : "border-purple-200 text-zinc-950"
            }`}>
              About Me
            </h2>
            <div className={`font-semibold leading-relaxed space-y-6 ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>
              <p>
                👋 Hi! I’m <strong className={isDark ? "text-white" : "text-black"}>Rahul Hugar</strong>, a Software Developer I with experience in full-stack development and scalable application design. I am passionate about exploring new technologies, crafting intuitive UI/UX experiences, and building high-performance AI-powered platforms.
              </p>

              <div>
                <h3 className={`font-bold text-lg mt-4 mb-2 ${isDark ? "text-white" : "text-zinc-950"}`}>Education</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Bachelor of Engineering in Computer Science - <em className="font-bold">Basaveshwar Engineering College, Bagalkote</em> (2025)</li>
                  <li>Intermediate (PUC) - <em className="font-bold">Sai Niketan Pu College, Jamkhandi</em> (2021)</li>
                </ul>
              </div>

              {/* Technical Skills Category list with logos */}
              <div>
                <h3 className={`font-bold text-xl mt-6 mb-4 ${isDark ? "text-white" : "text-zinc-950"}`}>Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SkillCategory
                    title="Languages"
                    skills={["Python", "JavaScript", "TypeScript", "Java", "C"]}
                    isDark={isDark}
                  />
                  <SkillCategory
                    title="Frontend & Design"
                    skills={["React", "HTML", "CSS", "Tailwind CSS", "Figma"]}
                    isDark={isDark}
                  />
                  <SkillCategory
                    title="Backend & DB"
                    skills={["Node.js", "REST APIs", "SQL"]}
                    isDark={isDark}
                  />
                  <SkillCategory
                    title="ML & Tools"
                    skills={["Wav2Vec2", "Audio Processing", "GenAI", "Git", "GitHub", "VS Code", "AWS", "Linux", "Docker"]}
                    isDark={isDark}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="pt-4">
            <h2 className={`text-3xl font-extrabold mb-6 border-b pb-2 ${
              isDark ? "border-zinc-800 text-white" : "border-purple-200 text-zinc-950"
            }`}>
              Experience
            </h2>
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl border backdrop-blur-md shadow-md ${
                isDark ? "border-zinc-800 bg-zinc-900/70" : "border-purple-200 bg-white/95"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-zinc-950"}`}>
                    Software Developer I <span className={isDark ? "text-purple-400" : "text-purple-700"}>@ Edsols Innovations</span>
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full w-max mt-1 sm:mt-0 ${
                    isDark ? "bg-purple-900/40 text-purple-300" : "bg-purple-100 text-purple-800"
                  }`}>
                    Feb 2025 - Present
                  </span>
                </div>
                <p className={`text-sm font-semibold leading-relaxed ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>
                  Developing and maintaining Python-based backend services and React frontend applications for an AI-powered speech and language therapy platform. Integrating Generative AI tools like Wav2Vec2, ChatGPT, Gemini, and Claude to enhance speech processing and workflow automation.
                </p>
              </div>

              <div className={`p-6 rounded-2xl border backdrop-blur-md shadow-md ${
                isDark ? "border-zinc-800 bg-zinc-900/70" : "border-purple-200 bg-white/95"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-zinc-950"}`}>
                    UI/UX Designer Intern <a href="https://www.vealthx.com/" target="_blank" rel="noreferrer" className={`hover:underline ${
                      isDark ? "text-purple-400" : "text-purple-700"
                    }`}>@ Vealthx</a>
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full w-max mt-1 sm:mt-0 ${
                    isDark ? "bg-purple-900/40 text-purple-300" : "bg-purple-100 text-purple-800"
                  }`}>
                    Internship
                  </span>
                </div>
                <p className={`text-sm font-semibold leading-relaxed ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>
                  Designed and developed the website for Vealthx, a fintech company, to enhance user experience and functionality. Designed the website layout and integrated an AI-generated animated video to narrate a compelling finance story.
                </p>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="pt-4">
            <h2 className={`text-3xl font-extrabold mb-6 border-b pb-2 ${
              isDark ? "border-zinc-800 text-white" : "border-purple-200 text-zinc-950"
            }`}>
              Development Projects
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-12">
              {developmentProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  isExpanded={expandedStates[`dev-${index}`]}
                  setIsExpanded={() => toggleExpanded(index, 'dev')}
                  isDark={isDark}
                />
              ))}
            </div>

            <h2 className={`text-3xl font-extrabold mb-6 border-b pb-2 ${
              isDark ? "border-zinc-800 text-white" : "border-purple-200 text-zinc-950"
            }`}>
              UI/UX Projects
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {uiuxProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  isExpanded={expandedStates[`uiux-${index}`]}
                  setIsExpanded={() => toggleExpanded(index, 'uiux')}
                  isDark={isDark}
                />
              ))}
            </div>
          </section>

          {/* Hire Me / Contact Form Section */}
          <section id="contact" className="pt-8 border-t border-purple-200 dark:border-zinc-800">
            <div className={`p-8 rounded-3xl border shadow-xl ${
              isDark ? "border-zinc-800 bg-zinc-900/70 shadow-purple-500/5" : "border-purple-200 bg-white shadow-purple-500/5"
            }`}>
              <h2 className={`text-3xl font-extrabold mb-2 ${isDark ? "text-white" : "text-zinc-950"}`}>Interested in Hiring?</h2>
              <p className={`font-semibold mb-6 ${isDark ? "text-zinc-300" : "text-zinc-900"}`}>
                Fill out the form below to get in touch directly via email at{" "}
                <a href="mailto:rahulmhugar@gmail.com" className={`font-bold hover:underline ${
                  isDark ? "text-purple-400" : "text-purple-755"
                }`}>
                  rahulmhugar@gmail.com
                </a>
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4 max-w-xl">
                <div>
                  <label className={`block text-sm font-bold mb-1.5 ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm ${
                      isDark 
                        ? "border-zinc-700 bg-zinc-950 text-white" 
                        : "border-purple-200 bg-zinc-50 text-zinc-950"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-1.5 ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm ${
                      isDark 
                        ? "border-zinc-700 bg-zinc-950 text-white" 
                        : "border-purple-200 bg-zinc-50 text-zinc-950"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-1.5 ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>Message</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tell me about your project or offer..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm ${
                      isDark 
                        ? "border-zinc-700 bg-zinc-950 text-white" 
                        : "border-purple-200 bg-zinc-50 text-zinc-950"
                    }`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 transition-all text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-purple-600/30 hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-16 py-8 border-t text-center text-sm font-bold space-y-2 ${
        isDark ? "border-zinc-800 text-zinc-400" : "border-purple-200 text-zinc-900"
      }`}>
        <p>© All rights reserved by Rahul Hugar</p>
        <p className="text-xs italic font-normal text-zinc-600 dark:text-zinc-400">
          The new portfolio is building soon, it will be live.
        </p>
      </footer>
    </div>
  );
};

export default App;
