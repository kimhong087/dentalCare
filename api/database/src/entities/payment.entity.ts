import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Invoice } from './invoice.entity'

export enum PaymentMethod {
  CASH = 'Cash',
  CARD = 'Card',
  INSURANCE = 'Insurance',
  BANK_TRANSFER = 'Bank Transfer',
  OTHER = 'Other',
}

/**
 * Not present as a distinct table in the mock data, but required to make
 * sense of it: the mock `invoices` have a "Partial" status, which implies
 * partial payments are tracked somewhere. This entity is that "somewhere" —
 * one invoice can receive multiple payments over time (deposit + balance,
 * insurance reimbursement + patient co-pay, etc), and the invoice's status
 * is derived from comparing the sum of these against the invoice total.
 */
@Entity('payments')
export class Payment extends BaseEntity {
  @ManyToOne(() => Invoice, (invoice) => invoice.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invoiceId' })
  invoice!: Invoice

  @Column()
  invoiceId!: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: string

  @Column({ type: 'date' })
  paidOn!: Date

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.CASH })
  method!: PaymentMethod

  @Column({ nullable: true })
  referenceNumber!: string
}
