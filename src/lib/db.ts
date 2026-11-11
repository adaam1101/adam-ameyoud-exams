import path from "node:path";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { AcademicResource } from "./ensb-data";
import { SEED_RESOURCES } from "./seed-data";
import { supabase } from "./supabase";

const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "data")
  : path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "ensb-archive.sqlite");

let dbInstance: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (!dbInstance) {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (process.env.VERCEL && !fs.existsSync(DB_PATH)) {
      const seedPath = path.join(process.cwd(), "data", "ensb-archive.sqlite");
      if (fs.existsSync(seedPath)) {
        try {
          fs.copyFileSync(seedPath, DB_PATH);
        } catch (e) {
          console.warn("Could not copy seed database to /tmp:", e);
        }
      }
    }
    dbInstance = new DatabaseSync(DB_PATH);
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS resources (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        departmentId TEXT NOT NULL,
        palierId TEXT NOT NULL,
        yearLevel INTEGER NOT NULL,
        semester TEXT NOT NULL,
        resourceType TEXT NOT NULL,
        moduleName TEXT NOT NULL,
        academicYear TEXT NOT NULL,
        professorName TEXT,
        description TEXT,
        fileUrl TEXT,
        fileName TEXT,
        fileSize INTEGER,
        externalUrl TEXT,
        contributorName TEXT NOT NULL,
        contributorEmail TEXT,
        contributorLevel TEXT,
        status TEXT NOT NULL DEFAULT 'published',
        downloads INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_dept ON resources(departmentId);
      CREATE INDEX IF NOT EXISTS idx_palier ON resources(palierId);
      CREATE INDEX IF NOT EXISTS idx_year ON resources(yearLevel);
    `);
  }
  return dbInstance;
}

export async function listResources(): Promise<AcademicResource[]> {
  let remoteResources: AcademicResource[] = [];

  // 1. Try fetching from Supabase (Centralized, Persistent Cloud DB)
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        remoteResources = data.map((row: Record<string, unknown>) => ({
          id: String(row.id),
          title: String(row.title),
          departmentId: String(row.department_id || row.departmentId),
          palierId: String(row.palier_id || row.palierId) as AcademicResource["palierId"],
          yearLevel: Number(row.year_level ?? row.yearLevel ?? 1),
          semester: String(row.semester) as AcademicResource["semester"],
          resourceType: String(row.resource_type || row.resourceType) as AcademicResource["resourceType"],
          moduleName: String(row.module_name || row.moduleName),
          academicYear: String(row.academic_year || row.academicYear),
          professorName: row.professor_name ? String(row.professor_name) : undefined,
          description: row.description ? String(row.description) : undefined,
          fileUrl: row.file_url ? String(row.file_url) : undefined,
          fileName: row.file_name ? String(row.file_name) : undefined,
          fileSize: row.file_size ? Number(row.file_size) : undefined,
          externalUrl: row.external_url ? String(row.external_url) : undefined,
          contributorName: String(row.contributor_name || row.contributorName),
          contributorEmail: row.contributor_email ? String(row.contributor_email) : undefined,
          contributorLevel: row.contributor_level ? String(row.contributor_level) : undefined,
          status: String(row.status) as AcademicResource["status"],
          downloads: Number(row.downloads ?? 0),
          createdAt: String(row.created_at || row.createdAt),
        }));
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local storage:", err);
    }
  }

  // 2. Fetch from local SQLite cache
  let localResources: AcademicResource[] = [];
  try {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT * FROM resources
      WHERE status = 'published'
      ORDER BY datetime(createdAt) DESC
    `);
    const rows = stmt.all() as Record<string, unknown>[];
    localResources = rows.map((row) => ({
      id: String(row.id),
      title: String(row.title),
      departmentId: String(row.departmentId),
      palierId: String(row.palierId) as AcademicResource["palierId"],
      yearLevel: Number(row.yearLevel),
      semester: String(row.semester) as AcademicResource["semester"],
      resourceType: String(row.resourceType) as AcademicResource["resourceType"],
      moduleName: String(row.moduleName),
      academicYear: String(row.academicYear),
      professorName: row.professorName ? String(row.professorName) : undefined,
      description: row.description ? String(row.description) : undefined,
      fileUrl: row.fileUrl ? String(row.fileUrl) : undefined,
      fileName: row.fileName ? String(row.fileName) : undefined,
      fileSize: row.fileSize ? Number(row.fileSize) : undefined,
      externalUrl: row.externalUrl ? String(row.externalUrl) : undefined,
      contributorName: String(row.contributorName),
      contributorEmail: row.contributorEmail ? String(row.contributorEmail) : undefined,
      contributorLevel: row.contributorLevel ? String(row.contributorLevel) : undefined,
      status: String(row.status) as AcademicResource["status"],
      downloads: Number(row.downloads ?? 0),
      createdAt: String(row.createdAt),
    }));
  } catch (e) {
    console.warn("Local sqlite query failed:", e);
  }

  // 3. Merge: Remote (Supabase) + Local SQLite + Built-in SEED_RESOURCES
  const combinedMap = new Map<string, AcademicResource>();

  // Add SEED_RESOURCES first
  for (const s of SEED_RESOURCES) {
    combinedMap.set(s.id, s);
  }
  // Local SQLite overrides seeds
  for (const l of localResources) {
    combinedMap.set(l.id, l);
  }
  // Remote Supabase has highest priority
  for (const r of remoteResources) {
    combinedMap.set(r.id, r);
  }

  return Array.from(combinedMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createResource(resource: AcademicResource): Promise<AcademicResource> {
  // 1. Insert into Supabase (Persists globally across all Vercel instances)
  if (supabase) {
    try {
      const { error } = await supabase.from("resources").insert({
        id: resource.id,
        title: resource.title,
        department_id: resource.departmentId,
        palier_id: resource.palierId,
        year_level: resource.yearLevel,
        semester: resource.semester,
        resource_type: resource.resourceType,
        module_name: resource.moduleName,
        academic_year: resource.academicYear,
        professor_name: resource.professorName ?? null,
        description: resource.description ?? null,
        file_url: resource.fileUrl ?? null,
        file_name: resource.fileName ?? null,
        file_size: resource.fileSize ?? null,
        external_url: resource.externalUrl ?? null,
        contributor_name: resource.contributorName,
        contributor_email: resource.contributorEmail ?? null,
        contributor_level: resource.contributorLevel ?? null,
        status: resource.status,
        downloads: resource.downloads,
        created_at: resource.createdAt,
      });

      if (error) {
        console.warn("Supabase insert warning:", error);
      }
    } catch (err) {
      console.warn("Supabase insert failed, continuing with local:", err);
    }
  }

  // 2. Insert into local SQLite cache
  try {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO resources (
        id, title, departmentId, palierId, yearLevel, semester,
        resourceType, moduleName, academicYear, professorName,
        description, fileUrl, fileName, fileSize, externalUrl,
        contributorName, contributorEmail, contributorLevel,
        status, downloads, createdAt
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?
      )
    `);
    stmt.run(
      resource.id,
      resource.title,
      resource.departmentId,
      resource.palierId,
      resource.yearLevel,
      resource.semester,
      resource.resourceType,
      resource.moduleName,
      resource.academicYear,
      resource.professorName ?? null,
      resource.description ?? null,
      resource.fileUrl ?? null,
      resource.fileName ?? null,
      resource.fileSize ?? null,
      resource.externalUrl ?? null,
      resource.contributorName,
      resource.contributorEmail ?? null,
      resource.contributorLevel ?? null,
      resource.status,
      resource.downloads,
      resource.createdAt
    );
  } catch (e) {
    console.warn("Local sqlite insert failed:", e);
  }

  return resource;
}

export async function incrementDownloadCount(id: string): Promise<void> {
  if (supabase) {
    try {
      await supabase.rpc("increment_downloads", { resource_id: id });
    } catch {
      // fallback
    }
  }

  try {
    const db = getDb();
    const stmt = db.prepare(`UPDATE resources SET downloads = downloads + 1 WHERE id = ?`);
    stmt.run(id);
  } catch {
    // ignore
  }
}

export async function deleteResourceById(id: string): Promise<boolean> {
  let deleted = false;

  if (supabase) {
    try {
      const { error } = await supabase.from("resources").delete().eq("id", id);
      if (!error) deleted = true;
    } catch (err) {
      console.warn("Supabase delete failed:", err);
    }
  }

  try {
    const db = getDb();
    const stmt = db.prepare(`DELETE FROM resources WHERE id = ?`);
    const result = stmt.run(id);
    if (Number(result.changes) > 0) deleted = true;
  } catch {
    // ignore
  }

  return deleted;
}
