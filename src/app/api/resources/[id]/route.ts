import { NextRequest, NextResponse } from "next/server";
import { deleteResourceById, incrementDownloadCount } from "@/lib/db";

export const runtime = "nodejs";

export async function PATCH(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    incrementDownloadCount(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to increment download count:", error);
    return NextResponse.json({ error: "Failed to update count" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const pin = req.headers.get("x-admin-pin");
    if (pin !== "2026") {
      return NextResponse.json({ error: "Invalid Admin PIN" }, { status: 403 });
    }
    const deleted = deleteResourceById(id);
    return NextResponse.json({ deleted });
  } catch (error) {
    console.error("Failed to delete resource:", error);
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 });
  }
}
