import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ClinicSettings } from './clinic-settings.entity'

export enum DayOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

/**
 * One row per day of the week (the settings page lists each day with its
 * own open/close time and an enabled toggle), rather than 7 columns on
 * ClinicSettings — keeps the entity flat and makes "is the clinic open on
 * day X" a simple lookup instead of dynamic field access.
 */
@Entity('business_hours')
@Unique(['clinicSettingsId', 'dayOfWeek'])
export class BusinessHours extends BaseEntity {
  @ManyToOne(() => ClinicSettings, (settings) => settings.businessHours, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clinicSettingsId' })
  clinicSettings!: ClinicSettings

  @Column()
  clinicSettingsId!: string

  @Column({ type: 'enum', enum: DayOfWeek })
  dayOfWeek!: DayOfWeek

  @Column({ default: true })
  isOpen!: boolean

  /** Stored as 'HH:mm', e.g. '09:00' */
  @Column({ type: 'time', nullable: true })
  openTime!: string

  @Column({ type: 'time', nullable: true })
  closeTime!: string
}
