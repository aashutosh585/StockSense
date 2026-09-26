"use server";

import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getOperations(type: string) {
  return await db.stockMove.findMany({
    where: { type },
    include: {
      contact: true,
      fromLocation: true,
      toLocation: true,
      lines: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOperationById(id: string) {
  return await db.stockMove.findUnique({
    where: { id },
    include: {
      contact: true,
      fromLocation: true,
      toLocation: true,
      lines: {
        include: { product: true }
      }
    }
  });
}

export async function createOperation(formData: FormData) {
  const type = formData.get("type") as string; // receipt, delivery, adjustment
  const reference = formData.get("reference") as string;
  const scheduleDateStr = formData.get("scheduleDate") as string;
  const fromLocationId = formData.get("fromLocationId") as string;
  const toLocationId = formData.get("toLocationId") as string;

  const move = await db.stockMove.create({
    data: {
      type,
      reference,
      scheduleDate: new Date(scheduleDateStr),
      fromLocationId: fromLocationId || null,
      toLocationId: toLocationId || null,
      status: "draft"
    }
  });

  const redirectUrl = type === "receipt" ? "/operations/receipts" : (type === "delivery" ? "/operations/deliveries" : "/operations/adjustments");
  revalidatePath(redirectUrl);
  redirect(`${redirectUrl}/${move.id}`);
}

export async function updateOperationStatus(id: string, status: string, type: string) {
  // If moving to "done", we should process the stock move lines (update onHand)
  if (status === "done") {
    const move = await db.stockMove.findUnique({
      where: { id },
      include: { lines: true }
    });

    if (move && move.status !== "done") {
      // Transaction to update product quantities
      await db.$transaction(async (tx) => {
        for (const line of move.lines) {
          if (move.type === "receipt") {
            await tx.product.update({
              where: { id: line.productId },
              data: {
                onHand: { increment: line.quantity },
                freeToUse: { increment: line.quantity }
              }
            });
          } else if (move.type === "delivery") {
            await tx.product.update({
              where: { id: line.productId },
              data: {
                onHand: { decrement: line.quantity },
                freeToUse: { decrement: line.quantity }
              }
            });
          } else if (move.type === "adjustment") {
            await tx.product.update({
              where: { id: line.productId },
              data: {
                onHand: { increment: line.quantity },
                freeToUse: { increment: line.quantity }
              }
            });
          }
        }
        await tx.stockMove.update({
          where: { id },
          data: { status: "done" }
        });
      });
    }
  } else {
    await db.stockMove.update({
      where: { id },
      data: { status }
    });
  }

  const redirectUrl = type === "receipt" ? "/operations/receipts" : (type === "delivery" ? "/operations/deliveries" : "/operations/adjustments");
  revalidatePath(`${redirectUrl}/${id}`);
}

export async function addMoveLine(formData: FormData) {
  const moveId = formData.get("moveId") as string;
  const productId = formData.get("productId") as string;
  const quantity = parseInt(formData.get("quantity") as string);
  const type = formData.get("type") as string;

  await db.stockMoveLine.create({
    data: {
      moveId,
      productId,
      quantity
    }
  });

  const redirectUrl = type === "receipt" ? "/operations/receipts" : (type === "delivery" ? "/operations/deliveries" : "/operations/adjustments");
  revalidatePath(`${redirectUrl}/${moveId}`);
}
