'use client'

import { useState } from 'react'
import { Plus, FileText, Pill } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/dashboard/common/Badge'
import { treatments } from '@/lib/mockData'
import { TREATMENT_TYPES } from '@/lib/constants'

export default function TreatmentsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [filteredTreatments, setFilteredTreatments] = useState(treatments)

  const handleTypeFilter = (type: string | null) => {
    setSelectedType(type)
    if (type) {
      setFilteredTreatments(treatments.filter((t) => t.type === type))
    } else {
      setFilteredTreatments(treatments)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Treatments</h1>
          <p className="text-muted-foreground">View and manage treatment records</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Record Treatment
        </Button>
      </div>

      {/* Treatment Type Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Filter by Treatment Type</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTypeFilter(null)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedType === null
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                All Types
              </button>
              {TREATMENT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeFilter(type)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background text-foreground hover:bg-muted'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatments List */}
      <div className="grid gap-4">
        {filteredTreatments.length > 0 ? (
          filteredTreatments.map((treatment) => (
            <Card key={treatment.id} className="hover:border-primary/50">
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Left side - Patient & Treatment Info */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Patient</p>
                      <p className="text-lg font-semibold text-foreground">
                        {treatment.patientName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Treatment Type</p>
                      <p className="font-medium text-foreground">{treatment.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dentist</p>
                      <p className="font-medium text-foreground">{treatment.dentist}</p>
                    </div>
                  </div>

                  {/* Right side - Date, Cost, Status */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{treatment.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cost</p>
                      <p className="font-medium text-foreground">${treatment.cost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge
                        variant={treatment.status === 'Completed' ? 'success' : 'info'}
                      >
                        {treatment.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {treatment.notes && (
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="mt-2 text-sm text-foreground">{treatment.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex gap-2 border-t border-border pt-4">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="h-4 w-4" />
                    View Records
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Pill className="h-4 w-4" />
                    Prescription
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  No treatments found for this filter
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
