import { getOperations } from "@/features/inventory/actions/operations";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";

export default async function AdjustmentsPage() {
  const operations = await getOperations("adjustment");
  const now = new Date();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center gap-4 pt-2">
        <Link href="/operations" className="h-8 w-8 rounded-lg border border-primary/30 flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <Link 
          href="/operations/adjustments/new" 
          className="border border-primary text-primary px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          NEW
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Inventory Adjustments</h1>
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 rounded-lg border border-primary/30 hover:bg-primary/10 transition-colors">
            <Search className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>

      <div className="border border-primary/20 rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-primary/30 text-sm text-primary/80 font-semibold">
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Schedule date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {operations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">No adjustments found. Click NEW to create one.</td>
                </tr>
              ) : (
                operations.map((op) => {
                  const isLate = op.status !== "done" && new Date(op.scheduleDate) < now;
                  return (
                    <tr key={op.id} className={`hover:bg-primary/5 transition-colors ${isLate ? "bg-red-500/5" : ""}`}>
                      <td className="px-4 py-3">
                        <Link href={`/operations/adjustments/${op.id}`} className="font-semibold text-foreground hover:text-primary underline-offset-4 hover:underline">
                          {op.reference}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{op.fromLocation?.name || "Global"}</td>
                      <td className={`px-4 py-3 ${isLate ? "text-red-400 font-semibold" : "text-muted-foreground"}`}>
                        {new Date(op.scheduleDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">{op.status.charAt(0).toUpperCase() + op.status.slice(1)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
