import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";

export const runtime = "nodejs";

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".txt": "text/plain",
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

  if (!fs.existsSync(/*turbopackIgnore: true*/ targetPath)) {
    return new NextResponse("File not found in archives", { status: 404 });
  }

  const ext = path.extname(safeName).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const fileBuffer = fs.readFileSync(/*turbopackIgnore: true*/ targetPath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `inline; filename="${safeName}"`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
