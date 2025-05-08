import db from '../database';
import { User, ErrorResponse } from '../models/User';

export function addUser(
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'employee' | 'manager' | 'viewer',
    status: 'active' | 'inactive'
): User | ErrorResponse {
    try {
        const stmt = db.prepare(
            'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)'
        );

        const info = stmt.run(name, email, password, role, status);
        return { id: info.lastInsertRowid as number, name, email, password, role, status };
    } catch (error: any) {
        console.error('Error adding user:', error.message);
        return { error: error.message };
    }
}

export function editUser(
    id: number,
    name: string,
    email: string,
    role: 'admin' | 'employee' | 'manager' | 'viewer',
    status: 'active' | 'inactive',
): User | ErrorResponse {
    try {
        const normalizedEmail = email.trim().toLowerCase();
        const currentUser: any = db.prepare(`SELECT email FROM users WHERE id = ?`).get(id);

        if (!currentUser) {
            return { error: 'User not found' };
        }

        if (normalizedEmail !== currentUser.email.trim().toLowerCase()) {
            const emailCheck = db.prepare(`
                SELECT id FROM users WHERE LOWER(email) = ? AND id != ?
            `).get(normalizedEmail, id);

            if (emailCheck) {
                return { error: 'Email is already in use by another user' };
            }
        }

        const stmt = db.prepare(`
            UPDATE users
            SET name = ?, email = ?, role = ?, status = ?
            WHERE id = ?
        `);

        const info = stmt.run(name, normalizedEmail, role, status, id);

        if (info.changes === 0) {
            return { error: 'No changes made or user not found' };
        }

        return { id, name, email: normalizedEmail, role, status };
    } catch (error: any) {
        console.error('Error updating user:', error.message);
        return { error: error.message };
    }
}



export function deleteUser(id: string | number): boolean {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const info = stmt.run(id);
    return info.changes > 0;
}

export function getAllUsers(): User[] {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all() as User[];
}

export function getUser(email: string, password: string): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?');
    return stmt.get(email, password) as User | undefined;
}
