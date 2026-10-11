import React from 'react';
import { Smartphone, HardDrive, Trash2, Download, RefreshCw } from 'lucide-react';
import { clearAllData, INITIAL_TRANSACTIONS, saveTransactions } from '../utils/storage';
import type { Transaction } from '../types/finance';

interface SettingsViewProps {
  transactions: Transaction[];
  onRefreshData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ transactions, onRefreshData }) => {
  const handleResetToDemo = () => {
    if (window.confirm('¿Quieres restaurar los datos de ejemplo iniciales?')) {
      saveTransactions(INITIAL_TRANSACTIONS);
      onRefreshData();
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        '¿Estás seguro de que deseas borrar todos tus registros? Esta acción no se puede deshacer.'
      )
    ) {
      clearAllData();
      onRefreshData();
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(transactions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `misfinanzas-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="px-5 pt-2 pb-10 space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-stone-900 tracking-tight">Ajustes & Respaldo</h2>
        <p className="text-xs text-stone-500 mt-0.5">Controla y exporta tus datos</p>
      </div>

      {/* PWA Home Screen Guide */}
      <div className="rounded-3xl bg-white p-4 border border-stone-200/80 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
            <Smartphone className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">Instalar en la pantalla de inicio</h4>
            <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
              Para usarla en pantalla completa sin barra de navegador:
            </p>
            <ul className="text-xs text-stone-600 mt-2 space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-stone-800">iPhone:</strong> Botón <em>Compartir</em> ⎋ ➔ <em>"Agregar a pantalla de inicio"</em>.
              </li>
              <li>
                <strong className="text-stone-800">Android:</strong> Menú ⋮ ➔ <em>"Agregar a la pantalla principal"</em>.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Management Actions */}
      <div className="rounded-3xl bg-white p-4 border border-stone-200/80 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2 mb-1">
          <HardDrive className="w-4 h-4 text-stone-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Datos</h4>
        </div>

        <button
          onClick={handleExportJSON}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100 active:scale-[0.99] transition-all text-xs font-semibold text-stone-800 border border-stone-200"
        >
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4 text-stone-600" />
            Descargar copia de seguridad (JSON)
          </span>
          <span className="text-[11px] text-stone-400">{transactions.length} registros</span>
        </button>

        <button
          onClick={handleResetToDemo}
          className="w-full flex items-center gap-2 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 active:scale-[0.99] transition-all text-xs font-semibold text-stone-800 border border-stone-200"
        >
          <RefreshCw className="w-4 h-4 text-stone-600" />
          Restaurar datos de ejemplo
        </button>

        <button
          onClick={handleClearAll}
          className="w-full flex items-center gap-2 p-3 rounded-xl bg-rose-50 hover:bg-rose-100 active:scale-[0.99] transition-all text-xs font-bold text-rose-700 border border-rose-200"
        >
          <Trash2 className="w-4 h-4 text-rose-600" />
          Borrar todos mis datos
        </button>
      </div>

      <div className="text-center pt-2">
        <p className="text-[11px] text-stone-400 font-medium">MisFinanzas</p>
      </div>
    </div>
  );
};
