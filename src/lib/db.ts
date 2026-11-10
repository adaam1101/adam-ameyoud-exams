import path from "node:path";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { AcademicResource } from "./ensb-data";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "ensb-archive.sqlite");

let dbInstance: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (!dbInstance) {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
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

export function listResources(): AcademicResource[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT * FROM resources
    WHERE status = 'published'
    ORDER BY datetime(createdAt) DESC
  `);
  const rows = stmt.all() as Record<string, unknown>[];
  return rows.map((row) => ({
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
}

export function createResource(resource: AcademicResource): AcademicResource {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO resources (
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
  return resource;
}

export function incrementDownloadCount(id: string): void {
  const db = getDb();
  const stmt = db.prepare(`UPDATE resources SET downloads = downloads + 1 WHERE id = ?`);
  stmt.run(id);
}

export function deleteResourceById(id: string): boolean {
  const db = getDb();
  const existing = db
    .prepare(`SELECT fileUrl FROM resources WHERE id = ?`)
    .get(id) as { fileUrl?: string } | undefined;

  if (existing?.fileUrl && existing.fileUrl.startsWith("/uploads/")) {
    const filePath = path.join(process.cwd(), "public", existing.fileUrl);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch {
        // Ignore unlink errors
      }
    }
  }

  const stmt = db.prepare(`DELETE FROM resources WHERE id = ?`);
  const result = stmt.run(id);
  return Number(result.changes) > 0;
}
