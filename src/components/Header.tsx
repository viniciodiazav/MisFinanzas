import React, { useState } from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu }) => {
  const [today] = useState<string>(() =>
    new Intl.DateTimeFormat('es-MX', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(new Date())
  );

  return (
    <header className="pt-[max(env(safe-area-inset-top),1rem)] px-5 pb-3 flex items-center justify-between select-none">
      <div className="flex flex-col">
        <span className="text-[11px] font-medium tracking-wider uppercase text-stone-400">
          {today}
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 mt-0.5">
          MisFinanzas
        </h1>
      </div>

      {/* Hamburger Menu Button */}
      <button
        onClick={onOpenMenu}
        aria-label="Abrir menú"
        className="w-10 h-10 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-stone-50 active:scale-90 transition-all"
      >
        <Menu className="w-5 h-5 stroke-[2.2]" />
      </button>
    </header>
  );
};
