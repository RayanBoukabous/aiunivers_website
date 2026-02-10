'use client';

import { useMemo, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';
import { useSolutionsQuery } from '../lib/queries';
import { mapSolutionForList } from '../lib/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface SolutionForDisplay {
  title: string;
  description: string;
  slug: string;
  image: string;
}

export interface UseSolutionsResult {
  solutions: SolutionForDisplay[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook pour les solutions - utilise React Query avec cache.
 */
export function useSolutions(): UseSolutionsResult {
  const { language } = useLanguage();
  const { data, isLoading, error, isError, refetch } = useSolutionsQuery();

  const rawSolutions = data ?? [];
  const solutions: SolutionForDisplay[] = useMemo(() => {
    return rawSolutions.map((s) => mapSolutionForList(s, language));
  }, [rawSolutions, language]);

  const errorMessage = error
    ? `${error instanceof Error ? error.message : 'Erreur'} (API: ${API_BASE})`
    : null;

  return {
    solutions,
    loading: isLoading,
    error: errorMessage,
    refetch,
  };
}

export function SolutionsProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
