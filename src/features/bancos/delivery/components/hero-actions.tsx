"use client";

import { useState } from "react";
import { Plus, RefreshCw, Upload } from "lucide-react";
import { ExportarMenu } from "./exportar-menu";
import { ImportarExtractoModal } from "./importar-extracto-modal";
import { useUiFeedback } from "@/shared/ui/ui-feedback";

export function HeroActions() {
  const { toast } = useUiFeedback();
  const [importOpen, setImportOpen] = useState(false);

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
        <ExportarMenu />
        <button
          type="button"
          onClick={() => setImportOpen(true)}
          className="flex items-center gap-1.5 rounded-md border border-white/25 bg-white/10 px-3.5 py-2 text-[12px] font-semibold backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-white/20"
        >
          <Upload className="h-3.5 w-3.5" />
          Importar extracto
        </button>
        <button
          type="button"
          onClick={() => toast("Sincronizando cuentas… — demo", "info")}
          className="flex items-center gap-1.5 rounded-md border border-white/25 bg-white/10 px-3.5 py-2 text-[12px] font-semibold backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-white/20"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Actualizar
        </button>
        <button
          type="button"
          onClick={() => toast("Próximamente: conectar nuevo banco", "info")}
          className="flex items-center gap-1.5 rounded-md border border-white/25 bg-white/10 px-3.5 py-2 text-[12px] font-semibold backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-white/20"
        >
          <Plus className="h-3.5 w-3.5" />
          Agregar banco
        </button>
      </div>

      <ImportarExtractoModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onComplete={() => toast("Extracto importado — 247 movimientos", "success")}
      />
    </>
  );
}
