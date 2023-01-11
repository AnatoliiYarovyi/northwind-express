import {
  BetterSQLite3Database,
  drizzle,
} from 'drizzle-orm-sqlite/better-sqlite3';
import Database from 'better-sqlite3';

const connectingToDb = (req, res, next) => {
  const sqlite = new Database('northwind.db');
  const db: BetterSQLite3Database = drizzle(sqlite);

  if (req.body !== null) {
    req.body.connection = db;
  } else {
    req.body = {
      connection: db,
    };
  }

  next();
};

export default connectingToDb;
