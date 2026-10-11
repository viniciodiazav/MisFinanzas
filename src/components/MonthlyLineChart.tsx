import React, { useState } from 'react';
import type { Transaction } from '../types/finance';
import { formatCurrency } from '../utils/formatters';

interface MonthlyLineChartProps {
  transactions: Transaction[];
  selectedMonth: string; // 'YYYY-MM'
}

export const MonthlyLineChart: React.FC<MonthlyLineChartProps> = ({
  transactions,
  selectedMonth,
}) => {
  const [activePoint, setActivePoint] = useState<{
    day: number;
    income: number;
    expense: number;
  } | null>(null);

  const [yearStr, monthStr] = selectedMonth.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const daysInMonth = new Date(year, month, 0).getDate();

  // Aggregate daily data
  const dailyIncome: number[] = new Array(daysInMonth).fill(0);
  const dailyExpense: number[] = new Array(daysInMonth).fill(0);

  transactions
    .filter((t) => t.date.startsWith(selectedMonth))
    .forEach((t) => {
      const day = parseInt(t.date.split('-')[2], 10);
      if (day >= 1 && day <= daysInMonth) {
        if (t.type === 'income') {
          dailyIncome[day - 1] += t.amount;
        } else {
          dailyExpense[day - 1] += t.amount;
        }
      }
    });

  const maxVal = Math.max(
    ...dailyIncome,
    ...dailyExpense,
    500 // minimum scale floor
  );

  // SVG coordinate dimensions
  const width = 360;
  const height = 170;
  const padLeft = 10;
  const padRight = 10;
  const padTop = 24;
  const padBottom = 28;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const getX = (index: number) => padLeft + (index / (daysInMonth - 1)) * chartW;
  const getY = (val: number) => padTop + chartH - (val / maxVal) * chartH;

  // Build SVG Path strings
  const buildPath = (data: number[]) => {
    return data
      .map((val, idx) => {
        const x = getX(idx);
        const y = getY(val);
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const incomePath = buildPath(dailyIncome);
  const expensePath = buildPath(dailyExpense);

  const incomeAreaPath = `${incomePath} L ${getX(daysInMonth - 1)},${padTop + chartH} L ${getX(0)},${padTop + chartH} Z`;
  const expenseAreaPath = `${expensePath} L ${getX(daysInMonth - 1)},${padTop + chartH} L ${getX(0)},${padTop + chartH} Z`;

  const hasData = dailyIncome.some((v) => v > 0) || dailyExpense.some((v) => v > 0);

  // Key day markers for X axis
  const dayMarkers = [1, Math.round(daysInMonth * 0.25), Math.round(daysInMonth * 0.5), Math.round(daysInMonth * 0.75), daysInMonth];

  return (
    <div className="rounded-3xl bg-white p-5 border border-stone-200/80 shadow-xs space-y-3">
      {/* Header and Legend */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-stone-900 tracking-tight">Tendencia del Mes</h4>
          <span className="text-[11px] text-stone-400 font-medium">Evolución diaria de flujos</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold text-emerald-800">Ingresos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-[11px] font-bold text-rose-800">Gastos</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative pt-1 select-none">
        {/* Floating Tooltip if touching a point */}
        {activePoint && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-stone-900/90 text-white text-[11px] py-1 px-3 rounded-full shadow-lg flex items-center gap-2 z-20 pointer-events-none">
            <span className="font-bold">Día {activePoint.day}:</span>
            {activePoint.income > 0 && (
              <span className="text-emerald-400">+{formatCurrency(activePoint.income)}</span>
            )}
            {activePoint.expense > 0 && (
              <span className="text-rose-400">-{formatCurrency(activePoint.expense)}</span>
            )}
            {activePoint.income === 0 && activePoint.expense === 0 && (
              <span className="text-stone-300">Sin movimientos</span>
            )}
          </div>
        )}

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-44 overflow-visible touch-none"
        >
          <defs>
            {/* Income Gradient */}
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>

            {/* Expense Gradient */}
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid guide lines */}
          {[0, 0.33, 0.66, 1].map((pct, idx) => {
            const y = padTop + chartH * pct;
            return (
              <line
                key={idx}
                x1={padLeft}
                y1={y}
                x2={width - padRight}
                y2={y}
                stroke="#e7e5e4"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            );
          })}

          {hasData && (
            <>
              {/* Area Fills */}
              <path d={incomeAreaPath} fill="url(#incomeGrad)" />
              <path d={expenseAreaPath} fill="url(#expenseGrad)" />

              {/* Stroke Lines */}
              <path
                d={incomePath}
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={expensePath}
                fill="none"
                stroke="#e11d48"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Data Dots on active days */}
              {dailyIncome.map((val, idx) => {
                if (val === 0) return null;
                const x = getX(idx);
                const y = getY(val);
                return (
                  <circle
                    key={`inc-${idx}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#059669"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="cursor-pointer"
                  />
                );
              })}

              {dailyExpense.map((val, idx) => {
                if (val === 0) return null;
                const x = getX(idx);
                const y = getY(val);
                return (
                  <circle
                    key={`exp-${idx}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#e11d48"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="cursor-pointer"
                  />
                );
              })}
            </>
          )}

          {/* Touch detection columns for each day */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const colWidth = chartW / daysInMonth;
            const x = getX(idx) - colWidth / 2;
            return (
              <rect
                key={`touch-${idx}`}
                x={x}
                y={padTop}
                width={colWidth}
                height={chartH}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() =>
                  setActivePoint({
                    day: idx + 1,
                    income: dailyIncome[idx],
                    expense: dailyExpense[idx],
                  })
                }
                onTouchStart={() =>
                  setActivePoint({
                    day: idx + 1,
                    income: dailyIncome[idx],
                    expense: dailyExpense[idx],
                  })
                }
              />
            );
          })}

          {/* X Axis Day Labels */}
          {dayMarkers.map((day) => {
            const x = getX(day - 1);
            return (
              <text
                key={`label-${day}`}
                x={x}
                y={height - 6}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#a8a29e"
              >
                {day}
              </text>
            );
          })}
        </svg>

        {!hasData && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs font-semibold text-stone-400 bg-white/80 px-3 py-1 rounded-full">
              Sin movimientos registrados en este mes
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
