import React, { useState, useRef } from 'react';
import type { Category, TransactionType } from '../types/finance';
import { AVAILABLE_ICONS, AVAILABLE_COLORS } from '../utils/categoryPresets';
import { X, Check } from 'lucide-react';

interface CategoryModalProps {
  isOpen: boolean;
  initialType?: TransactionType;
  onClose: () => void;
  onSaveCategory: (category: Omit<Category, 'id'>) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  initialType = 'expense',
  onClose,
  onSaveCategory,
}) => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<TransactionType>(initialType);
  const [selectedIcon, setSelectedIcon] = useState<string>(AVAILABLE_ICONS[0].id);
  const [selectedColor, setSelectedColor] = useState<string>(
    initialType === 'expense' ? AVAILABLE_COLORS[0].hex : AVAILABLE_COLORS[1].hex
  );

  // Interactive drag state
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef<number | null>(null);

  const handleDragStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleDragMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;
    if (deltaY > 0) {
      setDragY(deltaY);
    } else {
      setDragY(deltaY * 0.2);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    touchStartY.current = null;
    if (dragY > 90) {
      setDragY(0);
      onClose();
    } else {
      setDragY(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveCategory({
      name: name.trim(),
      type,
      icon: selectedIcon,
      color: selectedColor,
    });

    setName('');
    onClose();
  };

  const SelectedIconDef = AVAILABLE_ICONS.find((i) => i.id === selectedIcon) || AVAILABLE_ICONS[0];
  const IconComponent = SelectedIconDef.icon;

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center transition-all duration-300 ${
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal Drawer with interactive drag transform */}
      <div
        style={{
          transform: isDragging
            ? `translateY(${Math.max(0, dragY)}px)`
            : undefined,
          transition: isDragging
            ? 'none'
            : 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
        }}
        className={`relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 max-h-[92vh] overflow-y-auto no-scrollbar ${
          isOpen && !isDragging
            ? 'translate-y-0'
            : !isDragging
            ? 'translate-y-full sm:translate-y-6 sm:scale-95'
            : ''
        }`}
      >
        {/* Interactive Drag Handle Area */}
        <div
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          className="w-full pt-0 pb-3 -mt-2 flex flex-col items-center cursor-grab active:cursor-grabbing touch-none select-none"
        >
          <div className="w-12 h-1.5 bg-stone-300 rounded-full transition-colors active:bg-stone-500" />
        </div>

        {/* Header - Also draggable */}
        <div
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          className="flex items-center justify-between pb-3 cursor-grab select-none"
        >
          <h3 className="text-lg font-bold text-stone-900 tracking-tight">
            Nueva Categoría
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 active:scale-90 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Card */}
        <div className="my-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3.5">
          <div
            style={{
              backgroundColor: `${selectedColor}22`,
              borderColor: `${selectedColor}55`,
              color: selectedColor,
            }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs"
          >
            <IconComponent className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Vista previa
            </span>
            <span className="text-base font-bold text-stone-900">
              {name.trim() || 'Nombre de la categoría'}
            </span>
            <span className="text-xs text-stone-500 block">
              {type === 'expense' ? 'Gasto' : 'Ingreso'}
            </span>
          </div>
        </div>

        {/* Type Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-2xl my-3">
          <button
            type="button"
            onClick={() => {
              setType('expense');
              setSelectedColor(AVAILABLE_COLORS[0].hex); // Rose
            }}
            className={`py-2 rounded-xl text-sm font-bold transition-all select-none ${
              type === 'expense'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Para Gastos
          </button>
          <button
            type="button"
            onClick={() => {
              setType('income');
              setSelectedColor(AVAILABLE_COLORS[1].hex); // Emerald
            }}
            className={`py-2 rounded-xl text-sm font-bold transition-all select-none ${
              type === 'income'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Para Ingresos
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Name Input */}
          <div>
            <label className="text-xs font-semibold text-stone-600 block mb-1.5">
              Nombre de la categoría
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Gym, Mascota, Suscripciones..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-400 transition-all"
            />
          </div>

          {/* Color Picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-600">
                Color identificador ({AVAILABLE_COLORS.length} colores)
              </label>
              <span className="text-[11px] text-stone-400">
                {AVAILABLE_COLORS.find((c) => c.hex === selectedColor)?.name}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2 max-h-36 overflow-y-auto no-scrollbar p-1.5 rounded-xl bg-stone-50 border border-stone-200">
              {AVAILABLE_COLORS.map((color) => {
                const isSelected = selectedColor === color.hex;
                return (
                  <button
                    type="button"
                    key={color.id}
                    onClick={() => setSelectedColor(color.hex)}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    className={`h-9 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'ring-3 ring-stone-900 ring-offset-2 scale-105 shadow-xs'
                        : 'opacity-90 hover:opacity-100 hover:scale-102'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Icon Picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-600">
                Elige un icono ({AVAILABLE_ICONS.length} disponibles)
              </label>
              <span className="text-[11px] text-stone-400">
                {SelectedIconDef.name}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto no-scrollbar p-1.5 rounded-xl bg-stone-50 border border-stone-200">
              {AVAILABLE_ICONS.map((iconItem) => {
                const ItemIcon = iconItem.icon;
                const isSelected = selectedIcon === iconItem.id;

                return (
                  <button
                    type="button"
                    key={iconItem.id}
                    onClick={() => setSelectedIcon(iconItem.id)}
                    title={iconItem.name}
                    className={`p-2.5 rounded-xl flex items-center justify-center transition-all active:scale-90 ${
                      isSelected
                        ? 'bg-stone-900 text-white shadow-xs scale-105'
                        : 'text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
                    }`}
                  >
                    <ItemIcon className="w-5 h-5 stroke-[2]" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm select-none"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Guardar Categoría</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
