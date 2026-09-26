import { db } from "@/lib/db/db";
import Link from "next/link";

export default async function DashboardPage() {
  const now = new Date();

  // Fetch pending receipts and deliveries (not done)
  const receipts = await db.stockMove.findMany({
    where: { type: "receipt", status: { not: "done" } }
  });
  const deliveries = await db.stockMove.findMany({
    where: { type: "delivery", status: { not: "done" } }
  });

  // Receipt KPI
  const receiptCount = receipts.length;
  const receiptLate = receipts.filter(r => new Date(r.scheduleDate) < now).length;
  const receiptOps = receipts.length;

  // Delivery KPI
  const deliveryCount = deliveries.length;
  const deliveryLate = deliveries.filter(d => new Date(d.scheduleDate) < now).length;
  const deliveryWaiting = deliveries.filter(d => d.status === "waiting").length;
  const deliveryOps = deliveries.length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Page Title — matches mockup */}
      <div className="pt-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
      </div>

      {/* Two KPI cards side by side — exactly matching the Excalidraw wireframe */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        
        {/* Receipt Card */}
        <div className="rounded-2xl border border-primary/30 bg-card p-8 space-y-6">
          <h2 className="text-xl font-bold text-foreground">Receipt</h2>
          
          <div className="flex items-center justify-between gap-6">
            {/* Left: big number box */}
            <Link href="/operations/receipts" className="rounded-xl border-2 border-primary px-8 py-6 text-center hover:bg-primary/10 transition-colors min-w-[140px]">
              <div className="text-4xl font-black text-primary">{receiptCount}</div>
              <div className="text-sm font-semibold text-foreground/70 mt-1">to receive</div>
            </Link>

            {/* Right: stats */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-foreground">{receiptLate}</span>
                <span className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">Late</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-foreground">{receiptOps}</span>
                <span className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">operations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Card */}
        <div className="rounded-2xl border border-primary/30 bg-card p-8 space-y-6">
          <h2 className="text-xl font-bold text-foreground">Delivery</h2>
          
          <div className="flex items-center justify-between gap-6">
            {/* Left: big number box */}
            <Link href="/operations/deliveries" className="rounded-xl border-2 border-primary px-8 py-6 text-center hover:bg-primary/10 transition-colors min-w-[140px]">
              <div className="text-4xl font-black text-primary">{deliveryCount}</div>
              <div className="text-sm font-semibold text-foreground/70 mt-1">to deliver</div>
            </Link>

            {/* Right: stats */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-foreground">{deliveryLate}</span>
                <span className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">Late</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-foreground">{deliveryWaiting}</span>
                <span className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">waiting</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-foreground">{deliveryOps}</span>
                <span className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">operations</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
