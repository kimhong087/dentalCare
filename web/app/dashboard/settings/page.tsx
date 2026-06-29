'use client'

import { useState } from 'react'
import { Save, Bell, Lock, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SettingsPage() {
  const [clinicName, setClinicName] = useState('DentalCare Clinic')
  const [address, setAddress] = useState('123 Dental Street, Medical City, MC 12345')
  const [phone, setPhone] = useState('+1 (555) 123-4567')
  const [email, setEmail] = useState('info@dentalcare.com')

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    appointmentReminders: true,
    paymentNotifications: true,
    staffUpdates: false,
  })

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage clinic settings and preferences</p>
      </div>

      <Tabs defaultValue="clinic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="clinic">Clinic Info</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Clinic Settings Tab */}
        <TabsContent value="clinic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clinic Information</CardTitle>
              <CardDescription>
                Update your clinic details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Clinic Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Clinic Name</label>
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <h4 className="mb-3 font-medium text-foreground">Business Hours</h4>
                <div className="space-y-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                    <div key={day} className="flex items-center gap-4">
                      <label className="w-24 text-sm text-muted-foreground">{day}</label>
                      <input
                        type="time"
                        defaultValue="09:00"
                        className="rounded border border-input px-3 py-1 text-sm"
                      />
                      <span className="text-sm text-muted-foreground">to</span>
                      <input
                        type="time"
                        defaultValue="18:00"
                        className="rounded border border-input px-3 py-1 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how and when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                  <div>
                    <p className="font-medium text-foreground">
                      {key === 'emailAlerts' && 'Email Alerts'}
                      {key === 'appointmentReminders' && 'Appointment Reminders'}
                      {key === 'paymentNotifications' && 'Payment Notifications'}
                      {key === 'staffUpdates' && 'Staff Updates'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {key === 'emailAlerts' && 'Receive alerts via email for important updates'}
                      {key === 'appointmentReminders' && 'Get reminders for upcoming appointments'}
                      {key === 'paymentNotifications' && 'Notifications about pending payments'}
                      {key === 'staffUpdates' && 'Updates about staff activity'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key as keyof typeof notifications)}
                    className="h-4 w-4 rounded border-input text-primary accent-primary"
                  />
                </div>
              ))}

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Theme</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      defaultChecked
                      className="h-4 w-4 border-input text-primary accent-primary"
                    />
                    <span className="text-sm text-foreground">Light</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      className="h-4 w-4 border-input text-primary accent-primary"
                    />
                    <span className="text-sm text-foreground">Dark</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      className="h-4 w-4 border-input text-primary accent-primary"
                    />
                    <span className="text-sm text-foreground">Auto</span>
                  </label>
                </div>
              </div>

              {/* Sidebar Layout */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Sidebar Layout</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="layout"
                      defaultChecked
                      className="h-4 w-4 border-input text-primary accent-primary"
                    />
                    <span className="text-sm text-foreground">Expanded</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="layout"
                      className="h-4 w-4 border-input text-primary accent-primary"
                    />
                    <span className="text-sm text-foreground">Collapsed</span>
                  </label>
                </div>
              </div>

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Appearance
              </Button>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full">
                Manage Sessions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
