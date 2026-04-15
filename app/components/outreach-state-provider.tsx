"use client";

import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from "react";
import type { LeadStatus } from "../data";

const STORAGE_KEY = "karate-car-leads";

type OutreachState = Record<string, LeadStatus>;

type OutreachContextValue = {
  statuses: OutreachState;
  setLeadStatus: (name: string, status: LeadStatus) => void;
};

const OutreachContext = createContext<OutreachContextValue>({
  statuses: {},
  setLeadStatus: () => {},
});

export function useOutreachState() {
  return useContext(OutreachContext);
}

function readInitialStatuses(): OutreachState {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as OutreachState;
  } catch {}
  return {};
}

export function OutreachStateProvider({ children }: { children: ReactNode }) {
  const [statuses, setStatuses] = useState<OutreachState>(readInitialStatuses);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
    } catch {}
  }, [statuses]);

  const setLeadStatus = useCallback((name: string, status: LeadStatus) => {
    setStatuses((prev) => ({ ...prev, [name]: status }));
  }, []);

  return (
    <OutreachContext.Provider value={{ statuses, setLeadStatus }}>
      {children}
    </OutreachContext.Provider>
  );
}
