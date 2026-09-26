import { 
  getWarehouses, 
  getLocations, 
  createWarehouse, 
  createLocation 
} from "@/features/inventory/actions/inventory";

export default async function SettingsPage() {
  const warehouses = await getWarehouses();
  const locations = await getLocations();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* WAREHOUSE SECTION — matches wireframe: Name, Short Code, Address fields */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Warehouse</h1>

        <div className="border border-primary/20 rounded-xl bg-card p-6">
          <form action={createWarehouse} className="space-y-4 max-w-lg">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-primary">Name:</label>
              <input 
                name="name" 
                required 
                className="w-full bg-transparent border-b-2 border-primary/40 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter warehouse name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-primary">Short Code:</label>
              <input 
                name="shortCode" 
                required 
                className="w-full bg-transparent border-b-2 border-primary/40 py-2 text-foreground focus:outline-none focus:border-primary transition-colors uppercase"
                placeholder="e.g. WH"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-primary">Address:</label>
              <input 
                name="address"
                className="w-full bg-transparent border-b-2 border-primary/40 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Optional address"
              />
            </div>
            <button type="submit" className="mt-4 border border-primary text-primary px-6 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
              Save Warehouse
            </button>
          </form>

          {/* List existing warehouses */}
          {warehouses.length > 0 && (
            <div className="mt-8 space-y-2">
              <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">Existing Warehouses</h3>
              {warehouses.map(w => (
                <div key={w.id} className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="font-medium text-foreground">{w.name}</span>
                  <span className="text-sm text-primary font-mono">{w.shortCode}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LOCATION SECTION — matches wireframe: Name, Short Code, Warehouse dropdown */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Location</h1>
        <p className="text-sm text-muted-foreground italic">This holds the multiple locations of warehouse, rooms etc..</p>

        <div className="border border-primary/20 rounded-xl bg-card p-6">
          <form action={createLocation} className="space-y-4 max-w-lg">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-primary">Name:</label>
              <input 
                name="name" 
                required 
                className="w-full bg-transparent border-b-2 border-primary/40 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter location name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-primary">Short Code:</label>
              <input 
                name="shortCode" 
                required 
                className="w-full bg-transparent border-b-2 border-primary/40 py-2 text-foreground focus:outline-none focus:border-primary transition-colors uppercase"
                placeholder="e.g. Stock1"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-primary">Warehouse:</label>
              <select 
                name="warehouseId" 
                required
                className="w-full bg-transparent border-b-2 border-primary/40 py-2 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="">Select warehouse...</option>
                {warehouses.map(w => (
                  <option key={w.id} value={w.id}>{w.name} ({w.shortCode})</option>
                ))}
              </select>
            </div>
            <button type="submit" className="mt-4 border border-primary text-primary px-6 py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
              Save Location
            </button>
          </form>

          {/* List existing locations */}
          {locations.length > 0 && (
            <div className="mt-8 space-y-2">
              <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">Existing Locations</h3>
              {locations.map(l => (
                <div key={l.id} className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="font-medium text-foreground">{l.name}</span>
                  <span className="text-sm text-muted-foreground">{l.warehouse?.shortCode}/{l.shortCode}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
