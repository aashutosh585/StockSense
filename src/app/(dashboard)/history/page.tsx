import { db } from "@/lib/db/db";
import Link from "next/link";
import { Search } from "lucide-react";

export default async function HistoryPage() {
  // Fetch all move lines from completed operations — per wireframe, show all moves from-to
  const moveLines = await db.stockMoveLine.findMany({
    where: {
      move: { status: "done" }
    },
    include: {
      product: true,
      move: {
        include: {
          contact: true,
          fromLocation: true,
          toLocation: true,
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header — matches wireframe: NEW button + "Move History" title + search */}
      <div className="flex items-center gap-4 pt-2">
        <h1 className="text-2xl font-bold text-foreground">Move History</h1>
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 rounded-lg border border-primary/30 hover:bg-primary/10 transition-colors">
            <Search className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Table — wireframe columns: Reference | Date | Contact | From | To | Quantity | Status */}
      <div className="border border-primary/20 rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-primary/30 text-sm text-primary/80 font-semibold">
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">To</th>
                <th className="px-4 py-3 text-right">Quantity</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {moveLines.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">No completed operations yet.</td>
                </tr>
              ) : (
                moveLines.map((line) => {
                  const isReceipt = line.move.type === "receipt";
                  // Per wireframe: "In event should be display in green, Out moves should be display in red"
                  const rowColor = isReceipt ? "text-emerald-500" : "text-red-500";

                  return (
                    <tr key={line.id} className="hover:bg-primary/5 transition-colors">
                      <td className={`px-4 py-3 font-semibold ${rowColor}`}>
                        {line.move.reference}
                      </td>
                      <td className={`px-4 py-3 ${rowColor}`}>
                        {new Date(line.createdAt).toLocaleDateString()}
                      </td>
                      <td className={`px-4 py-3 ${rowColor}`}>
                        {line.move.contact?.name || "-"}
                      </td>
                      <td className={`px-4 py-3 ${rowColor}`}>
                        {line.move.fromLocation?.name || "vendor"}
                      </td>
                      <td className={`px-4 py-3 ${rowColor}`}>
                        {line.move.toLocation?.name || "vendor"}
                      </td>
                      <td className={`px-4 py-3 text-right font-bold ${rowColor}`}>
                        {line.quantity}
                      </td>
                      <td className={`px-4 py-3 font-semibold ${rowColor}`}>
                        {line.move.status.charAt(0).toUpperCase() + line.move.status.slice(1)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes from wireframe */}
      <div className="text-xs text-muted-foreground italic space-y-1">
        <p>Populate all moves done between the from – To location in inventory.</p>
        <p>If single reference has multiple product display it in multiple rows.</p>
        <p className="text-emerald-500">In event should be display in green.</p>
        <p className="text-red-500">Out moves should be display in red.</p>
      </div>
    </div>
  );
}
