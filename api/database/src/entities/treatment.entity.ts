import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Patient } from './patient.entity'
import { User } from './user.entity'
import { Appointment } from './appointment.entity'
import { InvoiceItem } from './invoice-item.entity'

export enum TreatmentStatus {
  PLANNED = 'Planned',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum TreatmentType {
  CLEANING = 'Cleaning',
  FILLING = 'Filling',
  ROOT_CANAL = 'Root Canal',
  CROWN = 'Crown',
  BRIDGE = 'Bridge',
  IMPLANT = 'Implant',
  EXTRACTION = 'Extraction',
  WHITENING = 'Whitening',
  ORTHODONTICS = 'Orthodontics',
  VENEER = 'Veneer',
}

/**
 * Corresponds to app/dashboard/treatments (lib/mockData.ts -> `treatments`).
 *
 * `cost` here is the clinical line-item price. The matching billing amount
 * lives on InvoiceItem (often a 1:1 copy at creation time) so that price
 * changes/discounts applied during billing never silently rewrite the
 * clinical record.
 *
 * `toothNumber` is added (universal numbering 1-32) since treatment notes
 * in the mock data already reference specific teeth ("tooth #14",
 * "tooth #28") in free text — pulling it into a real column makes it
 * queryable/chartable without parsing notes.
 */
@Entity('treatments')
export class Treatment extends BaseEntity {
  @Column({ unique: true })
  @Index()
  treatmentCode!: string

  @ManyToOne(() => Patient, (patient) => patient.treatments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patientId' })
  patient!: Patient

  @Column()
  @Index()
  patientId!: string

  @ManyToOne(() => User, (user) => user.treatments, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'providerId' })
  provider!: User

  @Column({ nullable: true })
  providerId!: string

  /** The booking this treatment fulfilled, if any (walk-ins have none) */
  @OneToOne(() => Appointment, (appointment) => appointment.treatment, {
    onDelete!: 'SET NULL',
    nullable!: true,
  })
  @JoinColumn({ name: 'appointmentId' })
  appointment!: Appointment

  @Column({ nullable: true })
  appointmentId!: string

  @Column({ type: 'enum', enum: TreatmentType })
  type!: TreatmentType

  @Column({ type: 'date' })
  performedOn!: Date

  @Column({ type: 'int', nullable: true })
  toothNumber!: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost!: string

  @Column({ type: 'enum', enum: TreatmentStatus, default: TreatmentStatus.PLANNED })
  status!: TreatmentStatus

  @Column({ type: 'text', nullable: true })
  notes!: string

  @OneToMany(() => InvoiceItem, (item) => item.treatment)
  invoiceItems!: InvoiceItem[]
}
