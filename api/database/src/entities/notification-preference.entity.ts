import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { User } from './user.entity'

/**
 * The settings page's notification toggles (email/SMS reminders, low-stock
 * alerts, etc) are modeled per-user rather than as a single global row —
 * each staff member should be able to opt in/out of their own alerts
 * without it being a clinic-wide config. 1:1 with User.
 */
@Entity('notification_preferences')
export class NotificationPreference extends BaseEntity {
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User

  @Column({ unique: true })
  userId!: string

  @Column({ default: true })
  emailAppointmentReminders!: boolean

  @Column({ default: false })
  smsAppointmentReminders!: boolean

  @Column({ default: true })
  lowStockAlerts!: boolean

  @Column({ default: true })
  paymentDueAlerts!: boolean
}
