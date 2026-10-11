import React from 'react';
import { Home, Receipt, PieChart, Settings } from 'lucide-react';
import type { ActiveTab } from '../types/finance';

interface BottomNavProps {
  currentTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs = [
    { id: 'home' as ActiveTab, label: 'Inicio', icon: Home },
    { id: 'history' as ActiveTab, label: 'Historial', icon: Receipt },
    { id: 'analytics' as ActiveTab, label: 'Resumen', icon: PieChart },
    { id: 'settings' as ActiveTab, label: 'Ajustes', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-stone-200/70 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] select-none">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all duration-150 active:scale-90 ${
                isActive
                  ? 'text-stone-900 font-semibold'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-stone-100 text-stone-900' : 'bg-transparent'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
