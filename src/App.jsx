import { useState, useEffect, useMemo } from 'react';
import { STATES, PRIORITIES, uid, loadTasks, saveTasks } from './lib/utils';
import Toolbar from './components/Toolbar';
import StatsPanel from './components/StatsPanel';
import Column from './components/Column';
import TaskForm from './components/TaskForm';

const NEXT = { pending: 'progress', progress: 'done', done: 'pending' };

const seed = () => ([
  { id: uid(), title: 'Comprar flores para el escritorio', description: 'Algo que alegre el espacio ✿', priority: 'low', status: 'done', createdAt: new Date(Date.now() - 864e5 * 3).toISOString(), due: '' },
  { id: uid(), title: 'Preparar presentación del proyecto', description: 'Diapositivas y guion final.', priority: 'medium', status: 'progress', createdAt: new Date(Date.now() - 864e5).toISOString(), due: new Date(Date.now() + 864e5 * 4).toISOString().slice(0, 10) },
  { id: uid(), title: 'Responder correos pendientes', description: 'Bandeja de entrada al día.', priority: 'high', status: 'pending', createdAt: new Date().toISOString(), due: new Date(Date.now() + 864e5 * 2).toISOString().slice(0, 10) },
  { id: uid(), title: 'Planear el fin de semana', description: 'Algo lindo para descansar.', priority: 'low', status: 'pending', createdAt: new Date().toISOString(), due: '' },
]);

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks() ?? seed());
  const [query, setQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => { saveTasks(tasks); }, [tasks]);

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const handleSubmit = (data) => {
    if (editing) {
      setTasks((ts) => ts.map((t) => (t.id === editing.id ? { ...t, ...data } : t)));
      notify('Tarea actualizada ✿');
    } else {
      setTasks((ts) => [{ ...data, id: uid(), createdAt: new Date().toISOString() }, ...ts]);
      notify('Tarea creada ✿');
    }
    setFormOpen(false); setEditing(null);
  };

  const handleDelete = (id) => {
    if (!confirm('¿Borrar esta tarea?')) return;
    setTasks((ts) => ts.filter((t) => t.id !== id));
    notify('Tarea borrada ✿');
  };

  const handleAdvance = (id) =>
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: NEXT[t.status] } : t)));

  const openEdit = (task) => { setEditing(task); setFormOpen(true); };
  const openNew = () => { setEditing(null); setFormOpen(true); };

  const filtered = useMemo(() => {
    let r = [...tasks];
    const q = query.trim().toLowerCase();
    if (q) r = r.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    if (priorityFilter !== 'all') r = r.filter((t) => t.priority === priorityFilter);
    r.sort((a, b) => {
      switch (sortBy) {
        case 'due': return (a.due || '9999').localeCompare(b.due || '9999');
        case 'priority': return PRIORITIES[b.priority].rank - PRIORITIES[a.priority].rank;
        case 'title': return a.title.localeCompare(b.title);
        default: return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    return r;
  }, [tasks, query, priorityFilter, sortBy]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-rose-100 bg-white/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="float-heart grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-400 to-violet-400 font-display text-xl text-white shadow-md">✿</div>
            <div>
              <h1 className="font-display text-lg font-bold leading-none text-rose-800">Mi Tablero</h1>
              <p className="text-[12px] text-rose-400">Organiza tu día con cariño</p>
            </div>
          </div>
          <span className="hidden rounded-full bg-rose-100 px-3 py-1 text-[12px] font-semibold text-rose-600 sm:inline">
            {tasks.length} tareas
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6">
        <StatsPanel tasks={tasks} />
        <Toolbar
          query={query} setQuery={setQuery}
          priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
          sortBy={sortBy} setSortBy={setSortBy}
          onNew={openNew}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Object.values(STATES).map((s) => (
            <Column
              key={s.id} state={s}
              tasks={filtered.filter((t) => t.status === s.id)}
              onEdit={openEdit} onDelete={handleDelete} onAdvance={handleAdvance}
            />
          ))}
        </div>
      </main>

      <TaskForm open={formOpen} onClose={() => { setFormOpen(false); setEditing(null); }} onSubmit={handleSubmit} initial={editing} />

      {toast && (
        <div className="pop fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
