import React, { useState } from 'react';
import type { Category, TransactionType } from '../types/finance';
import { CategoryIcon } from './CategoryIcon';
import { Plus, Trash2, FolderPlus } from 'lucide-react';
import { CategoryModal } from './CategoryModal';

interface CategoriesViewProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onDeleteCategory: (id: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<TransactionType>('expense');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'expense' | 'income'>('all');

  const handleOpenAdd = (type: TransactionType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const filteredCategories = categories.filter((c) => {
    if (selectedFilter === 'all') return true;
    return c.type === selectedFilter;
  });

  return (
    <div className="px-5 pt-2 pb-24 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">Mis Categorías</h2>
          <p className="text-xs text-stone-500 mt-0.5">Personaliza iconos y colores a tu gusto</p>
        </div>

        <button
          onClick={() => handleOpenAdd('expense')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-stone-900 text-white text-xs font-bold active:scale-95 transition-all shadow-xs"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Crear</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center p-1 rounded-2xl bg-stone-200/60 text-xs select-none">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
            selectedFilter === 'all'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Todas ({categories.length})
        </button>
        <button
          onClick={() => setSelectedFilter('expense')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
            selectedFilter === 'expense'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'text-stone-500 hover:text-rose-600'
          }`}
        >
          Gastos
        </button>
        <button
          onClick={() => setSelectedFilter('income')}
          className={`flex-1 py-1.5 rounded-xl font-bold transition-all ${
            selectedFilter === 'income'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-stone-500 hover:text-emerald-600'
          }`}
        >
          Ingresos
        </button>
      </div>

      {/* Categories List */}
      {filteredCategories.length === 0 ? (
        <div className="rounded-3xl bg-white border border-stone-200 p-8 text-center flex flex-col items-center justify-center my-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
            <FolderPlus className="w-6 h-6 stroke-[1.5]" />
          </div>
          <p className="text-sm font-bold text-stone-800">No hay categorías aquí</p>
          <p className="text-xs text-stone-400 mt-1 max-w-[220px]">
            Crea tu primera categoría personalizada con su propio icono y color.
          </p>
          <button
            onClick={() => handleOpenAdd(selectedFilter === 'income' ? 'income' : 'expense')}
            className="mt-4 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold active:scale-95 transition-all shadow-xs"
          >
            Crear Categoría
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-xs transition-all"
            >
              <div className="flex items-center gap-3">
                <CategoryIcon
                  category={cat.name}
                  customIcon={cat.icon}
                  customColor={cat.color}
                  type={cat.type}
                />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{cat.name}</h4>
                  <span
                    className={`text-[11px] font-semibold ${
                      cat.type === 'income' ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {cat.type === 'income' ? 'Ingreso' : 'Gasto'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (window.confirm(`¿Eliminar la categoría "${cat.name}"?`)) {
                    onDeleteCategory(cat.id);
                  }
                }}
                aria-label={`Eliminar categoría ${cat.name}`}
                className="p-2 rounded-xl text-stone-300 hover:text-rose-600 hover:bg-rose-50 active:scale-90 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Category Creation Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        initialType={modalType}
        onClose={() => setIsModalOpen(false)}
        onSaveCategory={onAddCategory}
      />
    </div>
  );
};
