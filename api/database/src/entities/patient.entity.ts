import { Column, Entity, Index, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Appointment } from './appointment.entity'
import { Treatment } from './treatment.entity'
import { Invoice } from './invoice.entity'

export enum PatientStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

/**
 * Corresponds to app/dashboard/patients (lib/mockData.ts -> `patients`).
 *
 * `dateOfBirth` replaces the mock data's `age` field — age is a derived,
 * moving-target value that shouldn't be stored directly.
 *
 * `insuranceProvider`/`insurancePolicyNumber` are flattened columns rather
 * than a separate Insurance table, since the mock data and UI only ever
 * show one insurance plan per patient. If multi-plan support is needed
 * later, this can be split into its own entity without touching anything
 * else.
 */
@Entity('patients')
export class Patient extends BaseEntity {
  /** Human-readable identifier shown in the UI, e.g. "P001" */
  @Column({ unique: true })
  @Index()
  patientCode!: string 

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column({ unique: true })
  email!: string

  @Column()
  phone!: string

  @Column({ type: 'date', nullable: true })
  dateOfBirth!: Date

  @Column({ type: 'date', nullable: true })
  lastVisitDate!: Date

  @Column({ type: 'enum', enum: PatientStatus, default: PatientStatus.ACTIVE })
  status!: PatientStatus

  @Column({ nullable: true })
  insuranceProvider!: string

  @Column({ nullable: true })
  insurancePolicyNumber!: string

  @Column({ type: 'text', nullable: true })
  notes!: string

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments!: Appointment[]

  @OneToMany(() => Treatment, (treatment) => treatment.patient)
  treatments!: Treatment[]

  @OneToMany(() => Invoice, (invoice) => invoice.patient)
  invoices!: Invoice[]
}
