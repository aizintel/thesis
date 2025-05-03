import Database from 'better-sqlite3';

let db: Database.Database;

function initializeDatabase(): Database.Database {
    if (!db) {
        try {
    
            db = new Database('database.sqlite3');
            console.log('SQLite database connected successfully.');

            db.prepare(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT,
                    role TEXT CHECK(role IN ('admin', 'employee', 'manager', 'viewer')),
                    status TEXT CHECK(status IN ('active', 'inactive'))
                )
            `).run();
            
            console.log('"users" table is ready.');

            db.prepare(`
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    sku TEXT UNIQUE NOT NULL,
                    category TEXT CHECK(category IN ('Lubricants', 'Car Care', 'Accessories', 'Snacks', 'Gas', 'Beverages')),
                    price REAL CHECK(price >= 0),
                    stock INTEGER CHECK(stock >= 0)
                )
            `).run();
            console.log('"products" table is ready.');
        
        } catch (error) {
            console.error('Failed to connect or initialize database:', error);
            process.exit(1);
        }
    }
    return db;
}

export { initializeDatabase };
export default initializeDatabase(); 
