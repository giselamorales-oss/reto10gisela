import TaskCard from './TaskCard';

export default function Column({ state, tasks, onEdit, onDelete, onAdvance }) {
  return (
    <section className="flex w-full flex-col rounded-3xl border border-white/60 bg-white/40 p-3 backdrop-blur-sm">
      <header className="mb-3 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: state.dot }} />
          <h3 className="font-display text-sm font-semibold text-rose-700">{state.label}</h3>
        </div>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-[12px] font-bold text-rose-400 shadow-sm">
          {tasks.length}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-rose-100 px-3 py-8 text-center text-[13px] text-rose-300">
            Nada por aquí ✿
          </div>
        ) : (
          tasks.map((t) => (
            <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} onAdvance={onAdvance} />
          ))
        )}
      </div>
    </section>
  );
}
