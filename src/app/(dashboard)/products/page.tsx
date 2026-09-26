import { getProducts } from "@/features/inventory/actions/inventory";
import Link from "next/link";
import { Search } from "lucide-react";
import ProductsTable from "./products-table";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header — matching wireframe: "Stock" title with search icon */}
      <div className="flex items-center justify-between pt-2">
        <h1 className="text-2xl font-bold text-foreground">Stock</h1>
        <div className="flex items-center gap-3">
          <Link 
            href="/products/new" 
            className="border border-primary text-primary px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            New Product
          </Link>
        </div>
      </div>

      {/* Note from wireframe: "User must be able to update the stock from here" */}
      <div className="text-xs text-muted-foreground italic">
        User must be able to update the stock from here.
      </div>

      {/* Stock Table — wireframe: Product | per unit cost | On hand | free to Use with dotted borders */}
      <div className="border border-primary/20 rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <ProductsTable products={products} />
        </div>
      </div>
    </div>
  );
}
