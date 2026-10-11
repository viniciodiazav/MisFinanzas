import React, { useState } from 'react';
import type { Transaction, Category } from '../types/finance';
import { CategoryIcon } from './CategoryIcon';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Trash2, Inbox } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  categories?: Category[];
  onDeleteTransaction: (id: string) => void;
  onOpenAddModal: () => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  categories = [],
  onDeleteTransaction,
  onOpenAddModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'expense' | 'income'>('all');

  const filtered = transactions.filter((t) => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  return (
    <section className="px-5 pt-2 pb-10">
      {/* Section Header & Filters */}
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-base font-bold text-stone-900 tracking-tight">
          Movimientos
        </h3>

        {/* Filter Pills */}
        <div className="flex items-center p-0.5 rounded-xl bg-stone-200/70 text-xs select-none">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              filter === 'expense'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-stone-500 hover:text-rose-600'
            }`}
          >
            Gastos
          </button>
          <button
            onClick={() => setFilter('income')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              filter === 'income'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-500 hover:text-emerald-600'
            }`}
          >
            Ingresos
          </button>
        </div>
      </div>

      {/* Transaction List Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-white border border-stone-200/80 p-8 text-center flex flex-col items-center justify-center my-2 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
            <Inbox className="w-6 h-6 stroke-[1.5]" />
          </div>
          <p className="text-sm font-bold text-stone-800">Sin movimientos registrados</p>
          <p className="text-xs text-stone-400 mt-1 max-w-[200px]">
            {filter === 'all'
              ? 'Empieza registrando un gasto o ingreso para controlar tu dinero.'
              : `No hay ${filter === 'expense' ? 'gastos' : 'ingresos'} en este filtro.`}
          </p>
          <button
            onClick={onOpenAddModal}
            className="mt-4 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold active:scale-95 transition-all shadow-xs"
          >
            Registrar movimiento
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((item) => {
            const isIncome = item.type === 'income';

            return (
              <div
                key={item.id}
                className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] active:scale-[0.99] transition-transform select-none"
              >
                {/* Left: Icon & Description */}
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <CategoryIcon
                    category={item.category}
                    type={item.type}
                    categories={categories}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-stone-900 truncate">
                      {item.description || item.category}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] text-stone-500 font-medium">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-stone-300">•</span>
                      <span className="text-[11px] text-stone-400">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Quick delete */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="text-right">
                    <span
                      className={`text-sm font-bold tabular-nums tracking-tight ${
                        isIncome ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isIncome ? '+' : '-'} {formatCurrency(item.amount)}
                    </span>
                  </div>

                  <button
                    onClick={() => onDeleteTransaction(item.id)}
                    aria-label="Eliminar movimiento"
                    className="p-1.5 rounded-xl text-stone-300 hover:text-rose-600 hover:bg-rose-50 active:scale-90 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
