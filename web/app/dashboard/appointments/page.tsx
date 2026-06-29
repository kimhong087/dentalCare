'use client'

import { useState } from 'react'
import { Plus, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/dashboard/common/Badge'
import { appointments } from '@/lib/mockData'
import { APPOINTMENT_STATUS_COLORS } from '@/lib/constants'

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState('2024-06-05')
  const [filteredAppointments, setFilteredAppointments] = useState(
    appointments.filter((apt) => apt.date === selectedDate)
  )

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    setFilteredAppointments(appointments.filter((apt) => apt.date === date))
  }

  const uniqueDates = [...new Set(appointments.map((apt) => apt.date))]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage patient appointments</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {/* Date Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {uniqueDates.map((date) => (
              <button
                key={date}
                onClick={() => handleDateChange(date)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedDate === date
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="grid gap-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:border-primary/50">
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Left side */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Patient</p>
                      <p className="text-lg font-semibold text-foreground">
                        {appointment.patientName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dentist</p>
                      <p className="font-medium text-foreground">{appointment.dentist}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Treatment Type</p>
                      <p className="font-medium text-foreground">{appointment.type}</p>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium text-foreground">{appointment.time}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge
                        className={
                          APPOINTMENT_STATUS_COLORS[
                            appointment.status as keyof typeof APPOINTMENT_STATUS_COLORS
                          ] || 'bg-gray-100 text-gray-800'
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    {appointment.notes && (
                      <div>
                        <p className="text-sm text-muted-foreground">Notes</p>
                        <p className="text-sm font-medium text-foreground">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex gap-2 border-t border-border pt-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  No appointments scheduled for this date
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
