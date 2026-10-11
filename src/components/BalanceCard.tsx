import React, { useState } from 'react';
import { Eye, EyeOff, ArrowDownLeft, ArrowUpRight, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
  onAddTransaction: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  income,
  expenses,
  onAddTransaction,
}) => {
  const [showBalance, setShowBalance] = useState<boolean>(true);

  return (
    <div className="px-5 pt-1 pb-3">
      {/* Main Balance Canvas */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-5 border border-stone-200 shadow-sm">
        <div className="relative z-10">
          {/* Top row: Label and Eye Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
              Balance Disponible
            </span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              aria-label={showBalance ? 'Ocultar balance' : 'Mostrar balance'}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 active:scale-90 transition-all"
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>

          {/* Large Balance Amount */}
          <div className="mt-2 mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 tabular-nums">
              {showBalance ? formatCurrency(balance) : '••••••••'}
            </h2>
          </div>

          {/* Solid Green & Solid Red Summary Badges */}
          <div className="grid grid-cols-2 gap-3">
            {/* Income pill (Solid Green Accent) */}
            <div className="rounded-2xl bg-emerald-100/90 p-3.5 border border-emerald-300 flex flex-col justify-between transition-colors">
              <div className="flex items-center gap-1.5 text-emerald-900 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-2xs">
                  <ArrowDownLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold tracking-tight">Ingresos</span>
              </div>
              <span className="text-base font-bold text-emerald-950 tabular-nums">
                {showBalance ? formatCurrency(income) : '••••'}
              </span>
            </div>

            {/* Expense pill (Solid Red Accent) */}
            <div className="rounded-2xl bg-rose-100/90 p-3.5 border border-rose-300 flex flex-col justify-between transition-colors">
              <div className="flex items-center gap-1.5 text-rose-900 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-2xs">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold tracking-tight">Gastos</span>
              </div>
              <span className="text-base font-bold text-rose-950 tabular-nums">
                {showBalance ? formatCurrency(expenses) : '••••'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Single "Registrar Movimiento" Button */}
      <div className="mt-3">
        <button
          onClick={onAddTransaction}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 active:scale-[0.98] transition-all text-white font-bold text-sm shadow-sm select-none"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Plus className="w-4 h-4 stroke-[3]" />
          </div>
          <span>Registrar Movimiento</span>
        </button>
      </div>
    </div>
  );
};
