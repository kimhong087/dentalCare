import { Column, Entity, Index, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Appointment } from './appointment.entity'
import { Treatment } from './treatment.entity'

export enum UserRole {
  ADMIN = 'Admin',
  DENTIST = 'Dentist',
  HYGIENIST = 'Hygienist',
  RECEPTIONIST = 'Receptionist',
}

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

/**
 * Staff / login accounts. Corresponds to the "Users" / "Staff Management"
 * page (lib/mockData.ts -> `staff`).
 *
 * Dentists and hygienists are Users too (role = DENTIST / HYGIENIST) rather
 * than a separate "Dentist" table, so an appointment or treatment can be
 * assigned to anyone qualified to perform it, and so staff who are also
 * patients of record never get confused with the Patient entity below.
 */
@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  @Index()
  email!: string

  @Column({ select: false })
  passwordHash!: string

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column({ nullable: true })
  phone!: string

  @Column({ type: 'enum', enum: UserRole })
  role!: UserRole

  /** e.g. "General Dentistry", "Endodontics", "Front Desk" */
  @Column({ nullable: true })
  specialization!: string

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus

  @OneToMany(() => Appointment, (appointment) => appointment.provider)
  appointments!: Appointment[]

  @OneToMany(() => Treatment, (treatment) => treatment.provider)
  treatments!: Treatment[]
}
