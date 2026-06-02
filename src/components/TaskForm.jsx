import { useState, useEffect } from 'react';
import { PRIORITIES } from '../lib/utils';

const empty = { title: '', description: '', priority: 'medium', due: '', status: 'pending' };

export default function TaskForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) { setForm(initial ? { ...empty, ...initial } : empty); setErrors({}); }
  }, [open, initial]);

  if (!open) return null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const inp = (err) => `mt-1 w-full rounded-xl border px-3 py-2 text-sm text-rose-800 outline-none focus:ring-2 ${err ? 'border-rose-400 focus:ring-rose-200' : 'border-rose-200 focus:ring-rose-200'}`;

  const validate = () => {
    const er = {};
    if (!form.title.trim()) er.title = 'Ponle un nombre a tu tarea ✿';
    else if (form.title.trim().length < 3) er.title = 'Mínimo 3 letras.';
    if (form.due && new Date(form.due) < new Date(new Date().toDateString()))
      er.due = 'La fecha no puede ser en el pasado.';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-rose-900/20 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div className="fade-in w-full max-w-lg rounded-t-3xl border border-rose-100 bg-white p-6 shadow-2xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-display text-xl font-bold text-rose-800">
          {initial ? 'Editar tarea ✿' : 'Nueva tarea ✿'}
        </h3>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-[13px] font-semibold text-rose-500">Título *</label>
            <input value={form.title} onChange={set('title')} autoFocus className={inp(errors.title)} placeholder="Ej. Organizar mi semana" />
            {errors.title && <p className="mt-1 text-[12px] text-rose-500">⚠ {errors.title}</p>}
          </div>

          <div>
            <label className="text-[13px] font-semibold text-rose-500">Descripción</label>
            <textarea value={form.description} onChange={set('description')} rows={3}
              className="mt-1 w-full resize-none rounded-xl border border-rose-200 px-3 py-2 text-sm text-rose-800 outline-none focus:ring-2 focus:ring-rose-200"
              placeholder="Cuéntame un poco más…" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[13px] font-semibold text-rose-500">Prioridad</label>
              <select value={form.priority} onChange={set('priority')} className={inp(false)}>
                {Object.values(PRIORITIES).map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[13px] font-semibold text-rose-500">Fecha límite</label>
              <input type="date" value={form.due} onChange={set('due')} className={inp(errors.due)} />
              {errors.due && <p className="mt-1 text-[12px] text-rose-500">⚠ {errors.due}</p>}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-full px-4 py-2 text-sm font-semibold text-rose-400 hover:bg-rose-50">Cancelar</button>
          <button onClick={submit} className="rounded-full bg-gradient-to-r from-rose-400 to-pink-400 px-5 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg">
            {initial ? 'Guardar ✿' : 'Crear ✿'}
          </button>
        </div>
      </div>
    </div>
  );
}
