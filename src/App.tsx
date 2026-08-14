import { useEffect, useRef, useState } from 'react';
import { curriculum } from './data/curriculum';
import { useProgress } from './hooks/useProgress';
import { useTheme } from './hooks/useTheme';
import { Hero } from './components/Hero';
import { PhaseCard } from './components/PhaseCard';
import { Sidebar } from './components/Sidebar';
import './index.css';

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

function App() {
  const { completed, toggleTopic, isCompleted, resetAll, markPhaseComplete } = useProgress();
  const { theme, toggleTheme } = useTheme();
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const phaseRefs = useRef<Map<string, HTMLElement>>(new Map());

  const completedPerPhase = new Map<string, number>(
    curriculum.map((phase) => [
      phase.id,
      phase.topics.filter((t) => completed.has(t.id)).length,
    ])
  );

  const totalCompleted = [...completedPerPhase.values()].reduce((a, b) => a + b, 0);

  const handlePhaseClick = (phaseId: string) => {
    const el = phaseRefs.current.get(phaseId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActivePhase(phaseId);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActivePhase(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    phaseRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleReset = () => {
    if (confirm('¿Seguro que quieres reiniciar todo el progreso?')) {
      resetAll();
    }
  };

  return (
    <div className="app">
      {/* Mobile controls */}
      <div className="mobile-header-controls">
        <button
          className={`mobile-menu-btn ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <span /><span /><span />
        </button>

        <button
          className="mobile-theme-btn"
          onClick={toggleTheme}
          aria-label="Cambiar tema"
          title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        completedPerPhase={completedPerPhase}
        activePhase={activePhase}
        onPhaseClick={handlePhaseClick}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content">
        <Hero totalCompleted={totalCompleted} onReset={handleReset} />

        <section className="phases-section" aria-label="Fases del roadmap">
          {curriculum.map((phase, index) => (
            <div
              key={phase.id}
              id={phase.id}
              ref={(el) => {
                if (el) phaseRefs.current.set(phase.id, el);
              }}
            >
              <PhaseCard
                phase={phase}
                phaseIndex={index}
                completedCount={completedPerPhase.get(phase.id) ?? 0}
                onTopicToggle={toggleTopic}
                isTopicCompleted={isCompleted}
                onMarkAll={markPhaseComplete}
              />
            </div>
          ))}
        </section>

        <footer className="footer">
          <p><strong>Frontend Senioriti</strong> — Roadmap actualizado 2025</p>
          <p>Progreso guardado automáticamente en tu navegador</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
