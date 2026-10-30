import { curriculum, getTotalTopics, getTotalDays } from '../data/curriculum';

interface HeroProps {
  totalCompleted: number;
  onReset: () => void;
}

export function Hero({ totalCompleted, onReset }: HeroProps) {
  const totalTopics = getTotalTopics();
  const totalDays = getTotalDays();
  const overallProgress = Math.round((totalCompleted / totalTopics) * 100);

  const getLevelLabel = () => {
    if (overallProgress < 10) return { label: 'Junior', color: '#10B981' };
    if (overallProgress < 30) return { label: 'Junior+', color: '#06B6D4' };
    if (overallProgress < 50) return { label: 'Mid-Level', color: '#F59E0B' };
    if (overallProgress < 75) return { label: 'Mid-Senior', color: '#EF4444' };
    if (overallProgress < 90) return { label: 'Senior', color: '#8B5CF6' };
    return { label: 'Senior+', color: '#F59E0B' };
  };

  const level = getLevelLabel();

  return (
    <header className="hero">
      <div className="hero-bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span>Frontend Roadmap 2025</span>
        </div>

        <h1 className="hero-title">
          De <span className="hero-title-highlight">Junior</span>
          {' '}a{' '}
          <span className="hero-title-highlight gradient-text">Senior</span>
        </h1>
        <p className="hero-subtitle">
          {totalTopics} temas cuidadosamente seleccionados · {curriculum.length} fases · ~{totalDays} días        </p>

        <div className="hero-level-badge" style={{ borderColor: level.color, background: `${level.color}15` }}>
          <span style={{ color: level.color }}>Nivel actual: <strong>{level.label}</strong></span>
        </div>

        <div className="hero-stats">
          <div className="hero-stat-card">
            <span className="hero-stat-value">{totalCompleted}</span>
            <span className="hero-stat-label">Completados</span>
          </div>
          <div className="hero-stat-card">
            <span className="hero-stat-value">{totalTopics - totalCompleted}</span>
            <span className="hero-stat-label">Restantes</span>
          </div>
          <div className="hero-stat-card">
            <span className="hero-stat-value">{overallProgress}%</span>
            <span className="hero-stat-label">Progreso</span>
          </div>
          <div className="hero-stat-card">
            <span className="hero-stat-value">{curriculum.length}</span>
            <span className="hero-stat-label">Fases</span>
          </div>
        </div>

        <div className="hero-overall-progress">
          <div className="hero-progress-track">
            <div
              className="hero-progress-fill"
              style={{ width: `${overallProgress}%` }}
            />
            <div className="hero-progress-glow" style={{ left: `${overallProgress}%` }} />
          </div>
          <span className="hero-progress-label">{overallProgress}% del camino recorrido</span>
        </div>

        {totalCompleted > 0 && (
          <button className="btn-reset" onClick={onReset}>
            Reiniciar progreso
          </button>
        )}
      </div>
    </header>
  );
}
