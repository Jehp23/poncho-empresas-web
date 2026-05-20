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
  getDashboardData as getMockDashboardData,
  getEmpresa,
  MOCK_EMPRESAS,
} from "@/shared/infrastructure/mock";
import { getDashboardDataFromApi } from "@/shared/infrastructure/api";
import type { DashboardData } from "@/shared/types/app";
import { DashboardLoading } from "./components/dashboard-loading";
import type { EmpresaContextValue } from "../domain/empresa-context";
import { EMPRESA_STORAGE_KEY } from "../domain/empresa-context";
import {
  ROL_STORAGE_KEY,
  type RolUsuario,
} from "../domain/roles";

const USE_REAL_API = process.env.NEXT_PUBLIC_USE_REAL_API === "true";
const OFFLINE_SIM_KEY = "pe:simulateOffline";

const EmpresaContext = createContext<EmpresaContextValue | null>(null);

export function EmpresaProvider({ children }: { children: React.ReactNode }) {
  const [empresaId, setEmpresaIdState] = useState(DEFAULT_EMPRESA_ID);
  const [apiData, setApiData] = useState<DashboardData | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiDegraded, setApiDegraded] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [rolDemo, setRolDemoState] = useState<RolUsuario | null>(null);
  const [simulateOffline, setSimulateOfflineState] = useState(false);

  const fetchApi = useCallback(() => {
    if (!USE_REAL_API) return;
    setApiLoading(true);
    setApiDegraded(false);

    const timeout = setTimeout(() => {
      setApiLoading(false);
      setApiDegraded(true);
    }, 8000);

    getDashboardDataFromApi(empresaId)
      .then((data) => {
        setApiData(data);
        setApiDegraded(false);
        setBannerDismissed(false);
      })
      .catch(() => {
        setApiData(null);
        setApiDegraded(true);
        setBannerDismissed(false);
      })
      .finally(() => {
        clearTimeout(timeout);
        setApiLoading(false);
      });
  }, [empresaId]);

  useEffect(() => {
    const stored = localStorage.getItem(EMPRESA_STORAGE_KEY);
    if (stored) setEmpresaIdState(stored);

    const rol = localStorage.getItem(ROL_STORAGE_KEY) as RolUsuario | null;
    if (rol) setRolDemoState(rol);

    setSimulateOfflineState(localStorage.getItem(OFFLINE_SIM_KEY) === "true");
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const setEmpresaId = useCallback((id: string) => {
    setEmpresaIdState(id);
    localStorage.setItem(EMPRESA_STORAGE_KEY, id);
  }, []);

  const setRolDemo = useCallback((rol: RolUsuario | null) => {
    setRolDemoState(rol);
    if (rol) localStorage.setItem(ROL_STORAGE_KEY, rol);
    else localStorage.removeItem(ROL_STORAGE_KEY);
  }, []);

  const setSimulateOffline = useCallback((value: boolean) => {
    setSimulateOfflineState(value);
    if (value) localStorage.setItem(OFFLINE_SIM_KEY, "true");
    else localStorage.removeItem(OFFLINE_SIM_KEY);
    if (value) setBannerDismissed(false);
  }, []);

  const value = useMemo<EmpresaContextValue>(() => {
    const base =
      USE_REAL_API && apiData && !simulateOffline
        ? apiData
        : getMockDashboardData(empresaId);

    const data: DashboardData = rolDemo
      ? { ...base, usuario: { ...base.usuario, rol: rolDemo } }
      : base;

    const degraded = simulateOffline || (USE_REAL_API && apiDegraded);

    return {
      empresaId,
      empresa: getEmpresa(empresaId),
      empresas: data.empresas?.length ? data.empresas : MOCK_EMPRESAS,
      data,
      setEmpresaId,
      setRolDemo,
      apiDegraded: degraded,
      simulateOffline,
      setSimulateOffline,
      retryApi: fetchApi,
      dismissApiBanner: () => setBannerDismissed(true),
      showApiBanner: degraded && !bannerDismissed,
    };
  }, [
    empresaId,
    apiData,
    apiDegraded,
    bannerDismissed,
    rolDemo,
    simulateOffline,
    setEmpresaId,
    setRolDemo,
    setSimulateOffline,
    fetchApi,
  ]);

  if (USE_REAL_API && apiLoading && !apiData && !simulateOffline && !apiDegraded) {
    return <DashboardLoading />;
  }

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
