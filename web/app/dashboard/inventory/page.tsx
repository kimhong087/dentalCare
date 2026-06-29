'use client'

import { useState } from 'react'
import { Plus, AlertTriangle, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/dashboard/common/Badge'
import { inventory } from '@/lib/mockData'

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showLowStock, setShowLowStock] = useState(false)

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStock = !showLowStock || item.quantity <= item.reorderLevel
    return matchesSearch && matchesStock
  })

  const lowStockCount = inventory.filter((item) => item.quantity <= item.reorderLevel).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground">Manage supplies and equipment</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/10">
          <CardContent className="flex items-center gap-4 pt-6">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <div className="flex-1">
              <p className="font-medium text-yellow-900 dark:text-yellow-200">Low Stock Alert</p>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                {lowStockCount} item{lowStockCount !== 1 ? 's' : ''} below reorder level
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLowStock(!showLowStock)}
              className="border-yellow-300"
            >
              {showLowStock ? 'Show All' : 'View Low Stock'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Stock Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Item Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Unit</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Reorder Level</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Supplier</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Unit Cost</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => {
                    const isLowStock = item.quantity <= item.reorderLevel
                    return (
                      <tr
                        key={item.id}
                        className={`border-b border-border hover:bg-muted/50 ${isLowStock ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{item.name}</td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-foreground">{item.quantity}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{item.unit}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{item.reorderLevel}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{item.supplier}</td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">${item.cost.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={isLowStock ? 'danger' : 'success'}
                          >
                            {isLowStock ? 'Low Stock' : 'In Stock'}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                      {searchTerm ? 'No items found' : 'No inventory items'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Items Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Items Requiring Reorder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {inventory
              .filter((item) => item.quantity <= item.reorderLevel)
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {item.quantity} {item.unit} | Reorder: {item.reorderLevel} {item.unit}
                    </p>
                    <p className="text-xs text-muted-foreground">Supplier: {item.supplier}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Order
                  </Button>
                </div>
              ))}
            {inventory.filter((item) => item.quantity <= item.reorderLevel).length === 0 && (
              <p className="text-center text-muted-foreground py-4">All items are adequately stocked</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
