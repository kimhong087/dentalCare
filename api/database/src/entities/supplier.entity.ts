import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { InventoryItem } from './inventory-item.entity'

/**
 * Normalizes the mock data's `inventory[].supplier` (a plain string,
 * repeated across rows: "Dental Supplies Plus", "MedSupply Co", "ProDental")
 * into its own table so supplier contact info can be tracked once and
 * updated in one place.
 */
@Entity('suppliers')
export class Supplier extends BaseEntity {
  @Column({ unique: true })
  name!: string

  @Column({ nullable: true })
  contactName!: string

  @Column({ nullable: true })
  email!: string

  @Column({ nullable: true })
  phone!: string

  @OneToMany(() => InventoryItem, (item) => item.supplier)
  inventoryItems!: InventoryItem[]
}
