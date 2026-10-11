import React from 'react';
import type { Category } from '../types/finance';
import { AVAILABLE_ICONS } from '../utils/categoryPresets';
import { Tag } from 'lucide-react';

interface CategoryIconProps {
  category: string;
  type?: 'expense' | 'income';
  customIcon?: string;
  customColor?: string;
  categories?: Category[];
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  type = 'expense',
  customIcon,
  customColor,
  categories = [],
  className = '',
}) => {
  // Find matching category object if available
  const matchedCategory = categories.find(
    (c) => c.name.toLowerCase() === category.toLowerCase()
  );

  const iconKey = customIcon || matchedCategory?.icon || 'Tag';
  const colorHex = customColor || matchedCategory?.color || (type === 'income' ? '#10b981' : '#f43f5e');

  const iconDef = AVAILABLE_ICONS.find((i) => i.id === iconKey) || AVAILABLE_ICONS.find((i) => i.id === 'Tag');
  const IconComponent = iconDef ? iconDef.icon : Tag;

  return (
    <div
      style={{
        backgroundColor: `${colorHex}18`, // ~10% opacity background
        borderColor: `${colorHex}40`, // ~25% opacity border
        color: colorHex,
      }}
      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${className}`}
    >
      <IconComponent className="w-5 h-5 stroke-[2]" />
    </div>
  );
};
