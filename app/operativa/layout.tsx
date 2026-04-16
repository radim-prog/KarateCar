import type { ReactNode } from "react";
import { OperativaNav } from "./operativa-nav";

export const dynamic = "force-dynamic";

export default function OperativaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Sub-nav */}
      <div
        style={{
          borderBottom: "1px solid var(--line)",
          background: "var(--surface)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <OperativaNav />
        </div>
      </div>

      {/* Page content */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</div>
    </div>
  );
}
