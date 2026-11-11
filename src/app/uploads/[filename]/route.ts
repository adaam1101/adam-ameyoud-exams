import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".txt": "text/plain; charset=utf-8",
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  if (!filename) {
    return new NextResponse("Filename is required", { status: 400 });
  }

  // Sanitize filename to prevent directory traversal
  const safeName = path.basename(filename);

  const baseDir = process.env.VERCEL
    ? path.join("/tmp", "uploads")
    : path.join(process.cwd(), "public", "uploads");

  const targetPath = path.join(baseDir, safeName);

  if (fs.existsSync(/*turbopackIgnore: true*/ targetPath)) {
    const ext = path.extname(safeName).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const fileBuffer = fs.readFileSync(/*turbopackIgnore: true*/ targetPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${safeName}"`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Fallback to Supabase Storage bucket 'ensb-documents'
  if (supabase) {
    try {
      const { data: publicUrlData } = supabase.storage
        .from("ensb-documents")
        .getPublicUrl(safeName);

      if (publicUrlData?.publicUrl) {
        return NextResponse.redirect(publicUrlData.publicUrl, 307);
      }
    } catch (err) {
      console.warn("Could not retrieve file from Supabase storage fallback:", err);
    }
  }

  return new NextResponse("File not found in archives", { status: 404 });
}
