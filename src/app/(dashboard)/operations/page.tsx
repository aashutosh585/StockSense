import Link from "next/link";
import { FileDown, FileUp, Settings2, ArrowRightLeft } from "lucide-react";

export default function OperationsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-foreground">Operations</h1>
        <p className="text-sm text-muted-foreground mt-1">Operation can be perform Submenu: 1. Receipt 2. Delivery 3. Adjustment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        <Link href="/operations/receipts" className="border border-primary/30 rounded-xl bg-card p-6 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-4 group">
          <FileDown className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-bold text-foreground text-lg">Receipts</span>
          <span className="text-sm text-muted-foreground text-center">Incoming stock from vendors</span>
        </Link>

        <Link href="/operations/deliveries" className="border border-primary/30 rounded-xl bg-card p-6 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-4 group">
          <FileUp className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-bold text-foreground text-lg">Deliveries</span>
          <span className="text-sm text-muted-foreground text-center">Outgoing stock to customers</span>
        </Link>

        <Link href="/operations/transfers" className="border border-primary/30 rounded-xl bg-card p-6 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-4 group">
          <ArrowRightLeft className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-bold text-foreground text-lg">Transfers</span>
          <span className="text-sm text-muted-foreground text-center">Internal stock movements</span>
        </Link>

        <Link href="/operations/adjustments" className="border border-primary/30 rounded-xl bg-card p-6 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-4 group">
          <Settings2 className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-bold text-foreground text-lg">Adjustments</span>
          <span className="text-sm text-muted-foreground text-center">Fix stock mismatches</span>
        </Link>
      </div>
    </div>
  );
}
