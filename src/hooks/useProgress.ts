import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'frontend-senioriti-progress';

export const useProgress = () => {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    } catch {
      // localStorage not available
    }
  }, [completed]);

  const toggleTopic = useCallback((topicId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (topicId: string) => completed.has(topicId),
    [completed]
  );

  const resetAll = useCallback(() => {
    setCompleted(new Set());
  }, []);

  const markPhaseComplete = useCallback((topicIds: string[]) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      topicIds.forEach((id) => next.add(id));
      return next;
    });
  }, []);

  return { completed, toggleTopic, isCompleted, resetAll, markPhaseComplete };
};
