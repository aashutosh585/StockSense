"use client";

import { useState, useTransition } from "react";
import { Search, Loader2 } from "lucide-react";
import { updateProductStock } from "@/features/inventory/actions/inventory";

interface Product {
  id: string;
  name: string;
  sku: string;
  unitCost: number;
  onHand: number;
  freeToUse: number;
  category: { name: string } | null;
}

export default function ProductsTable({ products: initialProducts }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = initialProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleStockUpdate = (id: string, e: React.FocusEvent<HTMLInputElement>) => {
    const newStock = parseInt(e.target.value);
    if (!isNaN(newStock)) {
      startTransition(() => {
        updateProductStock(id, newStock);
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/20">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-foreground text-sm focus:outline-none placeholder:text-muted-foreground/50"
        />
        {isPending && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
      </div>

      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-primary/30 text-sm text-primary/80 font-semibold">
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">per unit cost</th>
            <th className="px-4 py-3 text-right">On hand</th>
            <th className="px-4 py-3 text-right">free to Use</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50 text-sm" style={{ borderStyle: "dotted" }}>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                {search ? "No products matching your search." : "No products found."}
              </td>
            </tr>
          ) : (
            filtered.map((product) => (
              <tr key={product.id} className="hover:bg-primary/5 transition-colors border-b border-dotted border-border/50">
                <td className="px-4 py-3 font-medium text-foreground">[{product.sku}] {product.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{product.unitCost.toFixed(0)} Rs</td>
                <td className="px-4 py-3 text-right">
                  <input 
                    type="number" 
                    defaultValue={product.onHand}
                    onBlur={(e) => handleStockUpdate(product.id, e)}
                    className="w-20 text-right bg-transparent border-b border-primary/30 py-1 text-foreground font-semibold focus:outline-none focus:border-primary hover:border-primary/50 transition-colors"
                  />
                </td>
                <td className="px-4 py-3 text-right text-foreground font-semibold">{product.freeToUse}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
