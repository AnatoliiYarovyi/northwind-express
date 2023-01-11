import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { suppliers } from '../data/tables/suppliersTable';

export class Suppliers {
  async getName(req, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const data = db.select(suppliers).all();

    res.status(200).json({
      status: 'success',
      data,
    });
  }
}
