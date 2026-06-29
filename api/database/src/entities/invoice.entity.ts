import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Patient } from './patient.entity'
import { InvoiceItem } from './invoice-item.entity'
import { Payment } from './payment.entity'

export enum InvoiceStatus {
  PAID = 'Paid',
  PENDING = 'Pending',
  OVERDUE = 'Overdue',
  PARTIAL = 'Partial',
}

/**
 * Corresponds to app/dashboard/billing (lib/mockData.ts -> `invoices`).
 *
 * `amount` is NOT stored as a column — it's `SUM(invoiceItems.amount)`,
 * computed in the service/repository layer (or a DB view) so the total can
 * never drift from its line items. Likewise "Partial" status is derived by
 * comparing the items total against `SUM(payments.amount)` rather than
 * being a status someone has to remember to set manually; it's kept as an
 * enum column here for simple filtering/display, but a service method
 * should recompute and persist it whenever a Payment is added.
 */
@Entity('invoices')
export class Invoice extends BaseEntity {
  @Column({ unique: true })
  @Index()
  invoiceCode!: string

  @ManyToOne(() => Patient, (patient) => patient.invoices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patientId' })
  patient!: Patient

  @Column()
  @Index()
  patientId!: string

  @Column({ type: 'date' })
  issuedOn!: Date

  @Column({ type: 'date' })
  dueOn!: Date

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  @Index()
  status!: InvoiceStatus

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items!: InvoiceItem[]

  @OneToMany(() => Payment, (payment) => payment.invoice)
  payments!: Payment[]
}
