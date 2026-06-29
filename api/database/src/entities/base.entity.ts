import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

/**
 * Shared columns for every table.
 * - `id` is a UUID, not an auto-increment int, so the frontend's existing
 *   human-readable codes (P001, A001, INV001...) can live in a separate
 *   `code` column instead of being overloaded as the primary key.
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date
}
