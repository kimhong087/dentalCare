'use client'

import { useState } from 'react'
import { Plus, Mail, Phone, Edit2, Trash2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/dashboard/common/Badge'
import { staff } from '@/lib/mockData'
import { USER_ROLE_COLORS } from '@/lib/constants'

export default function UsersPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [filteredStaff, setFilteredStaff] = useState(staff)

  const handleRoleFilter = (role: string | null) => {
    setSelectedRole(role)
    if (role) {
      setFilteredStaff(staff.filter((s) => s.role === role))
    } else {
      setFilteredStaff(staff)
    }
  }

  const roles = [...new Set(staff.map((s) => s.role))]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Manage clinic staff and user accounts</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Role Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleRoleFilter(null)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedRole === null
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-background text-foreground hover:bg-muted'
              }`}
            >
              All Roles
            </button>
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleFilter(role)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedRole === role
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Staff Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStaff.length > 0 ? (
          filteredStaff.map((member) => (
            <Card key={member.id} className="hover:border-primary/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                    <Badge
                      className={`mt-2 ${
                        USER_ROLE_COLORS[member.role as keyof typeof USER_ROLE_COLORS] ||
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {member.role}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 space-y-3 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${member.email}`} className="text-primary hover:underline">
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${member.phone}`} className="text-primary hover:underline">
                      {member.phone}
                    </a>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Specialization</p>
                    <p className="font-medium text-foreground">{member.specialization}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-muted-foreground">{member.status}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 border-t border-border pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No staff members found</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Team Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Team Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {roles.map((role) => (
              <div key={role}>
                <p className="text-sm text-muted-foreground">{role}</p>
                <p className="text-2xl font-bold text-foreground">
                  {staff.filter((s) => s.role === role).length}
                </p>
              </div>
            ))}
            <div>
              <p className="text-sm text-muted-foreground">Total Staff</p>
              <p className="text-2xl font-bold text-foreground">{staff.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
