'use client'

import { useState } from 'react'
import { Plus, FileText, DownloadCloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/dashboard/common/Badge'
import { invoices } from '@/lib/mockData'
import { PAYMENT_STATUS_COLORS } from '@/lib/constants'

export default function BillingPage() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [filteredInvoices, setFilteredInvoices] = useState(invoices)

  const handleStatusFilter = (status: string | null) => {
    setSelectedStatus(status)
    if (status) {
      setFilteredInvoices(invoices.filter((inv) => inv.status === status))
    } else {
      setFilteredInvoices(invoices)
    }
  }

  const statuses = ['Paid', 'Pending', 'Overdue', 'Partial']
  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground">Manage invoices and payments</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Invoice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold text-foreground mt-2">${totalAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Paid</p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              ${invoices.filter((inv) => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 mt-2">
              ${invoices.filter((inv) => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Overdue</p>
            <p className="text-2xl font-bold text-red-600 mt-2">
              ${invoices.filter((inv) => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusFilter(null)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedStatus === null
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-background text-foreground hover:bg-muted'
              }`}
            >
              All Invoices
            </button>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Invoice ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Patient</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Due Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{invoice.id}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.patientName}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">${invoice.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.date}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.dueDate}</td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            PAYMENT_STATUS_COLORS[invoice.status as keyof typeof PAYMENT_STATUS_COLORS] ||
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <DownloadCloud className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                      No invoices found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
