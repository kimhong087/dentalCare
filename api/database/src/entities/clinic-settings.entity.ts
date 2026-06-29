import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { BusinessHours } from './business-hours.entity'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export enum SidebarLayout {
  EXPANDED = 'expanded',
  COMPACT = 'compact',
}

/**
 * Corresponds to app/dashboard/settings's clinic-info and appearance
 * fields. Modeled as a single-row-per-clinic table (rather than baking
 * these into env vars/config) so a future multi-location version just
 * needs to add a `locationId` and nothing else changes.
 */
@Entity('clinic_settings')
export class ClinicSettings extends BaseEntity {
  @Column()
  clinicName!: string

  @Column()
  address!: string

  @Column()
  phone!: string

  @Column()
  email!: string

  @Column({ type: 'enum', enum: Theme, default: Theme.SYSTEM })
  theme!: Theme

  @Column({ type: 'enum', enum: SidebarLayout, default: SidebarLayout.EXPANDED })
  sidebarLayout!: SidebarLayout

  @OneToMany(() => BusinessHours, (hours) => hours.clinicSettings, { cascade: true })
  businessHours!: BusinessHours[]
}
