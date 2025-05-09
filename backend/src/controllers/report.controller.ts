import { Request, Response } from 'express';

import {
    addReport as addReportToDB,
    deleteReport as deleteReportFromDB,
    getAllReports as getAllReportsFromDB,
    editReport as editReportInDB
} from "../config/services/report.service";


export const addReport = async (req: Request, res: Response): Promise<void> => {
    const { id, product, productId, reportedBy, email, issueType, description, date, status } = req.body;

    if (!id || !product || !productId || !reportedBy || !email || !issueType || !description || !date || !status) {
        res.status(400).json({ data: { error: 'Missing required fields' } });
        return;
    }

    try {
        const report: any = addReportToDB(id, product, productId, reportedBy, email, issueType, description, date, status);

        if (!report || !report.id) {
            res.status(400).json({ data: { error: 'Failed to create report' } });
            return;
        }

        res.status(201).json({ data: report });
    } catch (err) {
        console.error('Error in report controller:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};

export const deleteReport = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ data: { error: 'Report ID is required' } });
        return;
    }

    try {
        const result = deleteReportFromDB(id);

        if (!result) {
            res.status(404).json({ data: { error: 'Report not found' } });
            return;
        }

        res.status(200).json({ data: { message: 'Report deleted successfully' } });
    } catch (err) {
        console.error('Error deleting report:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};

export const getAllReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const reports = getAllReportsFromDB();
        res.status(200).json({ data: reports });
    } catch (err) {
        console.error('Error retrieving reports:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};

export const editReport = async (req: Request, res: Response): Promise<void> => {
    const { id, product, productId, reportedBy, email, issueType, description, date, status } = req.body;

    if (!id || !product || !productId || !reportedBy || !email || !issueType || !description || !date || !status) {
        res.status(400).json({ data: { error: 'Missing required fields' } });
        return;
    }

    try {
        const report = editReportInDB(id, product, productId, reportedBy, email, issueType, description, date, status);

        if (!report) {
            res.status(404).json({ data: { error: 'Report not found' } });
            return;
        }

        res.status(200).json({ data: report });
    } catch (err) {
        console.error('Error editing report:', err);
        res.status(500).json({ data: { error: 'Internal server error' } });
    }
};