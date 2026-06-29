import 'reflect-metadata'
import { DataSource } from 'typeorm'
import {
  User,
  Patient,
  Appointment,
  Treatment,
  Invoice,
  InvoiceItem,
  Payment,
  Supplier,
  InventoryItem,
  ClinicSettings,
  BusinessHours,
  NotificationPreference,
} from './entities'

/**
 * Single DataSource for the dental-care-dashboard backend.
 * Used both at runtime (NestJS/Express app bootstrap) and by the
 * TypeORM CLI for generating/running migrations:
 *
 *   npx typeorm-ts-node-commonjs migration:generate src/migrations/Init -d src/data-source.ts
 *   npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'dental_care',
  // Never true in production — schema changes should always go through
  // a reviewed migration, not be inferred automatically on boot.
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [
    User,
    Patient,
    Appointment,
    Treatment,
    Invoice,
    InvoiceItem,
    Payment,
    Supplier,
    InventoryItem,
    ClinicSettings,
    BusinessHours,
    NotificationPreference,
  ],
  migrations: ['src/migrations/*.ts'],
})
