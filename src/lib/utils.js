export const STATES = {
  pending:  { id: 'pending',  label: 'Por hacer',  color: 'rose',    dot: '#fb7185' },
  progress: { id: 'progress', label: 'En camino',  color: 'amber',   dot: '#fbbf24' },
  done:     { id: 'done',     label: 'Listo ✿',    color: 'violet',  dot: '#a78bfa' },
};

export const PRIORITIES = {
  low:    { id: 'low',    label: 'Tranqui', badge: 'bg-teal-50 text-teal-600 ring-teal-200',     rank: 1 },
  medium: { id: 'medium', label: 'Normal',  badge: 'bg-amber-50 text-amber-600 ring-amber-200',  rank: 2 },
  high:   { id: 'high',   label: 'Urgente', badge: 'bg-rose-50 text-rose-600 ring-rose-200',      rank: 3 },
};

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export const fmtDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const fmtDateTime = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
};

export const isOverdue = (task) =>
  task.due && task.status !== 'done' && new Date(task.due) < new Date(new Date().toDateString());

const KEY = 'kanban_rosa_tasks_v1';
export const loadTasks = () => {
  try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; }
  catch { return null; }
};
export const saveTasks = (tasks) => {
  try { localStorage.setItem(KEY, JSON.stringify(tasks)); } catch {}
};
