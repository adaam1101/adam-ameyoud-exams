import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { createResource, listResources } from "@/lib/db";
import { AcademicResource } from "@/lib/ensb-data";

export const runtime = "nodejs";

export async function GET() {
  try {
    const resources = listResources();
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

    const title = String(formData.get("title") || "").trim();
    const departmentId = String(formData.get("departmentId") || "").trim();
    const palierId = String(formData.get("palierId") || "PES").trim() as AcademicResource["palierId"];
    const yearLevel = Number(formData.get("yearLevel") || 1);
    const semester = String(formData.get("semester") || "S1").trim() as AcademicResource["semester"];
    const resourceType = String(formData.get("resourceType") || "exam").trim() as AcademicResource["resourceType"];
    const moduleName = String(formData.get("moduleName") || "").trim();
    const academicYear = String(formData.get("academicYear") || "2025/2026").trim();
    const professorName = String(formData.get("professorName") || "").trim() || undefined;
    const description = String(formData.get("description") || "").trim() || undefined;
    const externalUrl = String(formData.get("externalUrl") || "").trim() || undefined;
    const contributorName = String(formData.get("contributorName") || "").trim();
    const contributorEmail = String(formData.get("contributorEmail") || "").trim() || undefined;

    if (!title || !departmentId || !moduleName || !contributorName) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Title, Department, Module, and Contributor Name)." },
        { status: 400 }
      );
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

      const uploadsDir = process.env.VERCEL
        ? path.join("/tmp", "uploads")
        : path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const safeOriginalName = fileEntry.name.replace(/[^a-zA-Z0-9._-\u0600-\u06FF]/g, "_");
      const uniquePrefix = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
      const storedFileName = `${uniquePrefix}-${safeOriginalName}`;
      const destPath = path.join(uploadsDir, storedFileName);

      const arrayBuffer = await fileEntry.arrayBuffer();
      fs.writeFileSync(destPath, Buffer.from(arrayBuffer));

      fileUrl = `/uploads/${storedFileName}`;
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

    const created = createResource(newResource);
    return NextResponse.json({ resource: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to create resource:", error);
    return NextResponse.json(
      { error: "An error occurred while saving your contribution." },
      { status: 500 }
    );
  }
}
