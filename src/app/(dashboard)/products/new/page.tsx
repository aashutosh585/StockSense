import { getCategories } from "@/features/inventory/actions/inventory";
import { createProduct } from "@/features/inventory/actions/inventory";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center justify-between border-b border-primary/20 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/products" className="h-10 w-10 rounded-full border border-primary/30 flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-black text-foreground tracking-widest uppercase">
            New Product
          </h1>
        </div>
      </div>

      <form action={createProduct} className="glass-panel border border-primary/20 rounded-3xl bg-card shadow-2xl p-8 space-y-8">
        
        <div className="space-y-4">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="w-8 h-px bg-primary/50" /> Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Product Name</label>
              <input 
                name="name" 
                required 
                className="w-full bg-muted/50 border border-primary/30 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-[#ff8383] transition-all"
                placeholder="e.g. Widget Pro"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">SKU</label>
              <input 
                name="sku" 
                required 
                className="w-full bg-muted/50 border border-primary/30 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-[#ff8383] transition-all"
                placeholder="e.g. WID-001"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</label>
            <div className="flex gap-4">
              <select 
                name="categoryId" 
                className="flex-1 bg-muted/50 border border-primary/30 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-[#ff8383] transition-all appearance-none"
              >
                <option value="">-- Select a Category --</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <Link href="/settings" className="px-4 py-3 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 font-bold transition-colors flex items-center justify-center whitespace-nowrap">
                Manage Categories
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="w-8 h-px bg-primary/50" /> Inventory & Pricing
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Initial On Hand Quantity</label>
              <input 
                name="onHand" 
                type="number" 
                defaultValue="0"
                min="0"
                required 
                className="w-full bg-muted/50 border border-primary/30 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-[#ff8383] transition-all text-xl font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Unit Cost ($)</label>
              <input 
                name="unitCost" 
                type="number" 
                step="0.01"
                defaultValue="0.00"
                min="0"
                required 
                className="w-full bg-muted/50 border border-primary/30 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-[#ff8383] transition-all text-xl font-bold"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-primary/20 flex justify-end">
          <button 
            type="submit"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-black text-lg flex items-center gap-2 hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,131,131,0.4)]"
          >
            <Save className="h-5 w-5" /> Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
