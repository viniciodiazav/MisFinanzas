import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import {
  formatMonthName,
  getPreviousMonth,
  getNextMonth,
  getCurrentMonthStr,
} from '../utils/formatters';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (newMonth: string) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthChange,
}) => {
  const currentMonthStr = getCurrentMonthStr();
  const isCurrentMonth = selectedMonth === currentMonthStr;

  return (
    <div className="px-5 pt-1 pb-2 flex items-center justify-between select-none">
      {/* Month Navigation Pill */}
      <div className="flex items-center gap-1 bg-white border border-stone-200/90 rounded-2xl p-1 shadow-2xs">
        <button
          onClick={() => onMonthChange(getPreviousMonth(selectedMonth))}
          aria-label="Mes anterior"
          className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 active:scale-90 transition-all"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="px-2 py-0.5 flex items-center gap-1.5 min-w-[130px] justify-center">
          <Calendar className="w-3.5 h-3.5 text-stone-400 stroke-[2]" />
          <span className="text-xs font-bold text-stone-800 tracking-tight">
            {formatMonthName(selectedMonth)}
          </span>
        </div>

        <button
          onClick={() => onMonthChange(getNextMonth(selectedMonth))}
          aria-label="Mes siguiente"
          className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 active:scale-90 transition-all"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Quick jump to current month button if not currently on it */}
      {!isCurrentMonth && (
        <button
          onClick={() => onMonthChange(currentMonthStr)}
          className="px-2.5 py-1.5 rounded-xl bg-stone-900 text-white text-[11px] font-bold active:scale-95 transition-all shadow-2xs animate-in fade-in"
        >
          Ir a este mes
        </button>
      )}
    </div>
  );
};
