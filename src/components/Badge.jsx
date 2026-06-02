import { PRIORITIES } from '../lib/utils';

export function PriorityBadge({ priority }) {
  const p = PRIORITIES[priority] || PRIORITIES.medium;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${p.badge}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {p.label}
    </span>
  );
}

export function StatePill({ dot, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-rose-400">
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}
