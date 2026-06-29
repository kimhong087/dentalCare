import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Supplier } from './supplier.entity'

export enum InventoryUnit {
  SYRINGES = 'syringes',
  BOXES = 'boxes',
  SETS = 'sets',
  UNITS = 'units',
  BOTTLES = 'bottles',
}

/**
 * Corresponds to app/dashboard/inventory (lib/mockData.ts -> `inventory`).
 * "Low Stock Items" (seen on the dashboard stat card) is simply
 * `quantity <= reorderLevel`, computed at query time rather than stored,
 * since it has to stay live as quantity changes.
 */
@Entity('inventory_items')
export class InventoryItem extends BaseEntity {
  @Column({ unique: true })
  @Index()
  itemCode!: string

  @Column()
  name!: string

  @Column({ type: 'int', default: 0 })
  quantity!: number

  @Column({ type: 'enum', enum: InventoryUnit, default: InventoryUnit.UNITS })
  unit!: InventoryUnit

  @Column({ type: 'int' })
  reorderLevel!: number

  @ManyToOne(() => Supplier, (supplier) => supplier.inventoryItems, {
    onDelete!: 'SET NULL',
    nullable!: true,
  })
  @JoinColumn({ name: 'supplierId' })
  supplier!: Supplier

  @Column({ nullable: true })
  supplierId!: string

  /** Unit cost */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost!: string
}
