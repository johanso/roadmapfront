import { curriculum } from '../data/curriculum';
import type { Theme } from '../hooks/useTheme';

interface SidebarProps {
  completedPerPhase: Map<string, number>;
  activePhase: string | null;
  onPhaseClick: (phaseId: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export function Sidebar({
  completedPerPhase,
  activePhase,
  onPhaseClick,
  theme,
  onToggleTheme,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="sidebar-title">Fases</span>
        </div>
        <button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          aria-label="Cambiar tema"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          <span className="theme-toggle-label">{theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
        </button>
      </div>
      <nav className="sidebar-nav">
        {curriculum.map((phase, index) => {
          const completed = completedPerPhase.get(phase.id) ?? 0;
          const total = phase.topics.length;
          const pct = Math.round((completed / total) * 100);
          const isActive = activePhase === phase.id;

          return (
            <button
              key={phase.id}
              className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''} ${pct === 100 ? 'sidebar-item-done' : ''}`}
              onClick={() => onPhaseClick(phase.id)}
              style={{ '--phase-color': phase.color } as React.CSSProperties}
            >
              <div className="sidebar-item-info">
                <span className="sidebar-item-num">Fase {index + 1}</span>
                <span className="sidebar-item-name">{phase.title}</span>
                <div className="sidebar-item-bar">
                  <div
                    className="sidebar-item-fill"
                    style={{ width: `${pct}%`, background: phase.gradient }}
                  />
                </div>
              </div>
              <span className="sidebar-item-pct">{pct}%</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
