import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, LogOut, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { listOrders, updateOrderStatus } from "@/lib/orders.functions";
import { formatNaira } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Orders — SnowSea Admin" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate({ to: "/auth" });
      else setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate({ to: "/auth" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const list = useServerFn(listOrders);
  const updateStatus = useServerFn(updateOrderStatus);
  const { data: orders, isLoading, refetch, error } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => list({ data: undefined as never }),
    enabled: !checking,
    retry: false,
  });

  if (checking) return <div className="min-h-screen grid place-items-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div>
            <div className="font-display font-extrabold text-xl">SnowSea Admin</div>
            <div className="text-xs text-white/60">Order management dashboard</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => refetch()} className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20"><RefreshCw className="h-4 w-4" /></button>
            <button onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }} className="h-10 px-4 inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-sm"><LogOut className="h-4 w-4" /> Sign out</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        {error && <div className="p-6 rounded-2xl bg-destructive/10 text-destructive">Could not load orders. You may not have admin access on this account. {error instanceof Error ? error.message : ""}</div>}
        {isLoading ? (
          <div className="py-32 grid place-items-center"><Loader2 className="h-6 w-6 animate-spin text-gold" /></div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="p-6 rounded-2xl bg-white border border-border/40">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{new Date(o.created_at).toLocaleString()}</div>
                    <div className="font-display font-extrabold text-navy text-xl">{o.reference}</div>
                    <div className="text-sm text-muted-foreground">{o.customer_name} · {o.phone} {o.email ? `· ${o.email}` : ""}</div>
                    <div className="text-sm text-muted-foreground mt-1">{o.address}, {o.city}, {o.state}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-extrabold text-navy text-2xl">{formatNaira(Number(o.total))}</div>
                    <select value={o.status} onChange={(e) => updateStatus({ data: { id: o.id, status: e.target.value as "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" } }).then(() => refetch())} className="mt-2 h-9 px-3 rounded-full bg-cream border border-border text-sm">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <ul className="border-t border-border/40 pt-4 space-y-2">
                  {(o.order_items as Array<{ id: string; product_name: string; size_label: string | null; quantity: number; line_total: number }>).map((i) => (
                    <li key={i.id} className="flex justify-between text-sm">
                      <span>{i.product_name} {i.size_label ? `· ${i.size_label}` : ""} × {i.quantity}</span>
                      <span className="font-medium">{formatNaira(Number(i.line_total))}</span>
                    </li>
                  ))}
                </ul>
                {o.order_notes && <div className="mt-4 text-sm text-muted-foreground"><strong>Notes:</strong> {o.order_notes}</div>}
                {o.delivery_instructions && <div className="mt-2 text-sm text-muted-foreground"><strong>Delivery:</strong> {o.delivery_instructions}</div>}
                <div className="mt-3 text-xs text-muted-foreground">Payment: {o.payment_method} · Contact: {o.preferred_contact}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center text-muted-foreground">No orders yet. They'll appear here as customers check out.</div>
        )}
      </main>
    </div>
  );
}