import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { createResource, listResources } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { AcademicResource } from "@/lib/ensb-data";

export const runtime = "nodejs";

const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".xls",
  ".xlsx",
  ".txt",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

export async function GET() {
  try {
    const resources = await listResources();
    return NextResponse.json({ resources });
  } catch (error) {
    console.error("Failed to list resources:", error);
    return NextResponse.json(
      { error: "Failed to load archive resources." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = String(formData.get("title") || "").trim().slice(0, 200);
    const departmentId = String(formData.get("departmentId") || "").trim().slice(0, 60);
    const palierId = String(formData.get("palierId") || "PES").trim() as AcademicResource["palierId"];
    const yearLevel = Math.min(Math.max(Number(formData.get("yearLevel") || 1), 1), 5);
    const semester = String(formData.get("semester") || "S1").trim() as AcademicResource["semester"];
    const resourceType = String(formData.get("resourceType") || "exam").trim() as AcademicResource["resourceType"];
    const moduleName = String(formData.get("moduleName") || "").trim().slice(0, 120);
    const academicYear = String(formData.get("academicYear") || "2025/2026").trim().slice(0, 30);
    const professorName = String(formData.get("professorName") || "").trim().slice(0, 100) || undefined;
    const description = String(formData.get("description") || "").trim().slice(0, 1000) || undefined;
    const rawExternalUrl = String(formData.get("externalUrl") || "").trim();
    const contributorName = String(formData.get("contributorName") || "").trim().slice(0, 100);
    const contributorEmail = String(formData.get("contributorEmail") || "").trim().slice(0, 120) || undefined;

    if (!title || !departmentId || !moduleName || !contributorName) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Title, Department, Module, and Contributor Name)." },
        { status: 400 }
      );
    }

    let externalUrl: string | undefined;
    if (rawExternalUrl) {
      try {
        const parsed = new URL(rawExternalUrl);
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
          return NextResponse.json(
            { error: "External link must start with https:// or http://" },
            { status: 400 }
          );
        }
        externalUrl = parsed.toString();
      } catch {
        return NextResponse.json(
          { error: "Invalid external URL format." },
          { status: 400 }
        );
      }
    }

    const fileEntry = formData.get("file");
    let fileUrl: string | undefined;
    let fileName: string | undefined;
    let fileSize: number | undefined;

    if (fileEntry && fileEntry instanceof File && fileEntry.size > 0) {
      const maxBytes = 25 * 1024 * 1024; // 25 MB
      if (fileEntry.size > maxBytes) {
        return NextResponse.json(
          { error: "File size exceeds the 25 MB limit. For larger files, please use a Google Drive link." },
          { status: 400 }
        );
      }

      const ext = path.extname(fileEntry.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { error: "Unsupported file format. Allowed formats: PDF, Word, PowerPoint, Excel, TXT, JPG, PNG, WebP." },
          { status: 400 }
        );
      }

      const safeOriginalName = fileEntry.name.replace(/[^a-zA-Z0-9._-\u0600-\u06FF]/g, "_");
      const uniquePrefix = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
      const storedFileName = `${uniquePrefix}-${safeOriginalName}`;

      const arrayBuffer = await fileEntry.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 1. Upload to Supabase Storage bucket 'ensb-documents'
      if (supabase) {
        try {
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("ensb-documents")
            .upload(storedFileName, buffer, {
              contentType: fileEntry.type || "application/octet-stream",
              upsert: true,
            });

          if (!uploadError && uploadData) {
            const { data: publicUrlData } = supabase.storage
              .from("ensb-documents")
              .getPublicUrl(storedFileName);
            fileUrl = publicUrlData.publicUrl;
          } else if (uploadError) {
            console.warn("Supabase storage upload error:", uploadError.message);
          }
        } catch (storageErr) {
          console.warn("Supabase storage upload exception:", storageErr);
        }
      }

      // 2. Local filesystem write fallback
      try {
        const uploadsDir = process.env.VERCEL
          ? path.join("/tmp", "uploads")
          : path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const destPath = path.join(uploadsDir, storedFileName);
        fs.writeFileSync(destPath, buffer);
        if (!fileUrl) {
          fileUrl = `/uploads/${storedFileName}`;
        }
      } catch (fsErr) {
        console.warn("Local filesystem write fallback failed:", fsErr);
      }

      fileName = fileEntry.name;
      fileSize = fileEntry.size;
    }

    if (!fileUrl && !externalUrl) {
      return NextResponse.json(
        { error: "Please attach a document file or provide a valid external link (e.g. Google Drive)." },
        { status: 400 }
      );
    }

    const newResource: AcademicResource = {
      id: crypto.randomUUID(),
      title,
      departmentId,
      palierId,
      yearLevel,
      semester,
      resourceType,
      moduleName,
      academicYear,
      professorName,
      description,
      fileUrl,
      fileName,
      fileSize,
      externalUrl,
      contributorName,
      contributorEmail,
      status: "published",
      downloads: 0,
      createdAt: new Date().toISOString(),
    };

    const created = await createResource(newResource);

    return NextResponse.json({
      ok: true,
      resource: created,
    });
  } catch (error) {
    console.error("Failed to process resource upload:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while publishing the document." },
      { status: 500 }
    );
  }
}
