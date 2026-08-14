import type { Phase, Topic } from '../data/curriculum';

interface PhaseCardProps {
  phase: Phase;
  phaseIndex: number;
  completedCount: number;
  onTopicToggle: (topicId: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
  onMarkAll: (topicIds: string[]) => void;
}

const difficultyConfig = {
  beginner: { label: 'Principiante', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  intermediate: { label: 'Intermedio', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  advanced: { label: 'Avanzado', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
  expert: { label: 'Experto', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
};

function TopicItem({
  topic,
  isCompleted,
  onToggle,
}: {
  topic: Topic;
  isCompleted: boolean;
  onToggle: () => void;
}) {
  const diff = difficultyConfig[topic.difficulty];

  return (
    <div
      className={`topic-item ${isCompleted ? 'topic-completed' : ''}`}
      onClick={onToggle}
      role="checkbox"
      aria-checked={isCompleted}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? onToggle() : null}
    >
      <div className="topic-checkbox">
        {isCompleted && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      <div className="topic-content">
        <div className="topic-header">
          <h3 className="topic-title">{topic.title}</h3>
          <div className="topic-meta">
            <span className="topic-time">{topic.estimatedTime}</span>
            <span
              className="topic-difficulty"
              style={{ color: diff.color, background: diff.bg }}
            >
              {diff.label}
            </span>
          </div>
        </div>
        <p className="topic-description">{topic.description}</p>
        {topic.tags && (
          <div className="topic-tags">
            {topic.tags.map((tag) => (
              <span key={tag} className="topic-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function PhaseCard({
  phase,
  phaseIndex,
  completedCount,
  onTopicToggle,
  isTopicCompleted,
  onMarkAll,
}: PhaseCardProps) {
  const progress = phase.topics.length > 0
    ? Math.round((completedCount / phase.topics.length) * 100)
    : 0;
  const allCompleted = completedCount === phase.topics.length;

  return (
    <article className="phase-card" style={{ '--phase-color': phase.color } as React.CSSProperties}>
      <div className="phase-header" style={{ background: phase.gradient }}>
        <div className="phase-header-left">
          <div className="phase-title-group">
            <span className="phase-number">Fase {phaseIndex + 1}</span>
            <h2 className="phase-title">{phase.title}</h2>
            <p className="phase-subtitle">{phase.subtitle}</p>
          </div>
        </div>
        <div className="phase-header-right">
          <div className="phase-stats">
            <span className="phase-stat">{phase.topics.length} temas</span>
            <span className="phase-stat">{phase.days} días est.</span>
          </div>
          <div className="phase-progress-ring">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="5" />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - progress / 100)}`}
                transform="rotate(-90 32 32)"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
            </svg>
            <span className="phase-progress-pct">{progress}%</span>
          </div>
        </div>
      </div>

      <div className="phase-progress-bar">
        <div
          className="phase-progress-fill"
          style={{ width: `${progress}%`, background: phase.gradient }}
        />
      </div>

      <div className="phase-body">
        <div className="phase-actions">
          <span className="phase-counter">
            {completedCount} / {phase.topics.length} completados
          </span>
          {!allCompleted && (
            <button
              className="btn-mark-all"
              onClick={() => onMarkAll(phase.topics.map((t) => t.id))}
            >
              Marcar todos
            </button>
          )}
        </div>

        <div className="topics-list">
          {phase.topics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              isCompleted={isTopicCompleted(topic.id)}
              onToggle={() => onTopicToggle(topic.id)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
