import { PRIORITIES } from '../lib/utils';

export default function Toolbar({ query, setQuery, priorityFilter, setPriorityFilter, sortBy, setSortBy, onNew }) {
  const sel = "rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm text-rose-700 outline-none backdrop-blur-sm focus:ring-2 focus:ring-rose-200";
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-rose-300">🔍</span>
        <input
          value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar entre mis tareas…"
          className="w-full rounded-full border border-rose-200 bg-white/80 py-2 pl-10 pr-4 text-sm text-rose-700 outline-none backdrop-blur-sm placeholder:text-rose-300 focus:ring-2 focus:ring-rose-200"
        />
      </div>

      <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className={sel}>
        <option value="all">Todas</option>
        {Object.values(PRIORITIES).map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={sel}>
        <option value="created">Por creación</option>
        <option value="due">Por fecha</option>
        <option value="priority">Por prioridad</option>
        <option value="title">Por título</option>
      </select>

      <button onClick={onNew}
        className="rounded-full bg-gradient-to-r from-rose-400 to-pink-400 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg">
        ✿ Nueva tarea
      </button>
    </div>
  );
}
