import React from 'react';
import type { Transaction, Category } from '../types/finance';
import { formatCurrency, formatMonthName } from '../utils/formatters';
import { MonthSelector } from './MonthSelector';
import { MonthlyLineChart } from './MonthlyLineChart';
import { Inbox } from 'lucide-react';

interface AnalyticsViewProps {
  transactions: Transaction[];
  categories?: Category[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  transactions,
  categories = [],
  selectedMonth,
  onMonthChange,
}) => {
  // Filter transactions for selected month
  const monthlyTransactions = transactions.filter((t) =>
    t.date.startsWith(selectedMonth)
  );

  const incomeTotal = monthlyTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenseTotal = monthlyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = incomeTotal - expenseTotal;

  // Group expenses by category for this month
  const expensesByCategory: Record<string, number> = {};
  monthlyTransactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });

  const sortedCategories = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]);

  return (
    <div className="pt-1 pb-10 space-y-3">
      {/* Month Selector Component */}
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={onMonthChange}
      />

      <div className="px-5 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Reporte Mensual
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Balance y desglose de {formatMonthName(selectedMonth)}
          </p>
        </div>

        {/* Monthly Summary Card */}
        <div className="rounded-3xl bg-white p-5 border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Resultado Neto
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                netBalance >= 0
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {netBalance >= 0 ? 'Superávit' : 'Déficit'}
            </span>
          </div>

          <div>
            <span
              className={`text-3xl font-extrabold tracking-tight tabular-nums ${
                netBalance >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {netBalance >= 0 ? '+' : ''}
              {formatCurrency(netBalance)}
            </span>
          </div>

          {/* Solid ratio bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
              <span>Tasa de retención</span>
              <span className="font-bold text-stone-900">
                {incomeTotal > 0
                  ? `${Math.max(0, Math.round(((incomeTotal - expenseTotal) / incomeTotal) * 100))}%`
                  : '0%'}
              </span>
            </div>

            <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden flex shadow-inner">
              {incomeTotal + expenseTotal > 0 ? (
                <>
                  <div
                    className="bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${(incomeTotal / (incomeTotal + expenseTotal)) * 100}%`,
                    }}
                  />
                  <div
                    className="bg-rose-500 transition-all duration-500"
                    style={{
                      width: `${(expenseTotal / (incomeTotal + expenseTotal)) * 100}%`,
                    }}
                  />
                </>
              ) : (
                <div className="w-full bg-stone-200" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] text-stone-400 font-medium">Ingresos</span>
                <span className="text-xs font-bold text-emerald-800">
                  {formatCurrency(incomeTotal)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] text-stone-400 font-medium">Gastos</span>
                <span className="text-xs font-bold text-rose-800">
                  {formatCurrency(expenseTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Line Trend Chart */}
        <MonthlyLineChart
          transactions={monthlyTransactions}
          selectedMonth={selectedMonth}
        />

        {/* Top Expense Categories for this month */}
        <div className="rounded-3xl bg-white p-5 border border-stone-200/80 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-stone-900">
            Gastos por Categoría ({formatMonthName(selectedMonth)})
          </h4>

          {sortedCategories.length === 0 ? (
            <div className="py-6 text-center flex flex-col items-center">
              <Inbox className="w-8 h-8 text-stone-300 stroke-[1.5] mb-2" />
              <p className="text-xs text-stone-500 font-medium">
                No hay gastos registrados en este mes.
              </p>
            </div>
          ) : (
            <div className="space-y-3 pt-1">
              {sortedCategories.map(([catName, total]) => {
                const percent =
                  expenseTotal > 0 ? Math.round((total / expenseTotal) * 100) : 0;
                const matchedCat = categories.find(
                  (c) => c.name.toLowerCase() === catName.toLowerCase()
                );
                const colorHex = matchedCat?.color || '#f43f5e';

                return (
                  <div key={catName} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-stone-800">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: colorHex }}
                        />
                        <span>{catName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-stone-400 text-[11px] font-medium">
                          {percent}%
                        </span>
                        <span className="font-bold text-rose-700">
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: colorHex,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
