// App Routes
export const ROUTES = {
  DASHBOARD: '/dashboard',
  PATIENTS: '/dashboard/patients',
  APPOINTMENTS: '/dashboard/appointments',
  TREATMENTS: '/dashboard/treatments',
  BILLING: '/dashboard/billing',
  INVENTORY: '/dashboard/inventory',
  USERS: '/dashboard/users',
  SETTINGS: '/dashboard/settings',
}

// Navigation menu items
export const MENU_ITEMS = [
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    label: 'Patients',
    href: ROUTES.PATIENTS,
    icon: 'Users',
  },
  {
    label: 'Appointments',
    href: ROUTES.APPOINTMENTS,
    icon: 'Calendar',
  },
  {
    label: 'Treatments',
    href: ROUTES.TREATMENTS,
    icon: 'ClipboardList',
  },
  {
    label: 'Billing',
    href: ROUTES.BILLING,
    icon: 'DollarSign',
  },
  {
    label: 'Inventory',
    href: ROUTES.INVENTORY,
    icon: 'Package',
  },
  {
    label: 'Users',
    href: ROUTES.USERS,
    icon: 'Users2',
  },
  {
    label: 'Settings',
    href: ROUTES.SETTINGS,
    icon: 'Settings',
  },
]

// Appointment statuses
export const APPOINTMENT_STATUSES = {
  SCHEDULED: 'Scheduled',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  NO_SHOW: 'No Show',
}

export const APPOINTMENT_STATUS_COLORS = {
  Scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Completed: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'No Show': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
}

// Payment statuses
export const PAYMENT_STATUSES = {
  PAID: 'Paid',
  PENDING: 'Pending',
  OVERDUE: 'Overdue',
  PARTIAL: 'Partial',
}

export const PAYMENT_STATUS_COLORS = {
  Paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  Partial: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
}

// User roles
export const USER_ROLES = {
  DENTIST: 'Dentist',
  RECEPTIONIST: 'Receptionist',
  HYGIENIST: 'Hygienist',
  ADMIN: 'Admin',
}

export const USER_ROLE_COLORS = {
  Dentist: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Receptionist: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Hygienist: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  Admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

// Treatment types
export const TREATMENT_TYPES = [
  'Cleaning',
  'Filling',
  'Root Canal',
  'Crown',
  'Bridge',
  'Implant',
  'Extraction',
  'Whitening',
  'Orthodontics',
  'Veneer',
]
