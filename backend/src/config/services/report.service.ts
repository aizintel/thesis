import db from "../database";
import { Report, ErrorResponse } from "../models/Report";

export function addReport(
  id: string,
  product: string,
  productId: string,
  reportedBy: string,
  email: string,
  issueType: string,
  description: string,
  date: Date,
  status: string
): Report | ErrorResponse {
  try {
    const stmt = db.prepare(
      "INSERT INTO reports (id, product, productId, reportedBy, email, issueType, description, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    const info = stmt.run(
      id,
      product,
      productId,
      reportedBy,
      email,
      issueType,
      description,
      date,
      status
    );
    return {
      id: info.lastInsertRowid as unknown as string,
      product,
      productId,
      reportedBy,
      email,
      issueType,
      description,
      date,
      status,
    };
  } catch (error: any) {
    console.error("Error adding report:", error.message);
    return { error: error.message };
  }
}

export function editReport(
  id: string,
  product: string,
  productId: string,
  reportedBy: string,
  email: string,
  issueType: string,
  description: string,
  date: Date,
  status: string
): Report | ErrorResponse {
  try {
    const currentReport: any = db
      .prepare(`SELECT * FROM reports WHERE id = ?`)
      .get(id);

    if (!currentReport) {
      return { error: "Report not found" };
    }

    const stmt = db.prepare(`
            UPDATE reports
            SET product = ?, productId = ?, reportedBy = ?, email = ?, issueType = ?, description = ?, date = ?, status = ?
            WHERE id = ?
        `);

    const info = stmt.run(
      product,
      productId,
      reportedBy,
      email,
      issueType,
      description,
      date,
      status,
      id
    );

    if (info.changes === 0) {
      return { error: "No changes made or report not found" };
    }

    return {
      id,
      product,
      productId,
      reportedBy,
      email,
      issueType,
      description,
      date,
      status,
    };
  } catch (error: any) {
    console.error("Error updating report:", error.message);
    return { error: error.message };
  }
}

export function deleteReport(id: string | number): boolean {
  const stmt = db.prepare("DELETE FROM reports WHERE id = ?");
  const info = stmt.run(id);
  return info.changes > 0;
}

export function getAllReports(): Report[] {
  const stmt = db.prepare("SELECT * FROM reports");
  return stmt.all() as Report[];
}
