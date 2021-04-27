'use strict'

/*
|--------------------------------------------------------------------------
| CompanyJobSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const Hash = use('Hash')

class CompanyJobSeeder {
  async run() {
    await Database.table('users').insert([{ username: 'Dummy1', password: 'abcd', email: 'abcd@1234', type: 'normal', is_verified: true }])
    await Database.table('users').insert([{ username: 'dummy2', password: await Hash.make('12345'), email: 'solon.rolandkimandre@gmail.com', type: 'normal', is_verified: true }])
    await Database.table('users').insert([{ username: null, password: await Hash.make('12345'), email: 'arriesgadocollege1989@yahoo.com', type: 'normal', is_verified: true }])//arisgdo
    await Database.table('users').insert([{ username: null, password: await Hash.make('12345'), email: 'davaomandauefoam@gmail.com', type: 'normal', is_verified: true }])//arisgdo
    await Database.table('users').insert([{ username: null, password: await Hash.make('12345'), email: 'ellen.nuez@chronopipe.com', type: 'normal', is_verified: true }])
    await Database.table('users').insert([{ username: null, password: await Hash.make('12345'), email: 'enacywan82@gmail.com', type: 'normal', is_verified: true }])
    await Database.table('users').insert([{ username: null, password: await Hash.make('12345'), email: 'recruitment@kennemer.ph', type: 'normal', is_verified: true }])
    await Database.table('users').insert([{ username: null, password: await Hash.make('12345'), email: 'tagumwd.hrmpsb@tagum-water.gov.ph', type: 'normal', is_verified: true }])
    await Database.table('users').insert([{ username: null, password: await Hash.make('12345'), email: 'hrdrecruitment@tagumcooperative.coop', type: 'normal', is_verified: true }])
    await Database.table('users').insert([{ username: null, password: await Hash.make('12345'), email: 'aestorco@ancgroup.co', type: 'normal', is_verified: true }])
    await Database.table('users').insert([{ username: null, password: await Hash.make('12345'), email: 'claribelpallon@gmail.com', type: 'normal', is_verified: true }])
    await Database.table('users').insert([{ username: null, password: await Hash.make('12345'), email: 'rjmvillanueva@gmail.com', type: 'normal', is_verified: true }])


    await Database.table('applicants').insert([{
      user_id: 2,
      opening_statement: 'Lorem Ipsum Opening Statement',
      first_name: 'Roland Kim Andre',
      middle_name: 'Gallego',
      last_name: 'Solon',
      address: "Blk74 Lot 16 Phase 3, Emily homes, Cabantian, Davao City",
      contact_no: "09232901913",
      email: "solon.rolandkimandre@gmail.com",
    }])
    await Database.table('profiles').insert(
      [
        { user_id: 2, first_name: 'Roland Kim Andre', middle_name: 'Gallego', last_name: 'Solon', is_company: false },
        { user_id: 3, first_name: 'Victor', middle_name: 'A', last_name: 'Arriesgado', is_company: true },
        { user_id: 4, first_name: 'May Flor', middle_name: 'P', last_name: 'Cataneda', is_company: true },
        { user_id: 5, first_name: 'Ellen', middle_name: '', last_name: 'Nuez', is_company: true },
        { user_id: 6, first_name: 'Bryan', middle_name: '', last_name: 'Enacyawan', is_company: true },
        { user_id: 7, first_name: 'Amor Joy', middle_name: '', last_name: 'Gupong', is_company: true },
        { user_id: 8, first_name: 'Eng Pilar', middle_name: 'M', last_name: 'Mula', is_company: true },
        { user_id: 9, first_name: 'Erlybeth', middle_name: 'F', last_name: 'Plaza', is_company: true },
        { user_id: 10, first_name: 'Angelie', middle_name: 'A', last_name: 'Estorco', is_company: true },
        { user_id: 11, first_name: 'Claribel', middle_name: 'P', last_name: 'Andoy', is_company: true },
        { user_id: 12, first_name: 'Rizza Jane', middle_name: 'M', last_name: 'Villanueva', is_company: true },
      ])
    await Database.table('companies').insert([
      { user_id: 3, name: "ARRIESGADO COLLEGE FOUNDATION, INC", address: "201 Bonifacio St., Tagum City", contact_no: "(084) 216-9807", email: "arriesgadocollege1989@yahoo.com.ph ", vision: "", mission: "", development_thrusts: "", type: "Private", employees_min: 5, employees_max: 20 },
      { user_id: 4, name: "MANDAUE FOAM INDUSTRIES INC.", address: "Lanang Executive Homes, KM 7, Davao City", contact_no: "(082) 234-4900", email: "davaomandauefoam@gmail.com", vision: "", mission: "", development_thrusts: "", type: "Private", employees_min: 5, employees_max: 20 },
      { user_id: 5, name: "CHRONOPIPE GROUP CORP.", address: "PRK 6B STO NINO CARMEN DAVAO DEL NORTE", contact_no: "09177164830", email: "ellen.nuez@chronopipe.com", vision: "", mission: "", development_thrusts: "", type: "Private", employees_min: 5, employees_max: 20 },
      { user_id: 6, name: "FUTURE LIFE CARE", address: "Cor. Sobrecary St., Door 1 and 2 2nd floor, Elizabeth Building, Sison Subd., South Poblacion, Tagum City", contact_no: "(081) 216-2154/ 09658259763", email: "enacyawan82@gmail.com", vision: "", mission: "", development_thrusts: "", type: "Private", employees_min: 5, employees_max: 20 },
      { user_id: 7, name: "KENNEMER FOODS INTERNATIONAL", address: "Unit 23&24,2nd floor, CBC Building, Pioneer Avenue,Magugpo South, Tagum City.", contact_no: "0912-957-0488", email: "recruitment@kennemer.ph", vision: "", mission: "", development_thrusts: "", type: "Private", employees_min: 5, employees_max: 20 },
      { user_id: 8, name: "TAGUM WATER DISTRICT", address: "National Highway, Tagum City", contact_no: "0912-957-0488", email: "tagumwd.hrmpsb@tagum-water.gov.ph", vision: "", mission: "", development_thrusts: "", type: "Private", employees_min: 5, employees_max: 20 },
      { user_id: 9, name: "TAGUM COOPERATIVE", address: "Tagum Cooperative, Dalisay Road, Magugpo West, Tagum City", contact_no: "", email: "", vision: "", mission: "", development_thrusts: "hrdrecruitment@tagumcooperative.coop ", type: "Private", employees_min: 5, employees_max: 20 },
      { user_id: 10, name: "HONDA CARS TAGUM", address: "", contact_no: "09355843293", email: "aestorco@ancgroup.co", vision: "", mission: "", development_thrusts: "", type: "Private", employees_min: 5, employees_max: 20 },
      { user_id: 11, name: "PHILAM LIFE TAGUM", address: "", contact_no: "09068011055", email: "claribelpallon@gmail.com", vision: "", mission: "", development_thrusts: "", type: "Private", employees_min: 5, employees_max: 20 },
      { user_id: 12, name: "ANNIEPIE TAGUM", address: "", contact_no: "", email: "rjmvillanueva@gmail.com", vision: "", mission: "", development_thrusts: "", type: "Private", employees_min: 5, employees_max: 20 },

    ])
    await Database.table('company_core_values').insert([
      { company_id: 1, text: "ABCD" },
      { company_id: 1, text: "EFGH" },
      { company_id: 1, text: "IJKL" },
      { company_id: 1, text: "MNOP" },
    ])
    await Database.table('job_categories').insert([
      { name: "Accouting and Finance" },
      { name: "Administrative / Human Resources" },
      { name: "Arts/Media/Communications" },
      { name: "Building/Construction" },
      { name: "Computer/Information Technology" },
      { name: "Education/Training" },
      { name: "Engineering" },
      { name: "Healthcare" },
      { name: "Hotel/Restaurant" },
      { name: "Manufacturing", },
      { name: "Sales/Marketing", },
      { name: "Sciences", },
      { name: "Services", },
    ])
    await Database.table('jobs').insert([
      {
        company_id: 1,
        name: 'Caretaker',
        job_description:
          `•	Stay-in accommodation (Light and water- cook your own food)
        •	At least High School Level
        •	And can drive 4 wheel vehicle with LTO Driver’s License
        •	General cleaning and backyard gardening
        •	Walay bisyo"`,
        salary: "25000",
        deadline: new Date(),
        salary_included_benefits: true,
        work_from: new Date(),
        work_to: new Date(),
        is_approved: true,
        category_id: 1,
        // category: "Private",
        status: "Verified and hired applicants through P-App",
        is_archived: false,
      },
      {
        company_id: 2,
        name: 'Assistant Warehouse Supervisor',
        job_description: `•	Preferably with 1 year minimum experience
        •	Knowledgeable in SAP System and Manufacturing Operation`,
        salary: "10000",
        deadline: new Date(),
        salary_included_benefits: true,
        work_from: new Date(),
        work_to: new Date(),
        is_approved: true,
        category_id: 1,
        // category: "Private",
        status: "Verified and hired applicants through P-App",
        is_archived: false,
      },
      {
        company_id: 2,
        name: 'Logistic Personnel',
        job_description: `•	Preferably with 1 year minimum experience
        •	Knowledgeable in SAP System and Manufacturing Operation`,
        salary: "10000",
        deadline: new Date(),
        salary_included_benefits: true,
        work_from: new Date(),
        work_to: new Date(),
        is_approved: true,
        category_id: 1,
        // category: "Private",
        status: "Verified and hired applicants through P-App",
        is_archived: false,
      },
      {
        company_id: 2,
        name: 'Operation Checker',
        job_description: `•	Preferably with 1 year minimum experience
        •	Knowledgeable in SAP System and Manufacturing Operation`,
        salary: "10000",
        deadline: new Date(),
        salary_included_benefits: true,
        work_from: new Date(),
        work_to: new Date(),
        is_approved: true,
        category_id: 1,
        // category: "Private",
        status: "Verified and hired applicants through P-App",
        is_archived: false,
      },
      {
        company_id: 3,
        name: 'Purchasing Manager',
        job_description: `    • Candidate must possess at least a Bachelor’s/College Degree in any field
        • Minimum of 5 years of relevant working experience
        • Must have a wide network/portfolio of suppliers (Industrial Category)
        • With relevant experience handling non-food, services, construction, etc.
        • Must have relevant working experience in supplier accreditation, end-to-end purchasing
    Strong supplier management-conducts supplier expansion and accreditation, supplier performance rating, etc.
    `,
        salary: "10000",
        deadline: new Date(),
        salary_included_benefits: true,
        work_from: new Date(),
        work_to: new Date(),
        is_approved: true,
        category_id: 1,
        // category: "Private",
        status: "Verified and hired applicants through P-App",
        is_archived: false,
      },

    ])

    await Database.table('benefit_names').insert([
      { name: "GSIS" },
      { name: "Philhealth" },
      { name: "Pag-ibig" },
    ])

    await Database.table('freelance_services').insert([
      { name: "Aircon Cleaner/Repair" },
      { name: "Barber" },
      { name: "Beautician" },
      { name: "Carpenter" },
      { name: "Cellphone Technician" },
      { name: "Carwash" },
      { name: "Massage Therapist" },
    ])
    await Database.table('job_benefits').insert([
      { job_id: 1, benefit_id: 1 },
      { job_id: 1, benefit_id: 2 },
      { job_id: 1, benefit_id: 3 },
    ])
  }
}

module.exports = CompanyJobSeeder

