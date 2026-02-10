'use client';

import { useMemo, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';
import { useDepartementsQuery } from '../lib/queries';
import { mapDepartmentForList } from '../lib/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface DepartmentForDisplay {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  solutions: { slug: string; title: string }[];
}

export interface UseDepartmentsResult {
  departments: DepartmentForDisplay[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDepartments(): UseDepartmentsResult {
  const { language } = useLanguage();
  const { data, isLoading, error, isError, refetch } = useDepartementsQuery();

  const rawDepartments = data ?? [];
  const departments: DepartmentForDisplay[] = useMemo(() => {
    return rawDepartments.map((d) => mapDepartmentForList(d, language));
  }, [rawDepartments, language]);

  const errorMessage = error
    ? `${error instanceof Error ? error.message : 'Erreur'} (API: ${API_BASE})`
    : null;

  return {
    departments,
    loading: isLoading,
    error: errorMessage,
    refetch,
  };
}

export function DepartmentsProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
