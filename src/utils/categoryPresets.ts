import {
  // Compras & Consumo
  ShoppingBag,
  ShoppingCart,
  Coffee,
  Utensils,
  Pizza,
  Beer,
  Wine,
  Apple,
  Cake,
  Shirt,
  Scissors,
  // Movilidad & Transporte
  Car,
  Fuel,
  Bus,
  Bike,
  Train,
  Plane,
  Navigation,
  // Hogar & Servicios
  Home,
  Zap,
  Droplets,
  Wifi,
  Flame,
  Shield,
  Wrench,
  // Salud & Bienestar
  HeartPulse,
  Dumbbell,
  Pill,
  Stethoscope,
  Activity,
  // Ocio & Entretenimiento
  Film,
  Gamepad2,
  Tv,
  Music,
  Headphones,
  Camera,
  PartyPopper,
  // Finanzas & Trabajo
  Briefcase,
  DollarSign,
  Wallet,
  PiggyBank,
  CreditCard,
  Coins,
  TrendingUp,
  Landmark,
  Receipt,
  // Otros & Estilo de Vida
  Gift,
  Sparkles,
  Smile,
  Trophy,
  Heart,
  Smartphone,
  Laptop,
  BookOpen,
  GraduationCap,
  Dog,
  Tag,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { Category } from '../types/finance';

export interface IconDefinition {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
}

export const AVAILABLE_ICONS: IconDefinition[] = [
  // Comida y bebidas
  { id: 'Utensils', name: 'Comida', icon: Utensils },
  { id: 'Coffee', name: 'Café', icon: Coffee },
  { id: 'ShoppingBag', name: 'Bolsa', icon: ShoppingBag },
  { id: 'ShoppingCart', name: 'Supermercado', icon: ShoppingCart },
  { id: 'Pizza', name: 'Pizza / Comida Rápida', icon: Pizza },
  { id: 'Beer', name: 'Bar / Cerveza', icon: Beer },
  { id: 'Wine', name: 'Vino', icon: Wine },
  { id: 'Apple', name: 'Frutas / Dieta', icon: Apple },
  { id: 'Cake', name: 'Postres', icon: Cake },
  
  // Movilidad y Viajes
  { id: 'Car', name: 'Auto', icon: Car },
  { id: 'Fuel', name: 'Gasolina', icon: Fuel },
  { id: 'Bus', name: 'Transporte Público', icon: Bus },
  { id: 'Bike', name: 'Bicicleta', icon: Bike },
  { id: 'Train', name: 'Tren / Metro', icon: Train },
  { id: 'Plane', name: 'Vuelos / Viajes', icon: Plane },
  { id: 'Navigation', name: 'Ubicación / Rutas', icon: Navigation },

  // Hogar y Facturas
  { id: 'Home', name: 'Hogar / Renta', icon: Home },
  { id: 'Zap', name: 'Luz / Electricidad', icon: Zap },
  { id: 'Droplets', name: 'Agua', icon: Droplets },
  { id: 'Wifi', name: 'Internet / WiFi', icon: Wifi },
  { id: 'Flame', name: 'Gas', icon: Flame },
  { id: 'Shield', name: 'Seguros', icon: Shield },
  { id: 'Wrench', name: 'Mantenimiento', icon: Wrench },

  // Salud y Deporte
  { id: 'HeartPulse', name: 'Salud', icon: HeartPulse },
  { id: 'Dumbbell', name: 'Gimnasio', icon: Dumbbell },
  { id: 'Pill', name: 'Farmacia', icon: Pill },
  { id: 'Stethoscope', name: 'Médico', icon: Stethoscope },
  { id: 'Activity', name: 'Bienestar', icon: Activity },

  // Ocio y Diversión
  { id: 'Film', name: 'Cine / Películas', icon: Film },
  { id: 'Gamepad2', name: 'Videojuegos', icon: Gamepad2 },
  { id: 'Tv', name: 'Streaming / TV', icon: Tv },
  { id: 'Music', name: 'Música', icon: Music },
  { id: 'Headphones', name: 'Podcasts / Audio', icon: Headphones },
  { id: 'Camera', name: 'Fotografía', icon: Camera },
  { id: 'PartyPopper', name: 'Fiestas / Eventos', icon: PartyPopper },

  // Finanzas y Trabajo
  { id: 'Briefcase', name: 'Nómina / Trabajo', icon: Briefcase },
  { id: 'DollarSign', name: 'Efectivo / Dinero', icon: DollarSign },
  { id: 'Wallet', name: 'Cartera', icon: Wallet },
  { id: 'PiggyBank', name: 'Ahorro', icon: PiggyBank },
  { id: 'CreditCard', name: 'Tarjetas', icon: CreditCard },
  { id: 'Coins', name: 'Monedas / Cambio', icon: Coins },
  { id: 'TrendingUp', name: 'Inversiones', icon: TrendingUp },
  { id: 'Landmark', name: 'Banco', icon: Landmark },
  { id: 'Receipt', name: 'Facturas / Recibos', icon: Receipt },

  // Personal y Familia
  { id: 'Shirt', name: 'Ropa / Moda', icon: Shirt },
  { id: 'Scissors', name: 'Corte / Belleza', icon: Scissors },
  { id: 'Dog', name: 'Mascotas', icon: Dog },
  { id: 'Gift', name: 'Regalos', icon: Gift },
  { id: 'Heart', name: 'Donaciones / Pareja', icon: Heart },
  { id: 'GraduationCap', name: 'Educación / Cursos', icon: GraduationCap },
  { id: 'BookOpen', name: 'Libros', icon: BookOpen },
  { id: 'Laptop', name: 'Tecnología / PC', icon: Laptop },
  { id: 'Smartphone', name: 'Telefonía móvil', icon: Smartphone },
  { id: 'Trophy', name: 'Logros', icon: Trophy },
  { id: 'Smile', name: 'Personales', icon: Smile },
  { id: 'Sparkles', name: 'Otros / Extras', icon: Sparkles },
  { id: 'Tag', name: 'Etiqueta general', icon: Tag },
];

export const AVAILABLE_COLORS = [
  // Gama de Rojos & Rosas
  { id: 'red-600', name: 'Rojo Carmesí', hex: '#dc2626' },
  { id: 'rose-500', name: 'Rojo Rosa', hex: '#f43f5e' },
  { id: 'ruby', name: 'Rojo Rubí', hex: '#e11d48' },
  { id: 'brick', name: 'Terracota / Ladrillo', hex: '#b91c1c' },
  { id: 'pink-500', name: 'Rosa Pastel', hex: '#ec4899' },
  { id: 'fuchsia-500', name: 'Fucsia Vivo', hex: '#d946ef' },

  // Gama de Naranjas & Amarillos
  { id: 'orange-600', name: 'Naranja Intenso', hex: '#ea580c' },
  { id: 'orange-500', name: 'Naranja Cálido', hex: '#f97316' },
  { id: 'amber-600', name: 'Ámbar', hex: '#d97706' },
  { id: 'amber-500', name: 'Oro Miel', hex: '#f59e0b' },
  { id: 'yellow-500', name: 'Amarillo Mostaza', hex: '#eab308' },
  { id: 'peach', name: 'Melocotón', hex: '#fb923c' },

  // Gama de Verdes
  { id: 'emerald-600', name: 'Verde Esmeralda', hex: '#059669' },
  { id: 'emerald-500', name: 'Verde Menta', hex: '#10b981' },
  { id: 'green-600', name: 'Verde Clásico', hex: '#16a34a' },
  { id: 'forest', name: 'Verde Bosque', hex: '#15803d' },
  { id: 'lime-600', name: 'Verde Lima', hex: '#65a30d' },
  { id: 'olive', name: 'Verde Oliva', hex: '#4d7c0f' },

  // Gama de Azules & Turquesas
  { id: 'blue-600', name: 'Azul Real', hex: '#2563eb' },
  { id: 'blue-500', name: 'Azul Eléctrico', hex: '#3b82f6' },
  { id: 'sky-600', name: 'Azul Cielo', hex: '#0284c7' },
  { id: 'cyan-600', name: 'Cian', hex: '#0891b2' },
  { id: 'teal-600', name: 'Verde Azulado', hex: '#0d9488' },
  { id: 'navy', name: 'Azul Marino', hex: '#1e3a8a' },

  // Gama de Morados & Violetas
  { id: 'indigo-600', name: 'Índigo', hex: '#4f46e5' },
  { id: 'violet-600', name: 'Violeta', hex: '#7c3aed' },
  { id: 'purple-600', name: 'Púrpura', hex: '#9333ea' },

  // Neutros & Tierra
  { id: 'slate-600', name: 'Pizarra Grafito', hex: '#475569' },
  { id: 'brown', name: 'Chocolate / Café', hex: '#78350f' },
  { id: 'charcoal', name: 'Carbón', hex: '#334155' },
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Comida', icon: 'Utensils', color: '#f43f5e', type: 'expense' },
  { id: 'cat-2', name: 'Supermercado', icon: 'ShoppingCart', color: '#ea580c', type: 'expense' },
  { id: 'cat-3', name: 'Transporte', icon: 'Car', color: '#2563eb', type: 'expense' },
  { id: 'cat-4', name: 'Café', icon: 'Coffee', color: '#7c3aed', type: 'expense' },
  { id: 'cat-5', name: 'Hogar', icon: 'Home', color: '#475569', type: 'expense' },
  { id: 'cat-6', name: 'Nómina', icon: 'Briefcase', color: '#059669', type: 'income' },
  { id: 'cat-7', name: 'Freelance', icon: 'DollarSign', color: '#0d9488', type: 'income' },
];
