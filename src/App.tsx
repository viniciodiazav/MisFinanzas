import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MonthSelector } from './components/MonthSelector';
import { BalanceCard } from './components/BalanceCard';
import { TransactionList } from './components/TransactionList';
import { AddTransactionModal } from './components/AddTransactionModal';
import { HamburgerMenu } from './components/HamburgerMenu';
import { CategoriesView } from './components/CategoriesView';
import { SettingsView } from './components/SettingsView';
import { AnalyticsView } from './components/AnalyticsView';
import type { Transaction, TransactionType, ActiveTab, Category } from './types/finance';
import {
  loadTransactions,
  saveTransactions,
  loadCategories,
  saveCategories,
} from './utils/storage';
import { getCurrentMonthStr } from './utils/formatters';

export const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadTransactions());
  const [categories, setCategories] = useState<Category[]>(() => loadCategories());
  const [selectedMonth, setSelectedMonth] = useState<string>(() => getCurrentMonthStr());
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<TransactionType>('expense');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync transactions to localStorage
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // Sync categories to localStorage
  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Filter transactions for currently selected month
  const monthlyTransactions = transactions.filter((t) =>
    t.date.startsWith(selectedMonth)
  );

  // Metrics for currently selected month
  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const monthlyExpenses = monthlyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const monthlyBalance = monthlyIncome - monthlyExpenses;

  // Handlers for Transactions
  const handleOpenAddModal = (type: TransactionType = 'expense') => {
    setModalType(type);
    setIsAddModalOpen(true);
  };

  const handleSaveTransaction = (
    newTx: Omit<Transaction, 'id' | 'createdAt'>
  ) => {
    const created: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: Date.now(),
    };

    setTransactions((prev) => [created, ...prev]);
    showToast(
      created.type === 'income' ? '✓ Ingreso registrado' : '✓ Gasto registrado'
    );
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast('Movimiento eliminado');
  };

  // Handlers for Categories
  const handleAddCategory = (newCat: Omit<Category, 'id'>) => {
    const created: Category = {
      ...newCat,
      id: `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setCategories((prev) => [...prev, created]);
    showToast(`Categoría "${created.name}" creada`);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Categoría eliminada');
  };

  const handleRefreshData = () => {
    setTransactions(loadTransactions());
    setCategories(loadCategories());
    showToast('Datos actualizados');
  };

  return (
    <div className="min-h-screen bg-stone-100/70 sm:py-6 flex justify-center items-start">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[850px] sm:max-h-[920px] bg-[#fafaf9] sm:rounded-[42px] sm:shadow-2xl sm:border sm:border-stone-200/80 flex flex-col relative overflow-hidden">
        {/* Top Header with Hamburger Button */}
        <Header onOpenMenu={() => setIsMenuOpen(true)} />

        {/* Dynamic Views */}
        <main className="flex-1 overflow-y-auto no-scrollbar touch-pan-y">
          {activeTab === 'home' && (
            <>
              {/* Monthly Navigator */}
              <MonthSelector
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
              />
              <BalanceCard
                balance={monthlyBalance}
                income={monthlyIncome}
                expenses={monthlyExpenses}
                onAddTransaction={() => handleOpenAddModal('expense')}
              />
              <TransactionList
                transactions={monthlyTransactions}
                categories={categories}
                onDeleteTransaction={handleDeleteTransaction}
                onOpenAddModal={() => handleOpenAddModal('expense')}
              />
            </>
          )}

          {activeTab === 'history' && (
            <div className="pt-1">
              <MonthSelector
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
              />
              <TransactionList
                transactions={monthlyTransactions}
                categories={categories}
                onDeleteTransaction={handleDeleteTransaction}
                onOpenAddModal={() => handleOpenAddModal('expense')}
              />
            </div>
          )}

          {activeTab === 'categories' && (
            <CategoriesView
              categories={categories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              transactions={transactions}
              categories={categories}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              transactions={transactions}
              onRefreshData={handleRefreshData}
            />
          )}
        </main>

        {/* Hamburger Side Drawer Navigation */}
        <HamburgerMenu
          isOpen={isMenuOpen}
          activeTab={activeTab}
          onClose={() => setIsMenuOpen(false)}
          onSelectTab={setActiveTab}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed sm:absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2 duration-150">
            {toastMessage}
          </div>
        )}

        {/* Add Transaction Drawer */}
        <AddTransactionModal
          isOpen={isAddModalOpen}
          selectedMonth={selectedMonth}
          initialType={modalType}
          categories={categories}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveTransaction}
          onAddCategory={handleAddCategory}
        />
      </div>
    </div>
  );
};

export default App;
