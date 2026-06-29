import { StatCard } from '@/components/dashboard/cards/StatCard'
import { RevenueChart } from '@/components/dashboard/charts/RevenueChart'
import { AppointmentChart } from '@/components/dashboard/charts/AppointmentChart'
import { TreatmentDistributionChart } from '@/components/dashboard/charts/TreatmentDistributionChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/dashboard/common/Badge'
import { dashboardStats, appointments, patients } from '@/lib/mockData'
import * as Icons from 'lucide-react'

export default function DashboardPage() {
  const getIconComponent = (iconName: string) => {
    return (Icons as any)[iconName] || Icons.Home
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your clinic.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardStats.map((stat) => {
          const Icon = getIconComponent(stat.icon)
          return (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              increase={stat.increase}
              icon={Icon}
            />
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart />
        <AppointmentChart />
      </div>

      {/* Distribution Chart */}
      <div className="grid grid-cols-1 gap-6">
        <TreatmentDistributionChart />
      </div>

      {/* Appointments Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.slice(0, 3).map((apt) => (
                <div key={apt.id} className="flex items-start justify-between border-b border-border pb-4 last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{apt.patientName}</p>
                    <p className="text-sm text-muted-foreground">{apt.dentist}</p>
                    <p className="text-xs text-muted-foreground">{apt.date} at {apt.time}</p>
                  </div>
                  <Badge variant={apt.status === 'Confirmed' ? 'success' : 'info'}>
                    {apt.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.slice(0, 3).map((patient) => (
                <div key={patient.id} className="flex items-start justify-between border-b border-border pb-4 last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.phone}</p>
                    <p className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</p>
                  </div>
                  <Badge variant={patient.status === 'Active' ? 'success' : 'secondary'}>
                    {patient.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
