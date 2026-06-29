'use client'

import { useState } from 'react'
import { Bell, Moon, Sun, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/dashboard/common/Badge'

export function TopNav() {
  const [isDark, setIsDark] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side - Search (hidden on mobile) */}
        <div className="hidden md:block flex-1 max-w-md">
          <input
            type="search"
            placeholder="Search patients, appointments..."
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Notification */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* User Menu */}
          <div className="ml-2 hidden border-l border-border pl-2 sm:flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-primary/10"
            >
              <User className="h-4 w-4 text-primary" />
            </Button>
            <div className="flex flex-col">
              <span className="text-xs font-medium">Dr. Chen</span>
              <span className="text-xs text-muted-foreground">Dentist</span>
            </div>
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
