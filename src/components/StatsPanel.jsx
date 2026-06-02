import { STATES } from '../lib/utils';

function Stat({ label, value, dot, big }) {
  return (
    <div className="flex-1 rounded-2xl border border-rose-100 bg-white/70 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-[12px] font-medium text-rose-400">
        {dot && <span className="h-2 w-2 rounded-full" style={{ background: dot }} />}
        {label}
      </div>
      <div className={`font-display font-bold text-rose-800 ${big ? 'text-3xl' : 'text-2xl'}`}>{value}</div>
    </div>
  );
}

export default function StatsPanel({ tasks }) {
  const total = tasks.length;
  const byState = (s) => tasks.filter((t) => t.status === s).length;
  const done = byState('done');
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <Stat label="Total" value={total} big />
        {Object.values(STATES).map((s) => (
          <Stat key={s.id} label={s.label} value={byState(s.id)} dot={s.dot} />
        ))}
      </div>
      <div className="rounded-2xl border border-rose-100 bg-white/70 px-4 py-3 backdrop-blur-sm">
        <div className="mb-1.5 flex justify-between text-[12px] font-medium text-rose-400">
          <span>Mi progreso ✿</span><span className="font-bold text-violet-500">{pct}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-rose-50">
          <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-violet-400 transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
