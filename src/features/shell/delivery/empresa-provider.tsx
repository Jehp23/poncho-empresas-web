"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_EMPRESA_ID,
  getDashboardData,
  getEmpresa,
  MOCK_EMPRESAS,
} from "@/shared/infrastructure/mock";
import type { EmpresaContextValue } from "../domain/empresa-context";
import { EMPRESA_STORAGE_KEY } from "../domain/empresa-context";

const EmpresaContext = createContext<EmpresaContextValue | null>(null);

export function EmpresaProvider({ children }: { children: React.ReactNode }) {
  const [empresaId, setEmpresaIdState] = useState(DEFAULT_EMPRESA_ID);

  useEffect(() => {
    const stored = localStorage.getItem(EMPRESA_STORAGE_KEY);
    if (stored) setEmpresaIdState(stored);
  }, []);

  const setEmpresaId = useCallback((id: string) => {
    setEmpresaIdState(id);
    localStorage.setItem(EMPRESA_STORAGE_KEY, id);
  }, []);

  const value = useMemo<EmpresaContextValue>(() => {
    const data = getDashboardData(empresaId);
    return {
      empresaId,
      empresa: getEmpresa(empresaId),
      empresas: MOCK_EMPRESAS,
      data,
      setEmpresaId,
    };
  }, [empresaId, setEmpresaId]);

  return (
    <EmpresaContext.Provider value={value}>{children}</EmpresaContext.Provider>
  );
}

export function useEmpresa(): EmpresaContextValue {
  const ctx = useContext(EmpresaContext);
  if (!ctx) {
    throw new Error("useEmpresa debe usarse dentro de EmpresaProvider");
  }
  return ctx;
}

export function useDashboardData() {
  return useEmpresa().data;
}
