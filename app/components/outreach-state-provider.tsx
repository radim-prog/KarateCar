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

export function OutreachStateProvider({ children }: { children: ReactNode }) {
  const [statuses, setStatuses] = useState<OutreachState>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setStatuses(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
    }
  }, [statuses, loaded]);

  const setLeadStatus = useCallback((name: string, status: LeadStatus) => {
    setStatuses((prev) => ({ ...prev, [name]: status }));
  }, []);

  return (
    <OutreachContext.Provider value={{ statuses, setLeadStatus }}>
      {children}
    </OutreachContext.Provider>
  );
}
