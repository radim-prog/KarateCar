import Link from "next/link";

type CrossLink = {
  href: string;
  label: string;
};

type PageCrossLinksProps = {
  links: CrossLink[];
};

export function PageCrossLinks({ links }: PageCrossLinksProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--line)]">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-lg border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
