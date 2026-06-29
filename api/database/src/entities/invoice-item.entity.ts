import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Invoice } from './invoice.entity'
import { Treatment } from './treatment.entity'

/**
 * Line items for an Invoice (mock data's `invoices[].items`).
 * Optionally links back to the Treatment it bills for, so billing can be
 * generated automatically from completed treatments while still allowing
 * free-form items (e.g. "Consultation and X-ray" in the mock data, which
 * has no corresponding treatment record).
 */
@Entity('invoice_items')
export class InvoiceItem extends BaseEntity {
  @ManyToOne(() => Invoice, (invoice) => invoice.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invoiceId' })
  invoice!: Invoice

  @Column()
  invoiceId!: string

  @ManyToOne(() => Treatment, (treatment) => treatment.invoiceItems, {
    onDelete!: 'SET NULL',
    nullable!: true,
  })
  @JoinColumn({ name: 'treatmentId' })
  treatment!: Treatment

  @Column({ nullable: true })
  treatmentId!: string

  @Column()
  description!: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: string
}
