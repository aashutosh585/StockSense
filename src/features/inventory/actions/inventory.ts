"use server";

import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- PRODUCTS ---
export async function getProducts() {
  return await db.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const categoryId = formData.get("categoryId") as string;
  const unitCost = formData.get("unitCost") as string;
  const onHand = formData.get("onHand") as string;

  await db.product.create({
    data: {
      name,
      sku,
      categoryId: categoryId || null,
      unitCost: parseFloat(unitCost) || 0,
      onHand: parseInt(onHand) || 0,
      freeToUse: parseInt(onHand) || 0, // initially freeToUse = onHand
    },
  });

  revalidatePath("/products");
  redirect("/products");
}

export async function updateProductStock(id: string, newOnHand: number) {
  const product = await db.product.findUnique({ where: { id } });
  if (!product) return;
  const diff = newOnHand - product.onHand;
  await db.product.update({
    where: { id },
    data: { 
      onHand: newOnHand,
      freeToUse: product.freeToUse + diff
    }
  });
  revalidatePath("/products");
}

// --- SETTINGS (Categories, Warehouses, Locations, Contacts) ---
export async function getCategories() {
  return await db.category.findMany();
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) return;
  await db.category.create({ data: { name } });
  revalidatePath("/settings");
  revalidatePath("/products/new");
}

export async function getWarehouses() {
  return await db.warehouse.findMany();
}

export async function createWarehouse(formData: FormData) {
  const name = formData.get("name") as string;
  const shortCode = formData.get("shortCode") as string;
  const address = formData.get("address") as string;
  if (!name || !shortCode) return;
  await db.warehouse.create({ data: { name, shortCode, address: address || null } });
  revalidatePath("/settings");
}

export async function getLocations() {
  return await db.location.findMany({ include: { warehouse: true } });
}

export async function createLocation(formData: FormData) {
  const name = formData.get("name") as string;
  const shortCode = formData.get("shortCode") as string;
  const warehouseId = formData.get("warehouseId") as string;
  const type = formData.get("type") as string;
  
  if (!name || !shortCode) return;
  await db.location.create({ 
    data: { 
      name, 
      shortCode, 
      warehouseId: warehouseId || null,
      type: type || "internal" 
    } 
  });
  revalidatePath("/settings");
}

export async function getContacts() {
  return await db.contact.findMany();
}

export async function createContact(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const type = formData.get("type") as string;
  if (!name) return;
  await db.contact.create({ data: { name, email, type } });
  revalidatePath("/settings");
}
