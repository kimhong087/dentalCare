import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Patient } from './patient.entity'
import { User } from './user.entity'
import { Treatment } from './treatment.entity'

export enum AppointmentStatus {
  SCHEDULED = 'Scheduled',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  NO_SHOW = 'No Show',
}

/**
 * Corresponds to app/dashboard/appointments (lib/mockData.ts -> `appointments`).
 *
 * The mock data's separate `date` (string) + `time` (string, "09:00 AM")
 * fields are combined into a single `startsAt` timestamptz column, plus a
 * `durationMinutes` so the calendar/grid views can compute end times and
 * detect overlaps. `patientName` / `dentist` (name strings) are dropped in
 * favor of FK relations to Patient / User — names are looked up via the
 * relation instead of duplicated and risking drift.
 *
 * `type` (Cleaning, Filling, ...) is intentionally a free string here
 * rather than the same enum as Treatment.category: an appointment is a
 * *booking intent* ("come in for a filling") while a Treatment is the
 * *clinical record* of what was actually done, and they can diverge
 * (patient booked for a cleaning, dentist found a cavity and did a filling
 * instead).
 */
@Entity('appointments')
export class Appointment extends BaseEntity {
  @Column({ unique: true })
  @Index()
  appointmentCode!: string

  @ManyToOne(() => Patient, (patient) => patient.appointments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patientId' })
  patient!: Patient

  @Column()
  @Index()
  patientId!: string

  /** The dentist or hygienist this appointment is booked with */
  @ManyToOne(() => User, (user) => user.appointments, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'providerId' })
  provider!: User

  @Column({ nullable: true })
  @Index()
  providerId!: string

  @Column({ type: 'timestamptz' })
  @Index()
  startsAt!: Date

  @Column({ type: 'int', default: 30 })
  durationMinutes!: number

  /** Booking intent, e.g. "Cleaning", "Filling", "Root Canal" */
  @Column()
  type!: string

  @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.SCHEDULED })
  status!: AppointmentStatus

  @Column({ type: 'text', nullable: true })
  notes!: string

  /** Populated once the appointment results in an actual treatment record */
  @OneToOne(() => Treatment, (treatment) => treatment.appointment)
  treatment!: Treatment
}
