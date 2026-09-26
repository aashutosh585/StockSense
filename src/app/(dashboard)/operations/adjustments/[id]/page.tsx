import { getOperationById, updateOperationStatus, addMoveLine } from "@/features/inventory/actions/operations";
import { getProducts } from "@/features/inventory/actions/inventory";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdjustmentDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const op = await getOperationById(params.id);
  const products = await getProducts();

  if (!op || op.type !== "adjustment") redirect("/operations/adjustments");

  const statuses = ["draft", "done"];
  const currentIdx = statuses.indexOf(op.status);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center gap-4 pt-2">
        <Link 
          href="/operations/adjustments/new" 
          className="border border-primary text-primary px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          New
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Inventory Adjustment</h1>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          {op.status !== "done" && op.status !== "canceled" && (
            <form action={async () => {
              "use server";
              await updateOperationStatus(op.id, "done", "adjustment");
            }}>
              <button type="submit" className="border border-primary text-primary px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                Apply Adjustment
              </button>
            </form>
          )}
          {op.status === "done" && (
            <button className="border border-foreground/30 text-foreground/70 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-foreground/10 transition-colors">
              Print
            </button>
          )}
          {op.status !== "done" && op.status !== "canceled" && (
            <form action={async () => {
              "use server";
              await updateOperationStatus(op.id, "canceled", "adjustment");
            }}>
              <button type="submit" className="border border-red-400/50 text-red-400 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-400/10 transition-colors">
                Cancel
              </button>
            </form>
          )}
        </div>

        <div className="flex items-center gap-1 px-4 py-2 rounded-xl border border-primary/30 bg-card text-sm font-semibold">
          {statuses.map((s, idx) => (
            <span key={s} className="flex items-center gap-1">
              <span className={idx === currentIdx ? "text-primary font-bold" : idx < currentIdx ? "text-foreground/50" : "text-foreground/30"}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
              {idx < statuses.length - 1 && <span className="text-foreground/30 mx-1">&gt;</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="border border-primary/20 rounded-xl bg-card p-6 space-y-5">
        <div className="text-lg font-bold text-foreground italic">{op.reference}</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-primary">Location</label>
            <div className="border-b-2 border-primary/40 pb-1 text-foreground font-medium">
              {op.fromLocation?.name || "Global"}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-foreground/70">Schedule Date</label>
            <div className="border-b-2 border-primary/40 pb-1 text-foreground font-medium">
              {new Date(op.scheduleDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-foreground/70">Responsible</label>
            <div className="border-b-2 border-primary/40 pb-1 text-foreground font-medium">
              {session?.user?.name || "Current User"}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-primary/20 rounded-xl bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-primary/20">
          <h2 className="text-sm font-bold text-primary">Quantity Differences</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-primary/20 text-sm text-foreground/60 font-semibold">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3 text-right">Difference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {op.lines.length === 0 ? (
              <tr><td colSpan={2} className="px-4 py-6 text-center text-muted-foreground">No adjustments added yet.</td></tr>
            ) : op.lines.map(line => (
              <tr key={line.id}>
                <td className="px-4 py-3 text-foreground font-medium">[{line.product.sku}] {line.product.name}</td>
                <td className={`px-4 py-3 text-right font-bold text-lg ${line.quantity > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {line.quantity > 0 ? "+" : ""}{line.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {op.status !== "done" && op.status !== "canceled" && (
          <form action={addMoveLine} className="border-t border-primary/20 px-4 py-3 flex items-center gap-3">
            <input type="hidden" name="moveId" value={op.id} />
            <input type="hidden" name="type" value="adjustment" />
            <select name="productId" required className="flex-1 bg-transparent border-b border-primary/30 py-2 text-foreground text-sm focus:outline-none focus:border-primary">
              <option value="">New Product...</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>[{p.sku}] {p.name} (Avail: {p.onHand})</option>
              ))}
            </select>
            <input name="quantity" type="number" required placeholder="+/- Qty" className="w-20 bg-transparent border-b border-primary/30 py-2 text-foreground text-sm text-right focus:outline-none focus:border-primary font-bold" />
            <button type="submit" className="text-primary text-sm font-bold hover:underline">Add</button>
          </form>
        )}
      </div>
    </div>
  );
}
