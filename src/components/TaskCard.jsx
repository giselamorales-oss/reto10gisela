import { PriorityBadge } from './Badge';
import { STATES, fmtDate, fmtDateTime, isOverdue } from '../lib/utils';

const NEXT_LABEL = { pending: 'Empezar', progress: 'Terminar', done: 'Reabrir' };

export default function TaskCard({ task, onEdit, onDelete, onAdvance }) {
  const overdue = isOverdue(task);
  const stateMeta = STATES[task.status];

  return (
    <article className="pop group rounded-2xl border border-rose-100 bg-white/80 p-4 shadow-[0_4px_20px_-8px_rgba(244,114,182,0.4)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_8px_28px_-8px_rgba(244,114,182,0.55)]">
      <div className="flex items-start justify-between gap-2">
        <h4 className={`font-display text-[15px] font-semibold leading-tight ${task.status === 'done' ? 'text-rose-300 line-through' : 'text-rose-900'}`}>
          {task.title}
        </h4>
        <PriorityBadge priority={task.priority} />
      </div>

      {task.description && (
        <p className="mt-2 text-[13px] leading-snug text-rose-400 line-clamp-3">{task.description}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-rose-300">
        <span title="Creada">🕒 {fmtDateTime(task.createdAt)}</span>
        {task.due && (
          <span className={overdue ? 'font-semibold text-rose-500' : ''} title="Fecha límite">
            🌸 {fmtDate(task.due)}{overdue ? ' · ¡ups, vencida!' : ''}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-rose-50 pt-3">
        <button
          onClick={() => onAdvance(task.id)}
          className="rounded-full px-3 py-1 text-[12px] font-semibold text-white shadow-sm transition hover:opacity-90"
          style={{ background: stateMeta.dot }}
        >
          {NEXT_LABEL[task.status]} →
        </button>
        <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
          <button onClick={() => onEdit(task)} className="rounded-full p-1.5 text-rose-300 hover:bg-rose-50 hover:text-rose-600" title="Editar">✏️</button>
          <button onClick={() => onDelete(task.id)} className="rounded-full p-1.5 text-rose-300 hover:bg-rose-50 hover:text-rose-600" title="Borrar">🗑️</button>
        </div>
      </div>
    </article>
  );
}
