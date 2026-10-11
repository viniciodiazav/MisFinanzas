import React, { useRef } from 'react';
import { Home, Receipt, Tags, PieChart, Settings, X } from 'lucide-react';
import type { ActiveTab } from '../types/finance';

interface HamburgerMenuProps {
  isOpen: boolean;
  activeTab: ActiveTab;
  onClose: () => void;
  onSelectTab: (tab: ActiveTab) => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  activeTab,
  onClose,
  onSelectTab,
}) => {
  const touchStartX = useRef<number | null>(null);

  const menuItems = [
    { id: 'home' as ActiveTab, label: 'Inicio', desc: 'Balance general y accesos', icon: Home },
    { id: 'history' as ActiveTab, label: 'Movimientos', desc: 'Historial de transacciones', icon: Receipt },
    { id: 'categories' as ActiveTab, label: 'Categorías', desc: 'Crea y personaliza iconos y colores', icon: Tags },
    { id: 'analytics' as ActiveTab, label: 'Resumen Visual', desc: 'Gráficas y balance', icon: PieChart },
    { id: 'settings' as ActiveTab, label: 'Ajustes', desc: 'Exportar respaldo y datos', icon: Settings },
  ];

  const handleSelect = (tab: ActiveTab) => {
    onSelectTab(tab);
    onClose();
  };

  // Swipe to close gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const currentX = e.touches[0].clientX;
    const diff = touchStartX.current - currentX;
    // If swiped left by more than 50px, smoothly close
    if (diff > 50) {
      touchStartX.current = null;
      onClose();
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex transition-all duration-300 ${
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
    >
      {/* Dark backdrop blur with smooth fade */}
      <div
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel with smooth spring glide */}
      <aside
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-4/5 max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col justify-between pt-[max(env(safe-area-inset-top),1.5rem)] pb-[max(env(safe-area-inset-bottom),1.5rem)] px-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-100">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-stone-900">MisFinanzas</h2>
              <p className="text-xs text-stone-400 mt-0.5">Control personal</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar menú"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 active:scale-90 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-left transition-all active:scale-[0.98] ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs font-semibold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-white/15 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                    <span
                      className={`text-[11px] truncate ${
                        isActive ? 'text-stone-300' : 'text-stone-400'
                      }`}
                    >
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-stone-100 text-center">
          <p className="text-[11px] text-stone-400">MisFinanzas • Minimalista</p>
        </div>
      </aside>
    </div>
  );
};
