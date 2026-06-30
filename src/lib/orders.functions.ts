import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

const itemSchema = z.object({
  productId: z.string().uuid().nullable(),
  name: z.string().min(1).max(200),
  sizeLabel: z.string().max(80).nullable(),
  unitPrice: z.number().positive(),
  quantity: z.number().int().positive().max(999),
});

const orderSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(2).max(120),
    phone: z.string().trim().min(7).max(40),
    email: z.string().trim().email().max(200).optional().or(z.literal("")),
    address: z.string().trim().min(5).max(400),
    city: z.string().trim().min(2).max(120),
    state: z.string().trim().min(2).max(120),
    deliveryInstructions: z.string().trim().max(500).optional().or(z.literal("")),
    notes: z.string().trim().max(800).optional().or(z.literal("")),
    preferredContact: z.enum(["phone", "email", "whatsapp"]),
    paymentMethod: z.enum(["pay_on_delivery", "bank_transfer"]),
  }),
  items: z.array(itemSchema).min(1).max(50),
});

function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => orderSchema.parse(input))
  .handler(async ({ data }) => {
    const subtotal = data.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const delivery_fee = 0;
    const total = subtotal + delivery_fee;
    const supabase = publicClient();

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        customer_name: data.customer.name,
        phone: data.customer.phone,
        email: data.customer.email || null,
        address: data.customer.address,
        city: data.customer.city,
        state: data.customer.state,
        delivery_instructions: data.customer.deliveryInstructions || null,
        order_notes: data.customer.notes || null,
        preferred_contact: data.customer.preferredContact,
        payment_method: data.customer.paymentMethod,
        subtotal,
        delivery_fee,
        total,
      })
      .select("id, reference")
      .single();
    if (error || !order) throw new Error(error?.message ?? "Could not create order");

    const itemsPayload = data.items.map((i) => ({
      order_id: order.id,
      product_id: i.productId,
      product_name: i.name,
      size_label: i.sizeLabel,
      unit_price: i.unitPrice,
      quantity: i.quantity,
      line_total: i.unitPrice * i.quantity,
    }));
    const { error: itemErr } = await supabase.from("order_items").insert(itemsPayload);
    if (itemErr) throw new Error(itemErr.message);

    return { reference: order.reference, total };
  });

export const listOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { data, error } = await context.supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { error } = await context.supabase.from("orders").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });