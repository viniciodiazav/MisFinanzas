import { useState, useRef } from 'react';
import type { Transaction, TransactionType, Category } from '../types/finance';
import { CategoryModal } from './CategoryModal';
import { X, Check, Plus } from 'lucide-react';

interface AddTransactionModalProps {
  isOpen: boolean;
  selectedMonth?: string;
  initialType?: TransactionType;
  categories: Category[];
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  selectedMonth,
  initialType = 'expense',
  categories,
  onClose,
  onSave,
  onAddCategory,
}) => {
  const [type, setType] = useState<TransactionType>(initialType);
  const [amount, setAmount] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(() => {
    const today = new Date().toISOString().split('T')[0];
    if (selectedMonth && !today.startsWith(selectedMonth)) {
      return `${selectedMonth}-01`;
    }
    return today;
  });
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Interactive drag state
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef<number | null>(null);

  const availableCategories = categories.filter((c) => c.type === type);
  const activeCategory = selectedCategory || (availableCategories[0]?.name ?? '');

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    const matching = categories.filter((c) => c.type === newType);
    setSelectedCategory(matching.length > 0 ? matching[0].name : '');
  };

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
      setDragY(deltaY * 0.2); // slight resistance
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
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    const finalCategory = activeCategory.trim() || (type === 'expense' ? 'Gasto' : 'Ingreso');

    onSave({
      type,
      amount: parsedAmount,
      category: finalCategory,
      description: description.trim() || finalCategory,
      date,
    });

    // Reset and close
    setAmount('');
    setDescription('');
    onClose();
  };

  const handleCreatedCategory = (newCat: Omit<Category, 'id'>) => {
    onAddCategory(newCat);
    setSelectedCategory(newCat.name);
    setIsCategoryModalOpen(false);
  };

  const isExpense = type === 'expense';

  return (
    <>
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

        {/* Bottom Sheet Drawer with interactive drag transform */}
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
              Registrar Movimiento
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 active:scale-90 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Type Toggle: Solid Red vs Solid Green */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-2xl my-3">
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`py-2.5 rounded-xl text-sm font-bold transition-all select-none ${
                isExpense
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Gasto
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`py-2.5 rounded-xl text-sm font-bold transition-all select-none ${
                !isExpense
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Ingreso
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-3">
            {/* Amount Input */}
            <div className="text-center py-2">
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                Monto
              </label>
              <div className="inline-flex items-center justify-center gap-1">
                <span
                  className={`text-3xl font-extrabold ${
                    isExpense ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  $
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]*"
                  autoComplete="off"
                  required
                  autoFocus
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value.replace(',', '.');
                    if (/^\d*\.?\d{0,2}$/.test(val)) {
                      setAmount(val);
                    }
                  }}
                  className={`w-52 text-3xl sm:text-4xl font-extrabold text-center bg-transparent focus:outline-hidden tracking-tight tabular-nums ${
                    isExpense ? 'text-rose-700' : 'text-emerald-700'
                  }`}
                />
              </div>
            </div>

            {/* Custom Categories Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-stone-600">
                  Categoría
                </label>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="flex items-center gap-1 text-[11px] font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded-lg transition-all"
                >
                  <Plus className="w-3 h-3 stroke-[2.5]" />
                  <span>Crear nueva</span>
                </button>
              </div>

              {availableCategories.length === 0 ? (
                <div className="p-3 text-center rounded-xl bg-stone-50 border border-dashed border-stone-200">
                  <p className="text-xs text-stone-500 mb-2">
                    Aún no tienes categorías de {isExpense ? 'gasto' : 'ingreso'}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold active:scale-95 transition-all"
                  >
                    + Crear categoría
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto no-scrollbar p-0.5">
                  {availableCategories.map((cat) => {
                    const isSelected = activeCategory === cat.name;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all select-none border ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-xs scale-102'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Description / Concept */}
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1.5">
                Concepto (Opcional)
              </label>
              <input
                type="text"
                placeholder={`Ej: ${activeCategory || 'Detalle del movimiento'}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-400 transition-all"
              />
            </div>

            {/* Date Picker */}
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1.5">
                Fecha
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-400 transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
              <button
                type="submit"
                disabled={!amount || parseFloat(amount) <= 0}
                className={`w-full py-3.5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm select-none ${
                  isExpense
                    ? 'bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300'
                    : 'bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300'
                }`}
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Guardar {isExpense ? 'Gasto' : 'Ingreso'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Embedded Category Creation Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        initialType={type}
        onClose={() => setIsCategoryModalOpen(false)}
        onSaveCategory={handleCreatedCategory}
      />
    </>
  );
};
