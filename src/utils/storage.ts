import type { Transaction, Category } from '../types/finance';
import { INITIAL_CATEGORIES } from './categoryPresets';

const STORAGE_KEY = 'misfinanzas_data_v2';
const CATEGORIES_STORAGE_KEY = 'misfinanzas_categories_v2';

export const INITIAL_TRANSACTIONS: Transaction[] = [];

export const loadTransactions = (): Transaction[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      saveTransactions(INITIAL_TRANSACTIONS);
      return INITIAL_TRANSACTIONS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error cargando transacciones de localStorage:', error);
    return INITIAL_TRANSACTIONS;
  }
};

export const saveTransactions = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error guardando transacciones en localStorage:', error);
  }
};

export const loadCategories = (): Category[] => {
  try {
    const data = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (!data) {
      saveCategories(INITIAL_CATEGORIES);
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error cargando categorías de localStorage:', error);
    return INITIAL_CATEGORIES;
  }
};

export const saveCategories = (categories: Category[]): void => {
  try {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error guardando categorías en localStorage:', error);
  }
};

export const clearAllData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CATEGORIES_STORAGE_KEY);
  } catch (error) {
    console.error('Error al limpiar datos:', error);
  }
};
