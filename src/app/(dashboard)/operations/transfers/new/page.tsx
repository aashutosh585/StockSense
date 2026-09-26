import { getLocations } from "@/features/inventory/actions/inventory";
import { createOperation } from "@/features/inventory/actions/operations";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewTransferPage() {
  const locations = await getLocations();
  const internalLocations = locations.filter(l => l.type === "internal");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center gap-4 pt-2">
        <Link href="/operations/transfers" className="h-8 w-8 rounded-lg border border-primary/30 flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">New Internal Transfer</h1>
      </div>

      <div className="border border-primary/20 rounded-xl bg-card p-6">
        <form action={createOperation} className="space-y-6 max-w-2xl">
          <input type="hidden" name="type" value="transfer" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-primary">Reference</label>
              <input 
                name="reference" 
                required 
                placeholder="e.g. WH/INT/0001"
                className="w-full bg-transparent border-b-2 border-primary/40 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-primary">Scheduled Date</label>
              <input 
                name="scheduleDate" 
                type="date"
                required 
                className="w-full bg-transparent border-b-2 border-primary/40 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-primary/20">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-primary">Source Location</label>
              <select 
                name="fromLocationId" 
                required
                className="w-full bg-transparent border-b-2 border-primary/40 py-2 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="" className="bg-background text-foreground">-- Select Source --</option>
                {internalLocations.map(l => (
                  <option key={l.id} value={l.id} className="bg-background text-foreground">{l.warehouse?.name} / {l.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-primary">Destination Location</label>
              <select 
                name="toLocationId" 
                required
                className="w-full bg-transparent border-b-2 border-primary/40 py-2 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="" className="bg-background text-foreground">-- Select Destination --</option>
                {internalLocations.map(l => (
                  <option key={l.id} value={l.id} className="bg-background text-foreground">{l.warehouse?.name} / {l.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit"
              className="border border-primary text-primary px-6 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Create Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
