"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { NodeOutcome, TreeState } from "../data";

const STORAGE_KEY = "karate-car-tree";

type TreeStateContextValue = {
  state: TreeState;
  setOutcome: (nodeId: string, outcome: NodeOutcome) => void;
  setNote: (nodeId: string, note: string) => void;
  resetNode: (nodeId: string) => void;
  resetAll: () => void;
};

const defaultState: TreeState = { outcomes: {}, notes: {} };

const TreeStateContext = createContext<TreeStateContextValue>({
  state: defaultState,
  setOutcome: () => {},
  setNote: () => {},
  resetNode: () => {},
  resetAll: () => {},
});

export function useTreeState() {
  return useContext(TreeStateContext);
}

function loadState(): TreeState {
  if (typeof window === "undefined") return defaultState;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState;
  try {
    return JSON.parse(raw) as TreeState;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return defaultState;
  }
}

export function TreeStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TreeState>(loadState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setOutcome = useCallback((nodeId: string, outcome: NodeOutcome) => {
    setState((prev) => ({
      ...prev,
      outcomes: { ...prev.outcomes, [nodeId]: outcome },
    }));
  }, []);

  const setNote = useCallback((nodeId: string, note: string) => {
    setState((prev) => ({
      ...prev,
      notes: { ...prev.notes, [nodeId]: note },
    }));
  }, []);

  const resetNode = useCallback((nodeId: string) => {
    setState((prev) => {
      const outcomes = { ...prev.outcomes };
      const notes = { ...prev.notes };
      delete outcomes[nodeId];
      delete notes[nodeId];
      return { outcomes, notes };
    });
  }, []);

  const resetAll = useCallback(() => {
    setState(defaultState);
  }, []);

  return (
    <TreeStateContext.Provider
      value={{ state, setOutcome, setNote, resetNode, resetAll }}
    >
      {children}
    </TreeStateContext.Provider>
  );
}
