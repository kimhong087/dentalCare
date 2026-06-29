import { AppDataSource } from './data-source'
import { User, UserRole } from './entities/user.entity'
import { Patient, PatientStatus } from './entities/patient.entity'
import { Appointment, AppointmentStatus } from './entities/appointment.entity'
import { Treatment, TreatmentStatus, TreatmentType } from './entities/treatment.entity'
import { Invoice, InvoiceStatus } from './entities/invoice.entity'
import { InvoiceItem } from './entities/invoice-item.entity'
import { Supplier } from './entities/supplier.entity'
import { InventoryItem, InventoryUnit } from './entities/inventory-item.entity'
import { ClinicSettings } from './entities/clinic-settings.entity'
import { BusinessHours, DayOfWeek } from './entities/business-hours.entity'

/**
 * Seeds the schema with the same rows found in the original Next.js app's
 * lib/mockData.ts, so you can boot the real frontend against a real
 * database and see identical numbers.
 */
async function seed() {
  await AppDataSource.initialize()

  const userRepo = AppDataSource.getRepository(User)
  const patientRepo = AppDataSource.getRepository(Patient)
  const apptRepo = AppDataSource.getRepository(Appointment)
  const treatmentRepo = AppDataSource.getRepository(Treatment)
  const invoiceRepo = AppDataSource.getRepository(Invoice)
  const supplierRepo = AppDataSource.getRepository(Supplier)
  const inventoryRepo = AppDataSource.getRepository(InventoryItem)
  const settingsRepo = AppDataSource.getRepository(ClinicSettings)

  // --- Staff / Users -------------------------------------------------
  const staffSeed = [
    { name: 'Dr. Robert Chen', role: UserRole.DENTIST, email: 'r.chen@dentalcare.com', phone: '+1 (555) 111-2222', specialization: 'General Dentistry' },
    { name: 'Dr. Lisa Anderson', role: UserRole.DENTIST, email: 'l.anderson@dentalcare.com', phone: '+1 (555) 222-3333', specialization: 'Endodontics' },
    { name: 'Dr. Sarah Martinez', role: UserRole.DENTIST, email: 's.martinez@dentalcare.com', phone: '+1 (555) 333-4444', specialization: 'Prosthodontics' },
    { name: 'Jennifer Lee', role: UserRole.RECEPTIONIST, email: 'j.lee@dentalcare.com', phone: '+1 (555) 444-5555', specialization: 'Front Desk' },
    { name: 'Maria Garcia', role: UserRole.HYGIENIST, email: 'm.garcia@dentalcare.com', phone: '+1 (555) 555-6666', specialization: 'Dental Hygiene' },
  ]
  const users: Record<string, User> = {}
  for (const s of staffSeed) {
    const [firstName, ...rest] = s.name.replace('Dr. ', '').split(' ')
    const user = await userRepo.save(
      userRepo.create({
        email: s.email,
        passwordHash: 'CHANGE_ME', // replace with a real bcrypt hash at signup time
        firstName,
        lastName: rest.join(' '),
        phone: s.phone,
        role: s.role,
        specialization: s.specialization,
      }),
    )
    users[s.name] = user
  }

  // --- Patients --------------------------------------------------------
  const patientSeed = [
    { code: 'P001', name: 'John Smith', email: 'john.smith@email.com', phone: '+1 (555) 123-4567', age: 32, lastVisit: '2024-05-15', status: PatientStatus.ACTIVE, insurance: 'Blue Shield' },
    { code: 'P002', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 (555) 234-5678', age: 28, lastVisit: '2024-05-10', status: PatientStatus.ACTIVE, insurance: 'Aetna' },
    { code: 'P003', name: 'Michael Brown', email: 'mbrown@email.com', phone: '+1 (555) 345-6789', age: 45, lastVisit: '2024-04-20', status: PatientStatus.INACTIVE, insurance: 'Cigna' },
    { code: 'P004', name: 'Emily Davis', email: 'emily.davis@email.com', phone: '+1 (555) 456-7890', age: 36, lastVisit: '2024-05-18', status: PatientStatus.ACTIVE, insurance: 'Delta Dental' },
    { code: 'P005', name: 'David Wilson', email: 'dwilson@email.com', phone: '+1 (555) 567-8901', age: 52, lastVisit: '2024-03-10', status: PatientStatus.INACTIVE, insurance: 'MetLife' },
  ]
  const patients: Record<string, Patient> = {}
  for (const p of patientSeed) {
    const [firstName, ...rest] = p.name.split(' ')
    const dob = new Date()
    dob.setFullYear(dob.getFullYear() - p.age)
    const patient = await patientRepo.save(
      patientRepo.create({
        patientCode: p.code,
        firstName,
        lastName: rest.join(' '),
        email: p.email,
        phone: p.phone,
        dateOfBirth: dob,
        lastVisitDate: new Date(p.lastVisit),
        status: p.status,
        insuranceProvider: p.insurance,
      }),
    )
    patients[p.code] = patient
  }

  // --- Appointments ------------------------------------------------------
  const apptSeed = [
    { code: 'A001', patient: 'P001', date: '2024-06-05T09:00:00', dentist: 'Dr. Robert Chen', type: 'Cleaning', status: AppointmentStatus.CONFIRMED, notes: 'Regular checkup' },
    { code: 'A002', patient: 'P002', date: '2024-06-05T10:30:00', dentist: 'Dr. Lisa Anderson', type: 'Filling', status: AppointmentStatus.SCHEDULED, notes: 'Cavity in tooth #14' },
    { code: 'A003', patient: 'P004', date: '2024-06-05T14:00:00', dentist: 'Dr. Robert Chen', type: 'Root Canal', status: AppointmentStatus.CONFIRMED, notes: 'Follow-up treatment' },
    { code: 'A004', patient: 'P003', date: '2024-06-06T11:00:00', dentist: 'Dr. Sarah Martinez', type: 'Crown', status: AppointmentStatus.SCHEDULED, notes: 'Crown placement' },
    { code: 'A005', patient: 'P005', date: '2024-06-07T15:30:00', dentist: 'Dr. Lisa Anderson', type: 'Extraction', status: AppointmentStatus.SCHEDULED, notes: 'Tooth extraction #28' },
  ]
  for (const a of apptSeed) {
    await apptRepo.save(
      apptRepo.create({
        appointmentCode: a.code,
        patient: patients[a.patient],
        provider: users[a.dentist],
        startsAt: new Date(a.date),
        type: a.type,
        status: a.status,
        notes: a.notes,
      }),
    )
  }

  // --- Treatments ----------------------------------------------------
  const treatmentSeed = [
    { code: 'T001', patient: 'P001', type: TreatmentType.CLEANING, date: '2024-05-15', dentist: 'Dr. Robert Chen', cost: '120.00', notes: 'Routine cleaning and scaling', status: TreatmentStatus.COMPLETED },
    { code: 'T002', patient: 'P002', type: TreatmentType.FILLING, date: '2024-05-10', dentist: 'Dr. Lisa Anderson', cost: '250.00', notes: 'Composite filling on tooth #14', status: TreatmentStatus.COMPLETED, tooth: 14 },
    { code: 'T003', patient: 'P004', type: TreatmentType.ROOT_CANAL, date: '2024-04-25', dentist: 'Dr. Robert Chen', cost: '800.00', notes: 'Root canal treatment on tooth #11', status: TreatmentStatus.COMPLETED, tooth: 11 },
    { code: 'T004', patient: 'P003', type: TreatmentType.CROWN, date: '2024-04-20', dentist: 'Dr. Sarah Martinez', cost: '1200.00', notes: 'Porcelain crown on tooth #16', status: TreatmentStatus.IN_PROGRESS, tooth: 16 },
    { code: 'T005', patient: 'P001', type: TreatmentType.WHITENING, date: '2024-05-15', dentist: 'Dr. Robert Chen', cost: '300.00', notes: 'Professional teeth whitening', status: TreatmentStatus.COMPLETED },
  ]
  const treatments: Record<string, Treatment> = {}
  for (const t of treatmentSeed) {
    const treatment = await treatmentRepo.save(
      treatmentRepo.create({
        treatmentCode: t.code,
        patient: patients[t.patient],
        provider: users[t.dentist],
        type: t.type,
        performedOn: new Date(t.date),
        toothNumber: t.tooth,
        cost: t.cost,
        status: t.status,
        notes: t.notes,
      }),
    )
    treatments[t.code] = treatment
  }

  // --- Invoices + items -----------------------------------------------
  const invoiceSeed = [
    { code: 'INV001', patient: 'P001', date: '2024-05-15', due: '2024-06-15', status: InvoiceStatus.PAID, items: [{ desc: 'Cleaning', amount: '120.00', t: 'T001' }, { desc: 'Whitening', amount: '300.00', t: 'T005' }] },
    { code: 'INV002', patient: 'P002', date: '2024-05-10', due: '2024-06-10', status: InvoiceStatus.PENDING, items: [{ desc: 'Filling', amount: '250.00', t: 'T002' }] },
    { code: 'INV003', patient: 'P004', date: '2024-04-25', due: '2024-05-25', status: InvoiceStatus.OVERDUE, items: [{ desc: 'Root Canal', amount: '800.00', t: 'T003' }] },
    { code: 'INV004', patient: 'P003', date: '2024-04-20', due: '2024-05-20', status: InvoiceStatus.PARTIAL, items: [{ desc: 'Crown', amount: '1200.00', t: 'T004' }] },
    { code: 'INV005', patient: 'P005', date: '2024-03-10', due: '2024-04-10', status: InvoiceStatus.OVERDUE, items: [{ desc: 'Consultation and X-ray', amount: '350.00', t: null }] },
  ]
  for (const inv of invoiceSeed) {
    const invoice = await invoiceRepo.save(
      invoiceRepo.create({
        invoiceCode: inv.code,
        patient: patients[inv.patient],
        issuedOn: new Date(inv.date),
        dueOn: new Date(inv.due),
        status: inv.status,
      }),
    )
    const itemRepo = AppDataSource.getRepository(InvoiceItem)
    for (const item of inv.items) {
      await itemRepo.save(
        itemRepo.create({
          invoice,
          treatment: item.t ? treatments[item.t] : undefined,
          description: item.desc,
          amount: item.amount,
        }),
      )
    }
  }

  // --- Suppliers + inventory ------------------------------------------
  const supplierNames = ['Dental Supplies Plus', 'MedSupply Co', 'ProDental']
  const suppliers: Record<string, Supplier> = {}
  for (const name of supplierNames) {
    suppliers[name] = await supplierRepo.save(supplierRepo.create({ name }))
  }

  const inventorySeed = [
    { code: 'INV-001', name: 'Composite Resin (Shade A1)', qty: 45, unit: InventoryUnit.SYRINGES, reorder: 20, supplier: 'Dental Supplies Plus', cost: '12.50' },
    { code: 'INV-002', name: 'Surgical Gloves (Size L)', qty: 8, unit: InventoryUnit.BOXES, reorder: 10, supplier: 'MedSupply Co', cost: '24.99' },
    { code: 'INV-003', name: 'Dental Bibs', qty: 35, unit: InventoryUnit.BOXES, reorder: 15, supplier: 'ProDental', cost: '8.75' },
    { code: 'INV-004', name: 'Anesthetic Cartridge (2% Lidocaine)', qty: 12, unit: InventoryUnit.BOXES, reorder: 15, supplier: 'Dental Supplies Plus', cost: '45.00' },
    { code: 'INV-005', name: 'Rotary Instruments Burs', qty: 22, unit: InventoryUnit.SETS, reorder: 10, supplier: 'MedSupply Co', cost: '55.00' },
    { code: 'INV-006', name: 'Dental Suction Tips', qty: 5, unit: InventoryUnit.BOXES, reorder: 8, supplier: 'ProDental', cost: '18.50' },
  ]
  for (const i of inventorySeed) {
    await inventoryRepo.save(
      inventoryRepo.create({
        itemCode: i.code,
        name: i.name,
        quantity: i.qty,
        unit: i.unit,
        reorderLevel: i.reorder,
        supplier: suppliers[i.supplier],
        cost: i.cost,
      }),
    )
  }

  // --- Clinic settings + business hours --------------------------------
  const settings = await settingsRepo.save(
    settingsRepo.create({
      clinicName: 'DentalCare Clinic',
      address: '123 Dental Street, Medical City, MC 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@dentalcare.com',
    }),
  )
  const hoursRepo = AppDataSource.getRepository(BusinessHours)
  for (const day of Object.values(DayOfWeek)) {
    const isWeekend = day === DayOfWeek.SATURDAY || day === DayOfWeek.SUNDAY
    await hoursRepo.save(
      hoursRepo.create({
        clinicSettings: settings,
        dayOfWeek: day,
        isOpen: !isWeekend,
        openTime: isWeekend ? undefined : '09:00',
        closeTime: isWeekend ? undefined : '17:00',
      }),
    )
  }

  console.log('Seed complete.')
  await AppDataSource.destroy()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
